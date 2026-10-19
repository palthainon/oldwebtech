const test = require('node:test');
const assert = require('node:assert/strict');
const {converge} = require('./network-rip.js');
const {ping} = require('./network-simulation.js');
const {serialize, parse, validate} = require('./network-document.js');
function topology(count = 2) {
  const devices = [{id:'a',name:'PC A',type:'pc',x:0,y:0,config:{interfaces:{eth0:{ip:'10.0.0.10',prefix:24}},gateway:'10.0.0.1'}}];
  for (let i = 0; i < count; i++) devices.push({id:'r'+i,name:'Router '+i,type:'router',x:50,y:50,config:{interfaces:{
    'g0/0':{ip:`10.0.${i}.1`,prefix:24},'g0/1':{ip:`10.0.${i+1}.2`,prefix:24}
  },rip:{enabled:true,ports:['g0/0','g0/1']}}});
  devices.push({id:'b',name:'PC B',type:'pc',x:100,y:100,config:{interfaces:{eth0:{ip:`10.0.${count}.10`,prefix:24}},gateway:`10.0.${count}.2`}});
  const links = devices.slice(0,-1).map((d,i) => ({a:{deviceId:d.id,port:i === 0 ? 'eth0':'g0/1'},b:{deviceId:devices[i+1].id,port:i === count ? 'eth0':'g0/0'}}));
  return {schemaVersion:1,devices,links};
}
test('RIP learns both directions and forwards request and reply', () => {
  const doc = topology();
  assert.equal(validate(doc), null);
  assert.deepEqual(converge(doc).get('r0').find(r=>r.source==='RIP'), {network:'10.0.2.0',prefix:24,port:'g0/1',metric:1,source:'RIP',nextHop:'10.0.1.1',nextRouter:'r1'});
  const result = ping(doc,'a','b');
  assert.equal(result.ok,true);
  assert.equal(result.events.filter(e=>e.action==='Route').length,4);
  assert.match(result.events.at(-1).detail,/Echo reply/);
  assert.deepEqual(ping(doc,'a','b'),result);
});
test('RIP disabled peer, excluded interface, or disconnected peer removes the route', () => {
  for (const change of [doc=>doc.devices[2].config.rip.enabled=false,doc=>doc.devices[2].config.rip.ports=['g0/1'],doc=>doc.links.splice(1,1)]) {
    const doc=topology(); change(doc);
    assert.equal(converge(doc).get('r0').some(r=>r.source==='RIP'),false);
    assert.equal(ping(doc,'a','b').ok,false);
  }
});
test('RIP needs a return gateway and rejects incompatible transit masks', () => {
  const doc=topology(); doc.devices.at(-1).config.gateway='';
  assert.match(ping(doc,'a','b').reason,/default gateway/);
  doc.devices[2].config.interfaces['g0/0'].prefix=25;
  assert.equal(converge(doc).get('r0').some(r=>r.source==='RIP'),false);
});
test('RIP permits metric 15 and rejects metric 16', () => {
  const doc=topology(17), routes=converge(doc).get('r0');
  assert.equal(routes.find(r=>r.network==='10.0.16.0').metric,15);
  assert.equal(routes.some(r=>r.network==='10.0.17.0'),false);
});
test('RIP configuration survives export and import and validates interface names', () => {
  const doc=topology();
  assert.deepEqual(parse(serialize(doc).text).document.devices[1].config.rip,doc.devices[1].config.rip);
  doc.devices[1].config.rip.ports=['bad'];
  assert.match(validate(doc),/Invalid RIP/);
});

test('traceroute crosses two RIP routers and returns three hop replies', () => {
  const result = require('./network-traceroute.js').run(topology(), 'a', 'b');
  assert.equal(result.ok, true);
  assert.deepEqual(result.hops.map(hop => hop.deviceId), ['r0', 'r1', 'b']);
  assert.deepEqual(result.hops.map(hop => hop.ttl), [1, 2, 3]);
  assert.equal(result.events.filter(event => event.action === 'Time exceeded').length, 2);
});
