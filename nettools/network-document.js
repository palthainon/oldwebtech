(function (root, factory) {
  const api = factory(root.NetworkTopology || require('./network-topology.js'));
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.NetworkDocument = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (topology) {
  const VERSION = 1;
  const MAX_DEVICES = 200;
  const MAX_LINKS = 400;
  const MAX_BYTES = 256 * 1024;

  function ipv4(value) {
    if (typeof value !== 'string' || !/^\d{1,3}(\.\d{1,3}){3}$/.test(value)) return false;
    return value.split('.').every(part => Number(part) <= 255 && (part === '0' || !part.startsWith('0')));
  }

  function interfaceError(ip, prefix) {
    if (!ip && (prefix === '' || prefix === null || prefix === undefined)) return null;
    if (!ipv4(ip)) return 'Enter a valid IPv4 address.';
    if (!/^(?:[0-9]|[12][0-9]|3[012])$/.test(String(prefix))) return 'Prefix must be 0–32.';
    return null;
  }

  function configError(device) {
    const config = device.config || {};
    if (device.type === 'switch') return null;
    for (const port of topology.portsByType[device.type] || []) {
      const iface = config.interfaces?.[port] || {};
      const error = interfaceError(iface.ip || '', iface.prefix ?? '');
      if (error) return `${port}: ${error}`;
    }
    if (device.type === 'pc' && config.gateway && !ipv4(config.gateway)) return 'Enter a valid default gateway.';
    return null;
  }

  function validate(document) {
    if (!document || document.schemaVersion !== VERSION || !Array.isArray(document.devices) || !Array.isArray(document.links)) return 'Unsupported topology document.';
    if (document.devices.length > MAX_DEVICES || document.links.length > MAX_LINKS) return 'Topology is too large.';
    const ids = new Set();
    for (const device of document.devices) {
      if (!device || typeof device.id !== 'string' || !device.id || device.id.length > 100 || ids.has(device.id)) return 'Invalid or duplicate device ID.';
      if (!Object.hasOwn(topology.portsByType, device.type)) return 'Unknown device type.';
      if (typeof device.name !== 'string' || !device.name.trim() || device.name.length > 80) return 'Invalid device name.';
      if (![device.x, device.y].every(value => Number.isFinite(value) && value >= 0 && value <= 100)) return 'Invalid device position.';
      const error = configError(device);
      if (error) return `${device.name}: ${error}`;
      ids.add(device.id);
    }
    const occupied = new Set();
    const pairs = new Set();
    for (const link of document.links) {
      if (!link || !link.a || !link.b || !ids.has(link.a.deviceId) || !ids.has(link.b.deviceId) || link.a.deviceId === link.b.deviceId) return 'Invalid cable endpoint.';
      for (const endpoint of [link.a, link.b]) {
        const device = document.devices.find(item => item.id === endpoint.deviceId);
        if (!topology.portsByType[device.type].includes(endpoint.port)) return 'Cable uses an unknown port.';
        const key = `${endpoint.deviceId}:${endpoint.port}`;
        if (occupied.has(key)) return 'A port has more than one cable.';
        occupied.add(key);
      }
      const pair = [link.a.deviceId, link.b.deviceId].sort().join('|');
      if (pairs.has(pair)) return 'Duplicate cable.';
      pairs.add(pair);
    }
    return null;
  }

  function normalize(document) {
    const error = validate(document);
    if (error) return {error};
    const devices = document.devices.map(device => {
      const clean = {id: device.id, type: device.type, name: device.name, x: device.x, y: device.y};
      if (device.type !== 'switch') {
        const interfaces = {};
        for (const port of topology.portsByType[device.type]) {
          const iface = device.config?.interfaces?.[port] || {};
          interfaces[port] = {ip: iface.ip || '', prefix: iface.prefix ?? ''};
        }
        clean.config = {interfaces};
        if (device.type === 'pc') clean.config.gateway = device.config?.gateway || '';
      }
      return clean;
    });
    const links = document.links.map(link => ({
      id: `${link.a.deviceId}:${link.a.port}|${link.b.deviceId}:${link.b.port}`,
      a: {deviceId: link.a.deviceId, port: link.a.port},
      b: {deviceId: link.b.deviceId, port: link.b.port}
    }));
    return {document: {schemaVersion: VERSION, devices, links}};
  }

  function serialize(document) {
    const result = normalize(document);
    if (result.error) return result;
    const text = JSON.stringify(result.document, null, 2);
    if (new TextEncoder().encode(text).length > MAX_BYTES) return {error: 'Topology file exceeds 256 KiB.'};
    return {text};
  }

  function parse(text) {
    if (typeof text !== 'string' || new TextEncoder().encode(text).length > MAX_BYTES) return {error: 'Topology file exceeds 256 KiB.'};
    try {
      return normalize(JSON.parse(text));
    } catch (_) {
      return {error: 'Topology file is not valid JSON.'};
    }
  }

  return {VERSION, MAX_BYTES, ipv4, interfaceError, configError, validate, normalize, serialize, parse};
});
