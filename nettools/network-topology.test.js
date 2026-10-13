const test = require('node:test');
const assert = require('node:assert/strict');
const {connect, freePorts, freePort, linksFor} = require('./network-topology.js');

const devices = [
  {id: 'a', name: 'PC 1', type: 'pc'},
  {id: 's', name: 'Switch 1', type: 'switch'},
  {id: 'b', name: 'PC 2', type: 'pc'},
  {id: 'c', name: 'PC 3', type: 'pc'},
  {id: 'd', name: 'PC 4', type: 'pc'},
  {id: 'e', name: 'PC 5', type: 'pc'}
];

test('allocates distinct device ports and rejects occupied or duplicate links', () => {
  const links = [];
  for (const pc of ['a', 'b', 'c', 'd']) {
    const result = connect(devices, links, pc, 's');
    assert.ok(result.link);
    links.push(result.link);
  }
  assert.deepEqual(links.map(link => link.b.port), ['fa0/1', 'fa0/2', 'fa0/3', 'fa0/4']);
  assert.equal(freePort(devices[1], links), null);
  assert.match(connect(devices, links, 'e', 's').error, /no free ports/);
  assert.match(connect(devices, links, 'a', 's').error, /already connected/);
  assert.equal(linksFor(links, 's').length, 4);
});

test('rejects self-links and missing devices', () => {
  assert.match(connect(devices, [], 'a', 'a').error, /different devices/);
  assert.match(connect(devices, [], 'a', 'missing').error, /must exist/);
});

test('uses a requested router port and rejects unknown or occupied ports', () => {
  const nodes = [{id: 'r', name: 'Router 1', type: 'router'}, ...devices];
  const first = connect(nodes, [], 'r', 'a', 'g0/1');
  assert.equal(first.link.a.port, 'g0/1');
  assert.deepEqual(freePorts(nodes[0], [first.link]), ['g0/0']);
  assert.match(connect(nodes, [first.link], 'r', 'b', 'g0/1').error, /already connected/);
  assert.match(connect(nodes, [first.link], 'r', 'b', 'g0\/9').error, /no port/);
  assert.equal(connect(nodes, [first.link], 'r', 'b').link.a.port, 'g0/0');
});
