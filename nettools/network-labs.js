(function (root, factory) {
  const api = factory(root.NetworkSimulation || require('./network-simulation.js'));
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.NetworkLabs = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (simulation) {
  function modeFor(document) {
    const ids = new Set((document.devices || []).map(device => device.id));
    return ids.has('routed-router') && (ids.has('routed-pc-1') || ids.has('routed-pc-2')) ? 'routed' : 'first';
  }
  function firstPing(document, completedPing) {
    const nodes = document.devices || [];
    const a = nodes.find(device => device.id === 'pc-1' && device.type === 'pc');
    const b = nodes.find(device => device.id === 'pc-2' && device.type === 'pc');
    const sw = nodes.find(device => device.id === 'switch-1' && device.type === 'switch');
    const linked = (x, y) => document.links?.some(link =>
      (link.a.deviceId === x && link.b.deviceId === y) || (link.a.deviceId === y && link.b.deviceId === x));
    const ready = !!(a && b && sw);
    const firstCable = ready && linked(a.id, sw.id);
    const secondCable = ready && linked(b.id, sw.id);
    const address = ready && a.config?.interfaces?.eth0?.ip && b.config?.interfaces?.eth0?.ip &&
      simulation.sameSubnet(a.config.interfaces.eth0.ip, b.config.interfaces.eth0.ip, Number(a.config.interfaces.eth0.prefix)) &&
      simulation.sameSubnet(b.config.interfaces.eth0.ip, a.config.interfaces.eth0.ip, Number(b.config.interfaces.eth0.prefix));
    const pinged = !!(completedPing && completedPing.ok && completedPing.sourceId === 'pc-1' && completedPing.targetId === 'pc-2');
    const steps = [
      {label: 'Load the two-PC sample', done: ready, hint: 'Choose Start lab to load PC 1, Switch 1, and PC 2.'},
      {label: 'Cable PC 1 to Switch 1', done: !!firstCable, hint: 'Select PC 1, choose Connect selected, then choose Switch 1.'},
      {label: 'Cable PC 2 to Switch 1', done: !!secondCable, hint: 'Select PC 2, choose Connect selected, then choose Switch 1.'},
      {label: 'Give both PCs addresses in one subnet', done: !!address, hint: 'Use each PC’s IPv4 settings. The sample addresses are 192.168.1.10/24 and 192.168.1.20/24.'},
      {label: 'Run a successful ping from PC 1 to PC 2', done: pinged, hint: 'Run ping below. If it fails, read the result and step through the packet trace.'}
    ];
    const next = steps.find(step => !step.done);
    return {steps, complete: !next, hint: next ? next.hint : 'Lab complete. Step through the ARP and ICMP events below.'};
  }
  function routedGateway(document, completedPing) {
    const nodes = document.devices || [];
    const source = nodes.find(device => device.id === 'routed-pc-1' && device.type === 'pc');
    const target = nodes.find(device => device.id === 'routed-pc-2' && device.type === 'pc');
    const router = nodes.find(device => device.id === 'routed-router' && device.type === 'router');
    const ready = !!(source && target && router);
    const targetGateway = router?.config?.interfaces?.['g0/1']?.ip;
    const gatewaySet = !!(ready && targetGateway && target.config?.gateway === targetGateway);
    const pinged = !!(completedPing?.ok && completedPing.sourceId === 'routed-pc-1' && completedPing.targetId === 'routed-pc-2');
    const steps = [
      {label: 'Load the two-subnet topology', done: ready, hint: 'Choose Start routed lab to load two PCs, two switches, and a router.'},
      {label: 'Set PC 2’s gateway to the router on its subnet', done: gatewaySet,
        hint: `Select PC 2 and set its default gateway to ${targetGateway || 'the router’s g0/1 address'}.`},
      {label: 'Run a routed ping from PC 1 to PC 2', done: pinged,
        hint: 'Run ping below, then step through the router and return-path events.'}
    ];
    const next = steps.find(step => !step.done);
    return {steps, complete: !next, hint: next ? next.hint : 'Routed lab complete. Step through both directions of the ping.'};
  }
  return {modeFor, firstPing, routedGateway};
});
