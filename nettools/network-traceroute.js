(function (root, factory) {
  const api = factory(root.NetworkSimulation || require('./network-simulation.js'));
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.NetworkTraceroute = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (simulation) {
  // This teaching model probes a verified ping path. It does not invent
  // intermediate replies when the model cannot verify the return path.
  function run(document, sourceId, targetId, maxHops = 30) {
    const result = simulation.ping(document, sourceId, targetId);
    if (!result.ok) return {...result, reason: `Traceroute stopped: ${result.reason}`, hops: []};
    const devices = new Map(document.devices.map(device => [device.id, device]));
    const source = devices.get(sourceId), target = devices.get(targetId);
    const src = source.config.interfaces.eth0.ip, dst = target.config.interfaces.eth0.ip;
    const path = [];
    for (const event of result.events) {
      if (event.protocol !== 'ICMP' || event.packet.sourceIp !== src || event.packet.destinationIp !== dst) continue;
      if (path.at(-1)?.deviceId === event.deviceId) continue;
      path.push(event);
      if (event.deviceId === targetId) break;
    }
    const stops = path.filter(event => devices.get(event.deviceId).type === 'router' || event.deviceId === targetId);
    const events = [], hops = [];
    const limit = Number.isInteger(maxHops) ? Math.max(1, Math.min(30, maxHops)) : 30;
    function emit(template, action, detail, ttl, response, hop) {
      events.push({...template, number: events.length + 1, protocol: 'ICMP', action, detail, ttl,
        packet: {sourceIp: response ? hop.address : src, destinationIp: response ? src : dst, sourceMac: '', destinationMac: ''},
        ...(hop ? {hop} : {})});
    }
    for (let index = 0; index < Math.min(stops.length, limit); index++) {
      const stop = stops[index], device = devices.get(stop.deviceId), ttl = index + 1;
      const address = device.type === 'pc' ? dst : device.config.interfaces[stop.ingressPort].ip;
      const hop = {ttl, deviceId: device.id, name: device.name, address, reached: device.id === targetId};
      const segment = path.slice(0, path.indexOf(stop) + 1);
      for (const step of segment) emit(step, 'Probe', `Probe with TTL ${ttl} toward ${dst}.`, ttl, false);
      emit(stop, hop.reached ? 'Echo reply' : 'Time exceeded',
        hop.reached ? `${address}: destination reached.` : `${address}: TTL expired at ${device.name}.`, ttl, true, hop);
      // Return over the verified symmetric path, including switches.
      for (let i = segment.length - 2; i >= 0; i--) {
        const step = segment[i], next = segment[i + 1];
        const cable = document.links.find(link =>
          (link.a.deviceId === step.deviceId && link.b.deviceId === next.deviceId) ||
          (link.b.deviceId === step.deviceId && link.a.deviceId === next.deviceId));
        const endpoint = cable && (cable.a.deviceId === step.deviceId ? cable.a : cable.b);
        emit({...step, ingressPort: endpoint?.port || '', egressPorts: []}, 'Reply',
          `Hop ${ttl}: ${address} (${device.name})${hop.reached ? ' — destination' : ' — time exceeded'}.`, ttl, true, hop);
      }
      hops.push(hop);
    }
    const ok = hops.at(-1)?.reached === true;
    return {ok, hops, events, reason: ok ? `Traceroute complete: ${dst} reached in ${hops.length} hop(s).` : `Traceroute stopped at the ${limit}-hop limit.`};
  }
  return {run};
});
