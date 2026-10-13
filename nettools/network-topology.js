(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.NetworkTopology = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const portsByType = Object.freeze({
    pc: ['eth0'],
    switch: ['fa0/1', 'fa0/2', 'fa0/3', 'fa0/4'],
    router: ['g0/0', 'g0/1']
  });

  function freePorts(device, links) {
    const used = new Set(links.flatMap(link => [link.a, link.b])
      .filter(endpoint => endpoint.deviceId === device.id)
      .map(endpoint => endpoint.port));
    return (portsByType[device.type] || []).filter(port => !used.has(port));
  }

  function freePort(device, links) {
    return freePorts(device, links)[0] || null;
  }

  function connect(devices, links, sourceId, targetId, requestedSourcePort, requestedTargetPort) {
    if (sourceId === targetId) return {error: 'Choose two different devices.'};
    const source = devices.find(device => device.id === sourceId);
    const target = devices.find(device => device.id === targetId);
    if (!source || !target) return {error: 'Both devices must exist.'};
    if (links.some(link => [link.a.deviceId, link.b.deviceId].includes(sourceId) &&
      [link.a.deviceId, link.b.deviceId].includes(targetId))) {
      return {error: 'These devices are already connected.'};
    }
    for (const [device, requestedPort] of [[source, requestedSourcePort], [target, requestedTargetPort]]) {
      if (requestedPort === undefined) continue;
      if (!portsByType[device.type]?.includes(requestedPort)) return {error: `${device.name} has no port ${requestedPort}.`};
      if (!freePorts(device, links).includes(requestedPort)) return {error: `${device.name} ${requestedPort} is already connected.`};
    }
    const sourcePort = requestedSourcePort || freePort(source, links);
    const targetPort = requestedTargetPort || freePort(target, links);
    if (!sourcePort) return {error: `${source.name} has no free ports.`};
    if (!targetPort) return {error: `${target.name} has no free ports.`};
    return {link: {
      id: `${sourceId}:${sourcePort}|${targetId}:${targetPort}`,
      a: {deviceId: sourceId, port: sourcePort},
      b: {deviceId: targetId, port: targetPort}
    }};
  }

  function linksFor(links, deviceId) {
    return links.filter(link => link.a.deviceId === deviceId || link.b.deviceId === deviceId);
  }

  return {portsByType, freePorts, freePort, connect, linksFor};
});
