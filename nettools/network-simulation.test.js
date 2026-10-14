const test = require('node:test');
const assert = require('node:assert/strict');
const {connect} = require('./network-topology.js');
const {ping, sameSubnet} = require('./network-simulation.js');

function network() {
  const devices = [
    {id: 'a', type: 'pc', name: 'PC A', x: 5, y: 40, config: {interfaces: {eth0: {ip: '192.168.1.10', prefix: 24}}, gateway: ''}},
    {id: 's', type: 'switch', name: 'Switch', x: 45, y: 40},
    {id: 'b', type: 'pc', name: 'PC B', x: 85, y: 40, config: {interfaces: {eth0: {ip: '192.168.1.20', prefix: 24}}, gateway: ''}}
  ];
  const links = [];
  links.push(connect(devices, links, 'a', 's').link);
  links.push(connect(devices, links, 'b', 's').link);
  return {schemaVersion: 1, devices, links};
}

test('same-subnet ping traces ARP, switch learning, and ICMP deterministically', () => {
  const document = network();
  const first = ping(document, 'a', 'b');
  const second = ping(document, 'a', 'b');
  assert.deepEqual(first, second);
  assert.equal(first.ok, true);
  assert.deepEqual(first.events.filter(event => event.deviceId === 's').map(event => `${event.protocol}:${event.action}`), [
    'ARP:Flood', 'ARP:Forward', 'ICMP:Forward', 'ICMP:Forward'
  ]);
  assert.equal(first.events[0].packet.sourceIp, '192.168.1.10');
  assert.equal(first.events[0].packet.destinationMac, 'ff:ff:ff:ff:ff:ff');
  assert.deepEqual(first.events[1].egressPorts, ['fa0/2']);
  assert.deepEqual(first.events[1].macTable, [{address: first.events[0].packet.sourceMac, port: 'fa0/1'}]);
  assert.equal(first.events.filter(event => event.deviceId === 's' && event.macTable?.length === 2).length, 3);
  assert.match(first.reason, /succeeded/);
});

test('missing cable produces an ARP failure, not a false reply', () => {
  const document = network();
  document.links.pop();
  const result = ping(document, 'a', 'b');
  assert.equal(result.ok, false);
  assert.match(result.reason, /ARP failed/);
  assert.equal(result.events.some(event => event.protocol === 'ICMP'), false);
  assert.equal(result.events.at(-1).action, 'Drop');
  assert.equal(result.events.at(-1).deviceId, 'a');
  assert.equal(result.events.at(-1).protocol, 'ARP');
});

test('uncabled source produces a step-visible ARP drop', () => {
  const document = network();
  document.links = document.links.filter(link => link.a.deviceId !== 'a' && link.b.deviceId !== 'a');
  const result = ping(document, 'a', 'b');
  assert.equal(result.ok, false);
  assert.deepEqual(result.events.map(event => event.action), ['Drop']);
  assert.match(result.events[0].detail, /no cable/);
});

test('different subnet without a gateway drops before sending a frame', () => {
  const document = network();
  document.devices[2].config.interfaces.eth0.ip = '192.168.2.20';
  const result = ping(document, 'a', 'b');
  assert.equal(result.ok, false);
  assert.match(result.reason, /No default gateway/);
  assert.deepEqual(result.events.map(event => event.action), ['Drop']);
  assert.equal(sameSubnet('10.0.0.1', '10.0.0.2', 31), false);
});

function routedNetwork() {
  const devices = [
    {id: 'a', type: 'pc', name: 'PC A', x: 5, y: 40, config: {interfaces: {eth0: {ip: '192.168.1.10', prefix: 24}}, gateway: '192.168.1.1'}},
    {id: 's1', type: 'switch', name: 'Switch 1', x: 25, y: 40},
    {id: 'r', type: 'router', name: 'Router', x: 50, y: 40, config: {interfaces: {'g0/0': {ip: '192.168.1.1', prefix: 24}, 'g0/1': {ip: '192.168.2.1', prefix: 24}}}},
    {id: 's2', type: 'switch', name: 'Switch 2', x: 70, y: 40},
    {id: 'b', type: 'pc', name: 'PC B', x: 90, y: 40, config: {interfaces: {eth0: {ip: '192.168.2.20', prefix: 24}}, gateway: '192.168.2.1'}}
  ];
  const links = [];
  for (const [a, b] of [['a', 's1'], ['s1', 'r'], ['r', 's2'], ['s2', 'b']]) links.push(connect(devices, links, a, b).link);
  return {schemaVersion: 1, devices, links};
}

test('router forwards cross-subnet echo and reply with per-interface frames', () => {
  const document = routedNetwork();
  const result = ping(document, 'a', 'b');
  assert.equal(result.ok, true);
  assert.deepEqual(result, ping(document, 'a', 'b'));
  assert.deepEqual(result.events.filter(event => event.action === 'Route').map(event => event.egressPorts[0]), ['g0/1', 'g0/0']);
  const routedFrames = result.events.filter(event => event.protocol === 'ICMP' && event.deviceId === 'r' && event.action === 'Send');
  assert.equal(routedFrames.length, 2);
  assert.notEqual(routedFrames[0].packet.sourceMac, routedFrames[1].packet.sourceMac);
  assert.ok(result.events.some(event => event.deviceId === 's1' && event.macTable?.length === 2));
  assert.match(result.reason, /routed ping succeeded/);
  const reverse = ping(document, 'b', 'a');
  assert.equal(reverse.ok, true);
  assert.deepEqual(reverse.events.filter(event => event.action === 'Route').map(event => event.egressPorts[0]), ['g0/0', 'g0/1']);
});

test('router failure reasons identify gateway and cable problems', () => {
  const missingGateway = routedNetwork();
  missingGateway.devices[4].config.gateway = '';
  const missingGatewayResult = ping(missingGateway, 'a', 'b');
  assert.match(missingGatewayResult.reason, /needs default gateway/);
  assert.ok(missingGatewayResult.events.some(event => event.deviceId === 'b' && event.protocol === 'ICMP' && event.action === 'Receive'));
  assert.equal(missingGatewayResult.events.at(-1).action, 'Drop');
  assert.equal(missingGatewayResult.events.at(-1).deviceId, 'b');
  assert.equal(missingGatewayResult.events.at(-1).packet.sourceIp, '192.168.2.20');
  assert.equal(missingGatewayResult.events.at(-1).packet.destinationIp, '192.168.1.10');
  assert.equal(missingGatewayResult.events.some(event => event.deviceId === 'b' && event.protocol === 'ICMP' && event.action === 'Send'), false);
  const wrongGateway = routedNetwork();
  wrongGateway.devices[0].config.gateway = '192.168.1.254';
  assert.match(ping(wrongGateway, 'a', 'b').reason, /No configured router/);
  const brokenCable = routedNetwork();
  brokenCable.links.pop();
  assert.match(ping(brokenCable, 'a', 'b').reason, /No cabled path/);
  const wrongMask = routedNetwork();
  wrongMask.devices[0].config.interfaces.eth0.prefix = 16;
  assert.match(ping(wrongMask, 'a', 'b').reason, /outside the destination subnet/);
});

test('duplicate destination IPv4 drops before local or routed traffic', () => {
  const local = network();
  local.devices.push({id: 'c', type: 'pc', name: 'PC C', x: 50, y: 80,
    config: {interfaces: {eth0: {ip: '192.168.1.20', prefix: 24}}, gateway: ''}});
  const localResult = ping(local, 'a', 'b');
  assert.equal(localResult.ok, false);
  assert.match(localResult.reason, /Duplicate IPv4 address 192\.168\.1\.20/);
  assert.deepEqual(localResult.events.map(event => event.action), ['Drop']);

  const routed = routedNetwork();
  routed.devices.push({id: 'c', type: 'pc', name: 'PC C', x: 50, y: 80,
    config: {interfaces: {eth0: {ip: '192.168.2.20', prefix: 24}}, gateway: '192.168.2.1'}});
  const routedResult = ping(routed, 'a', 'b');
  assert.equal(routedResult.ok, false);
  assert.match(routedResult.reason, /Duplicate IPv4 address 192\.168\.2\.20/);
  assert.deepEqual(routedResult.events.map(event => event.action), ['Drop']);
});

test('duplicate source IPv4 stops a ping before ARP or ICMP', () => {
  const document = network();
  document.devices.push({id: 'c', type: 'pc', name: 'PC C', x: 50, y: 80,
    config: {interfaces: {eth0: {ip: '192.168.1.10', prefix: 24}}, gateway: ''}});
  const result = ping(document, 'a', 'b');
  assert.equal(result.ok, false);
  assert.match(result.reason, /Duplicate IPv4 address 192\.168\.1\.10 on PC A/);
  assert.deepEqual(result.events.map(event => event.action), ['Drop']);
});

test('broad destination mask blocks routed echo reply at the target', () => {
  const document = routedNetwork();
  document.devices[4].config.interfaces.eth0.prefix = 16;
  const result = ping(document, 'a', 'b');
  assert.equal(result.ok, false);
  assert.match(result.reason, /subnet mask treats/);
  assert.ok(result.events.some(event => event.deviceId === 'b' && event.protocol === 'ICMP' && event.action === 'Receive'));
  assert.equal(result.events.at(-1).action, 'Drop');
  assert.equal(result.events.at(-1).deviceId, 'b');
  assert.equal(result.events.at(-1).packet.destinationIp, '192.168.1.10');
});
