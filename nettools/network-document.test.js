const test = require('node:test');
const assert = require('node:assert/strict');
const model = require('./network-document.js');
const {connect} = require('./network-topology.js');

const devices = () => [
  {id: 'pc-a', type: 'pc', name: 'PC A', x: 10, y: 20, config: {interfaces: {eth0: {ip: '192.168.1.10', prefix: 24}}, gateway: '192.168.1.1'}},
  {id: 'switch-a', type: 'switch', name: 'Switch A', x: 50, y: 20}
];

test('validates a saved topology with configured IPv4 and a cable', () => {
  const nodes = devices();
  const link = connect(nodes, [], 'pc-a', 'switch-a').link;
  const document = {schemaVersion: 1, devices: nodes, links: [link]};
  assert.equal(model.validate(JSON.parse(JSON.stringify(document))), null);
});

test('rejects bad IPv4 settings and incomplete interface pairs', () => {
  assert.equal(model.ipv4('192.168.1.10'), true);
  assert.equal(model.ipv4('192.168.1.256'), false);
  assert.equal(model.ipv4('192.168.01.10'), false);
  assert.match(model.interfaceError('', 0), /IPv4/);
  assert.match(model.interfaceError('10.0.0.1', ''), /Prefix/);
  assert.match(model.interfaceError('10.0.0.1', 33), /Prefix/);
  const nodes = devices();
  nodes[0].config.gateway = 'not-an-address';
  assert.match(model.validate({schemaVersion: 1, devices: nodes, links: []}), /gateway/);
});

test('rejects a cable on an occupied port during draft load', () => {
  const nodes = devices();
  nodes.push({id: 'pc-b', type: 'pc', name: 'PC B', x: 80, y: 20});
  const first = connect(nodes, [], 'pc-a', 'switch-a').link;
  const second = {id: 'bad', a: {deviceId: 'pc-a', port: 'eth0'}, b: {deviceId: 'pc-b', port: 'eth0'}};
  assert.match(model.validate({schemaVersion: 1, devices: nodes, links: [first, second]}), /more than one cable/);
});

test('JSON export and import round trip while stripping unknown fields', () => {
  const nodes = devices();
  nodes[0].untrusted = {html: '<script>not part of topology</script>'};
  const document = {schemaVersion: 1, devices: nodes, links: [connect(nodes, [], 'pc-a', 'switch-a').link], extra: 'discard me'};
  const saved = model.serialize(document);
  assert.equal(saved.error, undefined);
  const loaded = model.parse(saved.text);
  assert.equal(loaded.error, undefined);
  assert.equal(loaded.document.devices[0].untrusted, undefined);
  assert.equal(loaded.document.extra, undefined);
  assert.equal(model.serialize(loaded.document).text, saved.text);
});

test('malformed, unsupported, and oversized imports are rejected', () => {
  assert.match(model.parse('{broken').error, /valid JSON/);
  assert.match(model.parse(JSON.stringify({schemaVersion: 99, devices: [], links: []})).error, /Unsupported/);
  assert.match(model.parse('x'.repeat(model.MAX_BYTES + 1)).error, /256 KiB/);
});
