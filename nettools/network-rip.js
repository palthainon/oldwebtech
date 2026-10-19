(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.NetworkRip = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const number = ip => ip.split('.').reduce((n, part) => ((n << 8) | Number(part)) >>> 0, 0);
  const mask = prefix => prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
  const network = (ip, prefix) => [24, 16, 8, 0].map(shift => ((number(ip) & mask(prefix)) >>> shift) & 255).join('.');
  const matches = (ip, route) => network(ip, route.prefix) === route.network;
  const interfaces = device => Object.entries(device.config?.interfaces || {}).filter(([, iface]) => iface.ip);
  const enabled = (device, port) => device.config?.rip?.enabled === true && device.config.rip.ports.includes(port);

  // A layer-two path may pass through switches, but never another router or PC.
  function path(document, from, port, to, targetPort) {
    const queue = [{id: from, edges: []}], seen = new Set([from]);
    while (queue.length) {
      const current = queue.shift();
      for (const link of document.links) {
        const a = link.a.deviceId === current.id ? link.a : link.b.deviceId === current.id ? link.b : null;
        if (!a || (current.id === from && a.port !== port)) continue;
        const b = a === link.a ? link.b : link.a;
        if (seen.has(b.deviceId)) continue;
        const edges = [...current.edges, {a, b}];
        if (b.deviceId === to && b.port === targetPort) return edges;
        if (document.devices.find(d => d.id === b.deviceId)?.type !== 'switch') continue;
        seen.add(b.deviceId); queue.push({id: b.deviceId, edges});
      }
    }
    return null;
  }

  function converge(document) {
    const routers = document.devices.filter(d => d.type === 'router');
    const tables = new Map(routers.map(router => [router.id, interfaces(router).map(([port, iface]) => ({
      network: network(iface.ip, Number(iface.prefix)), prefix: Number(iface.prefix), port, metric: 0, source: 'Connected', nextHop: '', nextRouter: ''
    }))]));
    const peers = [];
    for (const router of routers) for (const other of routers) {
      if (router === other) continue;
      for (const [port, iface] of interfaces(router)) for (const [remote, address] of interfaces(other)) {
        if (!enabled(router, port) || !enabled(other, remote)) continue;
        if (iface.prefix != address.prefix || network(iface.ip, Number(iface.prefix)) !== network(address.ip, Number(address.prefix))) continue;
        if (path(document, router.id, port, other.id, remote)) peers.push({router, other, port, remote, nextHop: address.ip});
      }
    }
    // Synchronous distance-vector rounds. Metric 16 is unreachable.
    for (let round = 0; round < 16; round++) {
      const previous = new Map([...tables].map(([id, routes]) => [id, routes.map(route => ({...route}))]));
      let changed = false;
      for (const peer of peers) for (const route of previous.get(peer.other.id)) {
        if (route.source === 'Connected' && !enabled(peer.other, route.port)) continue;
        if (route.source === 'RIP' && route.port === peer.remote) continue;
        const metric = route.metric + 1;
        if (metric >= 16) continue;
        const routes = tables.get(peer.router.id);
        const old = routes.find(r => r.network === route.network && r.prefix === route.prefix);
        if (old && old.metric <= metric) continue;
        const learned = {...route, metric, source: 'RIP', port: peer.port, nextHop: peer.nextHop, nextRouter: peer.other.id};
        if (old) routes.splice(routes.indexOf(old), 1, learned); else routes.push(learned);
        changed = true;
      }
      if (!changed) break;
    }
    return tables;
  }

  function ping(document, source, target) {
    const tables = converge(document), events = [];
    const devices = new Map(document.devices.map(d => [d.id, d]));
    const emit = (device, protocol, action, detail, sourceIp, destinationIp, ingressPort = '', egressPorts = []) => {
      events.push({number: events.length + 1, deviceId: device.id, device: device.name, protocol, action, detail,
        ingressPort, egressPorts, packet: {sourceIp, destinationIp, sourceMac: '', destinationMac: ''}});
    };
    const drop = (device, reason, src, dst) => { emit(device, 'IP', 'Drop', reason, src, dst); return {ok: false, reason, events}; };
    for (const [id, routes] of tables) for (const route of routes.filter(r => r.source === 'RIP')) {
      const router = devices.get(id);
      emit(router, 'RIP', 'Learn', `Learned ${route.network}/${route.prefix} via ${route.nextHop}; metric ${route.metric}.`, route.nextHop, router.config.interfaces[route.port].ip, route.port);
    }
    for (const [from, to, kind] of [[source, target, 'Echo request'], [target, source, 'Echo reply']]) {
      const src = from.config.interfaces.eth0.ip, dst = to.config.interfaces.eth0.ip;
      const gateway = from.config.gateway;
      const local = {network: network(src, Number(from.config.interfaces.eth0.prefix)), prefix: Number(from.config.interfaces.eth0.prefix)};
      if (matches(dst, local)) return drop(from, `${from.name}'s subnet mask treats ${dst} as local. Check the subnet mask.`, src, dst);
      if (!gateway || !matches(gateway, local)) return drop(from, `${from.name} needs a default gateway in its subnet.`, src, dst);
      let current = null, incoming = '', first = null;
      for (const router of document.devices.filter(d => d.type === 'router')) for (const [port, iface] of interfaces(router)) {
        if (iface.ip !== gateway || !matches(src, {network: network(iface.ip, Number(iface.prefix)), prefix: Number(iface.prefix)})) continue;
        const edges = path(document, from.id, 'eth0', router.id, port);
        if (edges) { current = router; incoming = port; first = edges; }
      }
      if (!current) return drop(from, `No cabled router answers gateway ${gateway}.`, src, dst);
      function send(a, b, edges) {
        emit(a, 'ICMP', 'Send', `${kind} to ${dst}.`, src, dst, '', [edges[0].a.port]);
        edges.forEach((edge, index) => {
          const device = devices.get(edge.b.deviceId);
          emit(device, 'ICMP', device === b ? 'Receive' : 'Forward', `${kind} to ${dst}.`, src, dst, edge.b.port, device === b ? [] : [edges[index + 1].a.port]);
        });
      }
      send(from, current, first);
      const visited = new Set();
      while (current !== to) {
        if (visited.has(current.id)) return drop(current, 'Routing loop detected.', src, dst);
        visited.add(current.id);
        const route = tables.get(current.id).filter(r => matches(dst, r)).sort((a, b) => b.prefix - a.prefix || a.metric - b.metric)[0];
        if (!route) return drop(current, `No route to ${dst} on ${current.name}. Enable RIP on the required interfaces.`, src, dst);
        let next, edges;
        if (route.source === 'Connected') {
          next = to; edges = path(document, current.id, route.port, to.id, 'eth0');
        } else {
          next = devices.get(route.nextRouter);
          const remote = interfaces(next).find(([, iface]) => iface.ip === route.nextHop);
          edges = remote && path(document, current.id, route.port, next.id, remote[0]);
        }
        if (!edges) return drop(current, `No cabled path to ${route.nextHop || dst}.`, src, dst);
        emit(current, 'IP', 'Route', `${route.source} route ${route.network}/${route.prefix} via ${route.nextHop || 'direct connection'} on ${route.port}.`, src, dst, incoming, [route.port]);
        send(current, next, edges); incoming = edges.at(-1).b.port; current = next;
      }
    }
    return {ok: true, reason: `Reply from ${target.config.interfaces.eth0.ip}: ping succeeded across RIP routers.`, events};
  }
  return {converge, ping, path};
});
