const test = require('node:test');
const assert = require('node:assert/strict');
const {connect} = require('./network-topology.js');
const {ping} = require('./network-simulation.js');
const {modeFor, firstPing, routedGateway} = require('./network-labs.js');

function labDocument() {
  return {schemaVersion: 1, devices: [
    {id: 'pc-1', type: 'pc', name: 'PC 1', x: 10, y: 40, config: {interfaces: {eth0: {ip: '192.168.1.10', prefix: 24}}, gateway: ''}},
    {id: 'switch-1', type: 'switch', name: 'Switch 1', x: 50, y: 40},
    {id: 'pc-2', type: 'pc', name: 'PC 2', x: 90, y: 40, config: {interfaces: {eth0: {ip: '192.168.1.20', prefix: 24}}, gateway: ''}}
  ], links: []};
}

test('lab guides cabling and requires an observed successful ping', () => {
  const document = labDocument();
  assert.deepEqual(firstPing(document).steps.map(step => step.done), [true, false, false, true, false]);
  document.links.push(connect(document.devices, document.links, 'pc-1', 'switch-1').link);
  assert.match(firstPing(document).hint, /PC 2/);
  document.links.push(connect(document.devices, document.links, 'pc-2', 'switch-1').link);
  assert.match(firstPing(document).hint, /Run ping/);
  const result = ping(document, 'pc-1', 'pc-2');
  assert.equal(result.ok, true);
  assert.equal(firstPing(document, {...result, sourceId: 'pc-1', targetId: 'pc-2'}).complete, true);
});

test('incorrect addresses keep the lab incomplete even when cables exist', () => {
  const document = labDocument();
  document.devices[2].config.interfaces.eth0.ip = '192.168.2.20';
  const lab = firstPing(document);
  assert.equal(lab.steps[3].done, false);
  assert.match(lab.hint, /PC 1/);
});

test('lab mode follows the topology restored from a draft or history', () => {
  assert.equal(modeFor(labDocument()), 'first');
  assert.equal(modeFor({devices: [{id: 'routed-router'}, {id: 'routed-pc-2'}]}), 'routed');
  assert.equal(modeFor({devices: [{id: 'routed-router'}]}), 'first');
});

test('routed lab requires target gateway and an observed successful ping', () => {
  const document = {schemaVersion: 1, devices: [
    {id: 'routed-pc-1', type: 'pc', name: 'PC 1', x: 5, y: 40, config: {interfaces: {eth0: {ip: '192.168.1.10', prefix: 24}}, gateway: '192.168.1.1'}},
    {id: 'routed-router', type: 'router', name: 'Router', x: 50, y: 40, config: {interfaces: {'g0/0': {ip: '192.168.1.1', prefix: 24}, 'g0/1': {ip: '192.168.2.1', prefix: 24}}}},
    {id: 'routed-pc-2', type: 'pc', name: 'PC 2', x: 90, y: 40, config: {interfaces: {eth0: {ip: '192.168.2.20', prefix: 24}}, gateway: ''}}
  ], links: []};
  document.links.push(connect(document.devices, document.links, 'routed-pc-1', 'routed-router').link);
  document.links.push(connect(document.devices, document.links, 'routed-router', 'routed-pc-2').link);
  assert.deepEqual(routedGateway(document).steps.map(step => step.done), [true, false, false]);
  assert.match(routedGateway(document).hint, /192\.168\.2\.1/);
  document.devices[2].config.gateway = '192.168.2.1';
  assert.deepEqual(routedGateway(document).steps.map(step => step.done), [true, true, false]);
  const result = ping(document, 'routed-pc-1', 'routed-pc-2');
  assert.equal(result.ok, true);
  assert.equal(routedGateway(document, {...result, sourceId: 'routed-pc-1', targetId: 'routed-pc-2'}).complete, true);
});
