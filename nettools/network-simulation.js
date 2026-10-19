(function (root, factory) {
  const api = factory(root.NetworkDocument || require('./network-document.js'), root.NetworkRip || require('./network-rip.js'));
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.NetworkSimulation = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (documentModel, rip) {
  const BROADCAST = 'ff:ff:ff:ff:ff:ff';
  const mac = index => `02:00:00:${[index >> 16, index >> 8, index].map(value => (value & 255).toString(16).padStart(2, '0')).join(':')}`;
  const ipNumber = ip => ip.split('.').reduce((value, octet) => ((value << 8) | Number(octet)) >>> 0, 0);
  const sameSubnet = (a, b, prefix) => {
    const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
    return (ipNumber(a) & mask) === (ipNumber(b) & mask);
  };
  const macTableSnapshot = table => [...table].map(([address, port]) => ({address, port}))
    .sort((a, b) => a.address.localeCompare(b.address));

  function routedPing(document, source, target, events) {
    const devices = document.devices;
    const src = source.config.interfaces.eth0;
    const dst = target.config.interfaces.eth0;
    const packet = {sourceIp: src.ip, destinationIp: dst.ip, sourceMac: '', destinationMac: ''};
    const finish = (ok, reason) => ({ok, reason, events});
    function drop(device, reason, failedPacket = packet) {
      events.push({number: events.length + 1, protocol: 'IP', deviceId: device.id, device: device.name,
        action: 'Drop', detail: reason, ingressPort: '', egressPorts: [], packet: failedPacket});
      return finish(false, reason);
    }
    if (!source.config.gateway) return drop(source, `No default gateway on ${source.name} for destination ${dst.ip}.`);
    if (!sameSubnet(src.ip, source.config.gateway, Number(src.prefix))) return drop(source, `Default gateway ${source.config.gateway} is outside ${source.name}'s subnet.`);
    const candidates = [];
    for (const router of devices.filter(device => device.type === 'router')) {
      const interfaces = router.config?.interfaces || {};
      for (const [inPort, ingress] of Object.entries(interfaces)) {
        if (ingress.ip !== source.config.gateway || !sameSubnet(ingress.ip, src.ip, Number(ingress.prefix))) continue;
        for (const [outPort, egress] of Object.entries(interfaces)) {
          if (inPort === outPort || !egress.ip || !sameSubnet(egress.ip, dst.ip, Number(egress.prefix)) || !sameSubnet(dst.ip, egress.ip, Number(dst.prefix))) continue;
          candidates.push({router, inPort, outPort, ingress, egress});
        }
      }
    }
    if (!candidates.length) {
      if (devices.some(device => device.config?.rip?.enabled)) return rip.ping(document, source, target);
      return drop(source, `No configured router connects gateway ${source.config.gateway} to ${dst.ip}.`);
    }
    const adjacency = new Map(devices.map(device => [device.id, []]));
    for (const link of document.links) {
      adjacency.get(link.a.deviceId).push({id: link.b.deviceId, local: link.a.port, remote: link.b.port});
      adjacency.get(link.b.deviceId).push({id: link.a.deviceId, local: link.b.port, remote: link.a.port});
    }
    for (const edges of adjacency.values()) edges.sort((a, b) => a.local.localeCompare(b.local));
    function path(from, to, fromPort, toPort) {
      const queue = [{id: from.id, edges: []}];
      const seen = new Set([from.id]);
      while (queue.length) {
        const item = queue.shift();
        for (const edge of adjacency.get(item.id)) {
          if (item.id === from.id && edge.local !== fromPort) continue;
          if (edge.id === to.id && edge.remote !== toPort) continue;
          if (seen.has(edge.id)) continue;
          const next = devices.find(device => device.id === edge.id);
          if (next !== to && next.type !== 'switch') continue;
          const edges = [...item.edges, {from: item.id, to: edge.id, local: edge.local, remote: edge.remote}];
          if (next === to) return edges;
          seen.add(edge.id); queue.push({id: edge.id, edges});
        }
      }
      return null;
    }
    let route = null;
    for (const candidate of candidates) {
      const first = path(source, candidate.router, 'eth0', candidate.inPort);
      const second = path(candidate.router, target, candidate.outPort, 'eth0');
      if (first && second) { route = {...candidate, first, second}; break; }
    }
    if (!route) return drop(source, 'No cabled path connects both PCs to the configured router interfaces.');
    const {router, inPort, outPort, ingress, egress, first, second} = route;
    const sourceMac = mac(devices.indexOf(source) + 1);
    const targetMac = mac(devices.indexOf(target) + 1);
    const routerMac = port => `02:00:01:00:${(devices.indexOf(router) + 1).toString(16).padStart(2, '0')}:${(port === 'g0/0' ? 1 : 2).toString(16).padStart(2, '0')}`;
    const tables = new Map(devices.filter(device => device.type === 'switch').map(device => [device.id, new Map()]));
    function leg(protocol, from, to, edges, sourceMac, destinationMac, sourceIp, destinationIp, detail) {
      const frame = {sourceMac, destinationMac, sourceIp, destinationIp};
      function emit(device, action, text, ingressPort, egressPorts, macTable) {
        events.push({number: events.length + 1, protocol, deviceId: device.id, device: device.name,
          action, detail: text, ingressPort, egressPorts, packet: frame,
          ...(macTable ? {macTable} : {})});
      }
      emit(from, 'Send', detail, '', [edges[0].local]);
      edges.forEach((edge, index) => {
        const device = devices.find(item => item.id === edge.to);
        if (device === to) { emit(device, 'Receive', detail, edge.remote, []); return; }
        const table = tables.get(device.id);
        table.set(sourceMac, edge.remote);
        const nextPort = edges[index + 1].local;
        const known = table.get(destinationMac);
        emit(device, destinationMac === BROADCAST || !known ? 'Flood' : 'Forward',
          `Learned ${sourceMac} on ${edge.remote}; ${destinationMac === BROADCAST || !known ? 'flooded' : 'forwarded'} toward ${nextPort}.`, edge.remote, [nextPort], macTableSnapshot(table));
      });
    }
    leg('ARP', source, router, first, sourceMac, BROADCAST, src.ip, ingress.ip, `Who has gateway ${ingress.ip}?`);
    leg('ARP', router, source, [...first].reverse().map(edge => ({from: edge.to, to: edge.from, local: edge.remote, remote: edge.local})), routerMac(inPort), sourceMac, ingress.ip, src.ip, `${ingress.ip} is at ${routerMac(inPort)}.`);
    leg('ICMP', source, router, first, sourceMac, routerMac(inPort), src.ip, dst.ip, `Echo request for ${dst.ip} via gateway ${ingress.ip}.`);
    events.push({number: events.length + 1, protocol: 'IP', deviceId: router.id, device: router.name, action: 'Route',
      detail: `Destination ${dst.ip} matches connected network on ${outPort}; forwarding from ${inPort} to ${outPort}.`,
      ingressPort: inPort, egressPorts: [outPort], packet: {sourceMac: routerMac(inPort), destinationMac: '', sourceIp: src.ip, destinationIp: dst.ip}});
    leg('ARP', router, target, second, routerMac(outPort), BROADCAST, egress.ip, dst.ip, `Who has ${dst.ip}?`);
    const backSecond = [...second].reverse().map(edge => ({from: edge.to, to: edge.from, local: edge.remote, remote: edge.local}));
    leg('ARP', target, router, backSecond, targetMac, routerMac(outPort), dst.ip, egress.ip, `${dst.ip} is at ${targetMac}.`);
    leg('ICMP', router, target, second, routerMac(outPort), targetMac, src.ip, dst.ip, `Forwarded echo request to ${dst.ip}.`);
    if (sameSubnet(dst.ip, src.ip, Number(dst.prefix))) return drop(target,
      `${target.name}'s subnet mask treats ${src.ip} as local, so the echo reply cannot use its gateway. Check the subnet mask.`,
      {sourceIp: dst.ip, destinationIp: src.ip, sourceMac: targetMac, destinationMac: ''});
    if (!target.config?.gateway || target.config.gateway !== egress.ip) return drop(target,
      `${target.name} needs default gateway ${egress.ip} for the echo reply.`,
      {sourceIp: dst.ip, destinationIp: src.ip, sourceMac: targetMac, destinationMac: ''});
    leg('ICMP', target, router, backSecond, targetMac, routerMac(outPort), dst.ip, src.ip, `Echo reply for ${src.ip} via gateway ${egress.ip}.`);
    events.push({number: events.length + 1, protocol: 'IP', deviceId: router.id, device: router.name, action: 'Route',
      detail: `Destination ${src.ip} matches connected network on ${inPort}; forwarding from ${outPort} to ${inPort}.`,
      ingressPort: outPort, egressPorts: [inPort], packet: {sourceMac: routerMac(outPort), destinationMac: '', sourceIp: dst.ip, destinationIp: src.ip}});
    leg('ICMP', router, source, [...first].reverse().map(edge => ({from: edge.to, to: edge.from, local: edge.remote, remote: edge.local})), routerMac(inPort), sourceMac, dst.ip, src.ip, `Forwarded echo reply to ${src.ip}.`);
    return finish(true, `Reply from ${dst.ip}: routed ping succeeded via ${router.name}.`);
  }

  function ping(document, sourceId, targetId) {
    const events = [];
    const finish = (ok, reason) => ({ok, reason, events});
    const invalid = documentModel.validate(document);
    if (invalid) return finish(false, `Invalid topology: ${invalid}`);
    const devices = document.devices;
    const source = devices.find(device => device.id === sourceId);
    const target = devices.find(device => device.id === targetId);
    if (!source || !target || source.type !== 'pc' || target.type !== 'pc' || source === target) return finish(false, 'Choose two different PCs.');
    const src = source.config?.interfaces?.eth0;
    const dst = target.config?.interfaces?.eth0;
    if (!src?.ip || !dst?.ip) return finish(false, 'Both PCs need IPv4 addresses.');
    const duplicate = [source, target].find(pc => devices.some(device => device !== pc && device.type === 'pc' && device.config?.interfaces?.eth0?.ip === pc.config.interfaces.eth0.ip));
    if (duplicate) {
      const address = duplicate.config.interfaces.eth0.ip;
      const reason = `Duplicate IPv4 address ${address} on ${duplicate.name}. Give each PC a unique address.`;
      events.push({number: 1, protocol: 'IP', deviceId: source.id, device: source.name, action: 'Drop', detail: reason,
        ingressPort: '', egressPorts: [], packet: {sourceIp: src.ip, destinationIp: dst.ip, sourceMac: '', destinationMac: ''}});
      return finish(false, reason);
    }
    if (!sameSubnet(src.ip, dst.ip, Number(src.prefix))) return routedPing(document, source, target, events);
    if (!sameSubnet(src.ip, dst.ip, Number(dst.prefix))) {
      const reason = 'Source is outside the destination subnet. Check the subnet masks.';
      events.push({number: 1, protocol: 'IP', deviceId: target.id, device: target.name, action: 'Drop', detail: reason,
        ingressPort: '', egressPorts: [], packet: {sourceIp: src.ip, destinationIp: dst.ip, sourceMac: '', destinationMac: ''}});
      return finish(false, reason);
    }
    const macs = new Map(devices.map((device, index) => [device.id, mac(index + 1)]));
    function drop(device, protocol, reason) {
      events.push({number: events.length + 1, protocol, deviceId: device.id, device: device.name,
        action: 'Drop', detail: reason, ingressPort: '', egressPorts: [],
        packet: {sourceIp: src.ip, destinationIp: dst.ip, sourceMac: macs.get(source.id), destinationMac: macs.get(target.id)}});
      return finish(false, reason);
    }
    const tables = new Map(devices.filter(device => device.type === 'switch').map(device => [device.id, new Map()]));
    const neighbors = new Map(devices.map(device => [device.id, []]));
    for (const link of document.links) {
      neighbors.get(link.a.deviceId).push({local: link.a.port, remote: link.b.port, id: link.b.deviceId});
      neighbors.get(link.b.deviceId).push({local: link.b.port, remote: link.a.port, id: link.a.deviceId});
    }
    for (const list of neighbors.values()) list.sort((a, b) => a.local.localeCompare(b.local));
    function send(protocol, origin, dstMac, detail) {
      const packet = {
        sourceMac: macs.get(origin.id), destinationMac: dstMac,
        sourceIp: origin === source ? src.ip : dst.ip,
        destinationIp: origin === source ? dst.ip : src.ip
      };
      function emit(protocol, device, action, detail, ingressPort = '', egressPorts = [], macTable) {
        events.push({number: events.length + 1, protocol, deviceId: device.id, device: device.name,
          action, detail, ingressPort, egressPorts, packet, ...(macTable ? {macTable} : {})});
      }
      emit(protocol, origin, 'Send', detail, '', neighbors.get(origin.id).map(edge => edge.local));
      const queue = neighbors.get(origin.id).map(edge => ({id: edge.id, ingress: edge.remote, from: origin.id}));
      const visited = new Set();
      let reached = false;
      while (queue.length && events.length < 500) {
        const hop = queue.shift();
        const visit = `${hop.id}:${hop.ingress}`;
        if (visited.has(visit)) continue;
        visited.add(visit);
        const device = devices.find(item => item.id === hop.id);
        if (device.type === 'pc') {
          if (dstMac === BROADCAST && protocol === 'ARP' && device === target) {
            emit(protocol, device, 'Receive', `ARP request: Who has ${dst.ip}? ${device.name} owns this address.`, hop.ingress);
            reached = true;
          } else if (dstMac === macs.get(device.id)) {
            emit(protocol, device, 'Receive', `${detail} Arrived on ${hop.ingress}.`, hop.ingress);
            if (device === target || device === source) reached = true;
          }
          continue;
        }
        if (device.type !== 'switch') continue;
        const table = tables.get(device.id);
        table.set(macs.get(origin.id), hop.ingress);
        const knownPort = table.get(dstMac);
        const outs = neighbors.get(device.id).filter(edge => edge.local !== hop.ingress && (!knownPort || edge.local === knownPort));
        emit(protocol, device, knownPort ? 'Forward' : 'Flood', `${device.name} learned ${macs.get(origin.id)} on ${hop.ingress}; ${knownPort ? `forwarded via ${knownPort}` : `flooded to ${outs.length} port(s)`}.`, hop.ingress, outs.map(edge => edge.local), macTableSnapshot(table));
        for (const edge of outs) queue.push({id: edge.id, ingress: edge.remote, from: device.id});
      }
      return reached;
    }

    if (!neighbors.get(source.id).length) return drop(source, 'ARP', `${source.name} has no cable.`);
    if (!send('ARP', source, BROADCAST, `Who has ${dst.ip}?`)) return drop(source, 'ARP', `ARP failed: ${dst.ip} did not answer. Check the cables and subnet.`);
    if (!send('ARP', target, macs.get(source.id), `${dst.ip} is at ${macs.get(target.id)}.`)) return drop(target, 'ARP', 'ARP reply could not reach the source PC.');
    if (!send('ICMP', source, macs.get(target.id), `Echo request from ${src.ip} to ${dst.ip}.`)) return drop(source, 'ICMP', 'ICMP echo request did not reach the destination.');
    if (!send('ICMP', target, macs.get(source.id), `Echo reply from ${dst.ip} to ${src.ip}.`)) return drop(target, 'ICMP', 'ICMP echo reply did not reach the source.');
    return finish(true, `Reply from ${dst.ip}: ping succeeded.`);
  }

  return {ping, sameSubnet};
});
