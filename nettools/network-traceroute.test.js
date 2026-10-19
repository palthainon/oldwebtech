const test = require('node:test');
const assert = require('node:assert/strict');
const {run} = require('./network-traceroute.js');
function network(routed = true) {
  const pc = (id, ip, gateway) => ({id,name:id,type:'pc',x:10,y:40,config:{interfaces:{eth0:{ip,prefix:24}},gateway}});
  const devices = [pc('a','192.168.1.10',routed?'192.168.1.1':''),pc('b',routed?'192.168.2.20':'192.168.1.20',routed?'192.168.2.1':'')];
  const middle = routed ? {id:'r',name:'Router',type:'router',x:50,y:40,config:{interfaces:{'g0/0':{ip:'192.168.1.1',prefix:24},'g0/1':{ip:'192.168.2.1',prefix:24}}}} : {id:'s',name:'Switch',type:'switch',x:50,y:40};
  devices.push(middle);
  return {schemaVersion:1,devices,links:[
    {a:{deviceId:'a',port:'eth0'},b:{deviceId:middle.id,port:routed?'g0/0':'fa0/1'}},
    {a:{deviceId:'b',port:'eth0'},b:{deviceId:middle.id,port:routed?'g0/1':'fa0/2'}}
  ]};
}
test('traceroute expires TTL at the router and reaches the destination on the next probe',()=>{
  const result=run(network(),'a','b');
  assert.equal(result.ok,true);
  assert.deepEqual(result.hops.map(h=>[h.ttl,h.address,h.reached]),[[1,'192.168.1.1',false],[2,'192.168.2.20',true]]);
  assert.equal(result.events.filter(e=>e.action==='Time exceeded').length,1);
  assert.equal(result.events.at(-1).deviceId,'a');
  assert.equal(result.events.at(-1).packet.sourceIp,'192.168.2.20');
  assert.deepEqual(result,run(network(),'a','b'));
});
test('switches forward probes but do not count as traceroute hops',()=>{
  const result=run(network(false),'a','b');
  assert.equal(result.hops.length,1);
  assert.equal(result.hops[0].deviceId,'b');
  assert.equal(result.events.some(e=>e.deviceId==='s'),true);
});
test('traceroute hop limit does not report a destination reply',()=>{
  const result=run(network(),'a','b',1);
  assert.equal(result.ok,false);
  assert.equal(result.hops.length,1);
  assert.equal(result.events.some(e=>e.action==='Echo reply'),false);
});
test('failed paths and invalid endpoints never invent traceroute replies',()=>{
  const doc=network(); doc.links.pop();
  const result=run(doc,'a','b');
  assert.equal(result.ok,false);
  assert.deepEqual(result.hops,[]);
  assert.match(result.reason,/Traceroute stopped/);
  assert.equal(run(doc,'a','a').ok,false);
});

test('traceroute does not invent replies when the return gateway is missing',()=>{
  const doc=network(); doc.devices[1].config.gateway='';
  const result=run(doc,'a','b');
  assert.equal(result.ok,false);
  assert.deepEqual(result.hops,[]);
  assert.match(result.reason,/default gateway/);
});
