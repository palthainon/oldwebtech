(() => {
  const canvas = document.getElementById('sim-canvas');
  const toolTabs = [...document.querySelectorAll('.sim-tabs [role="tab"]')];
  function selectToolTab(tab, focus = false) {
    for (const item of toolTabs) {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    }
    if (focus) tab.focus();
  }
  toolTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectToolTab(tab));
    tab.addEventListener('keydown', event => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = toolTabs[1 - index];
      if (event.key === 'Home') next = toolTabs[0];
      if (event.key === 'End') next = toolTabs.at(-1);
      if (next) { event.preventDefault(); selectToolTab(next, true); }
    });
  });
  document.getElementById('open-diagnostics').addEventListener('click', event => {
    event.preventDefault(); selectToolTab(toolTabs[1], true);
  });
  const expandButton = document.getElementById('expand-workspace');
  function expandWorkspace(expanded) {
    document.getElementById('main-content').classList.toggle('sim-expanded', expanded);
    document.body.classList.toggle('sim-expanded-open', expanded);
    expandButton.setAttribute('aria-pressed', String(expanded));
    expandButton.textContent = expanded ? 'Exit expanded view (Esc)' : 'Expand workspace';
    updateWires();
  }
  expandButton.addEventListener('click', () => expandWorkspace(expandButton.getAttribute('aria-pressed') !== 'true'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && expandButton.getAttribute('aria-pressed') === 'true') {
      expandWorkspace(false); expandButton.focus();
    }
  });
  new ResizeObserver(updateWires).observe(canvas);
  const details = document.getElementById('device-details');
  const removeButton = document.getElementById('remove-device');
  const connectButton = document.getElementById('connect-device');
  const connectPort = document.getElementById('connect-port');
  const cancelConnectButton = document.getElementById('cancel-connect');
  const undoButton = document.getElementById('undo-topology');
  const redoButton = document.getElementById('redo-topology');
  const status = document.getElementById('sim-status');
  const count = document.getElementById('device-count');
  const pingSource = document.getElementById('ping-source');
  const pingTarget = document.getElementById('ping-target');
  const pingResult = document.getElementById('ping-result');
  const pingEvents = document.getElementById('ping-events');
  const packetDetail = document.getElementById('packet-detail');
  const traceProgress = document.getElementById('trace-progress');
  const labSteps = document.getElementById('lab-steps');
  const labHint = document.getElementById('lab-hint');
  const labTitle = document.getElementById('lab-title');
  const labDescription = document.getElementById('lab-description');
  let labMode = 'first';
  let completedPing = null;
  const traceButtons = {
    first: document.getElementById('trace-first'),
    previous: document.getElementById('trace-prev'),
    next: document.getElementById('trace-next'),
    last: document.getElementById('trace-last')
  };
  const playButton = document.getElementById('trace-play');
  const speedSelect = document.getElementById('trace-speed');
  let consoleCommand = 'Ready.';
  let consoleResult = '';
  let animatedEvent = null;
  const consoleOutput = document.getElementById('console-output');
  const animationStatus = document.getElementById('animation-status');
  const animatePackets = document.getElementById('animate-packets');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) animatePackets.checked = false;
  let trace = NetworkTrace.create([]);
  let player = NetworkTrace.createPlayer(trace, renderTrace);
  const labels = {pc: 'PC', switch: 'Switch', router: 'Router'};
  const glyphs = {
    pc: ['M8 4h48v30H8z', 'M27 34v9h10v-9 M19 44h26 M13 9h38v20H13z'],
    switch: ['M4 14h56v30H4z', 'M10 24h8v8h-8z M22 24h8v8h-8z M34 24h8v8h-8z M46 24h8v8h-8z M10 38h4 M22 38h4'],
    router: ['M5 16a27 11 0 0 1 54 0v19a27 11 0 0 1-54 0z', 'M5 16a27 11 0 0 0 54 0 M20 12h24 m-4-4 4 4-4 4 M44 20H20 m4-4-4 4 4 4']
  };
  const draftKey = 'owt_network_simulator_draft_v1';
  const sample = () => [
    {id: 'pc-1', type: 'pc', name: 'PC 1', x: 10, y: 38, config: {interfaces: {eth0: {ip: '192.168.1.10', prefix: 24}}, gateway: ''}},
    {id: 'switch-1', type: 'switch', name: 'Switch 1', x: 43, y: 38},
    {id: 'pc-2', type: 'pc', name: 'PC 2', x: 76, y: 38, config: {interfaces: {eth0: {ip: '192.168.1.20', prefix: 24}}, gateway: ''}}
  ];
  const routedSample = () => {
    const nodes = [
      {id: 'routed-pc-1', type: 'pc', name: 'PC 1', x: 0, y: 5, config: {interfaces: {eth0: {ip: '192.168.1.10', prefix: 24}}, gateway: '192.168.1.1'}},
      {id: 'routed-switch-1', type: 'switch', name: 'Switch 1', x: 25, y: 75},
      {id: 'routed-router', type: 'router', name: 'Router 1', x: 50, y: 30, config: {interfaces: {'g0/0': {ip: '192.168.1.1', prefix: 24}, 'g0/1': {ip: '192.168.2.1', prefix: 24}}}},
      {id: 'routed-switch-2', type: 'switch', name: 'Switch 2', x: 75, y: 75},
      {id: 'routed-pc-2', type: 'pc', name: 'PC 2', x: 100, y: 5, config: {interfaces: {eth0: {ip: '192.168.2.20', prefix: 24}}, gateway: '192.168.2.1'}}
    ];
    const wires = [];
    for (const [a, b] of [['routed-pc-1', 'routed-switch-1'], ['routed-switch-1', 'routed-router'], ['routed-router', 'routed-switch-2'], ['routed-switch-2', 'routed-pc-2']]) {
      wires.push(NetworkTopology.connect(nodes, wires, a, b).link);
    }
    return {nodes, wires};
  };
  let devices = sample();
  let links = [];
  let selectedId = null;
  let connectingFrom = null;
  let connectingPort = null;
  let drag = null;
  let history;
  const topologyFile = document.getElementById('topology-file');
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  function announce(message) { status.textContent = message; }
  function highlightCurrentDevice() {
    const currentId = trace.current()?.deviceId;
    canvas.querySelectorAll('.sim-device').forEach(button => {
      button.classList.toggle('packet-active', button.dataset.id === currentId);
    });
  }
  function renderLab() {
    if (devices.filter(device => device.type === 'router').length > 1 && devices.some(device => device.config?.rip)) {
      labTitle.textContent = 'RIP routing practice';
      labDescription.textContent = 'Select a router to configure RIP version 2 and inspect its routing table.';
      labSteps.replaceChildren();
      for (const text of ['Enable RIP on both routers and their required interfaces.', 'Run ping between the PCs. Use Next or Play to inspect learned routes and forwarding.', 'Disable RIP on one router, save settings, then run ping again to test the missing route.']) {
        const row = document.createElement('li'); row.textContent = text; labSteps.append(row);
      }
      labHint.textContent = completedPing?.ok ? 'The ping succeeded. Try disabling RIP to test a failure.' : 'Load RIP example for a ready-to-test two-router network.';
      return;
    }
    const routed = labMode === 'routed';
    const lab = routed ? NetworkLabs.routedGateway({devices, links}, completedPing) : NetworkLabs.firstPing({devices, links}, completedPing);
    labTitle.textContent = routed ? 'Guided lab: routed reply' : 'Guided lab: first ping';
    labDescription.textContent = routed
      ? 'Configure PC 2’s return gateway, then inspect the request and reply across two subnets.'
      : 'Connect two PCs through a switch and find out why the first ping starts with ARP.';
    labSteps.replaceChildren();
    for (const step of lab.steps) {
      const row = document.createElement('li');
      row.textContent = `${step.done ? '✓' : '○'} ${step.label}`;
      row.className = step.done ? 'done' : '';
      labSteps.append(row);
    }
    labHint.textContent = lab.hint;
  }
  function drawPacket(event) {
    if (event === animatedEvent) return;
    animatedEvent = event;
    canvas.querySelectorAll('.sim-packet').forEach(marker => marker.remove());
    if (!event) return;
    const here = devices.find(device => device.id === event.deviceId);
    if (!here) return;
    const incoming = event.ingressPort && !['Route', 'Drop', 'Learn', 'Time exceeded', 'Echo reply'].includes(event.action);
    const ports = incoming ? [event.ingressPort] : (['Send', 'Probe'].includes(event.action) ? event.egressPorts : []);
    const paths = ports.map(port => {
      const cable = links.find(link => [link.a,link.b].some(end => end.deviceId === here.id && end.port === port));
      if (!cable) return null;
      const otherEnd = cable.a.deviceId === here.id ? cable.b : cable.a;
      const other = devices.find(device => device.id === otherEnd.deviceId);
      return incoming ? [other,here] : [here,other];
    }).filter(Boolean);
    if (!paths.length) paths.push([here,here]);
    const width = canvas.clientWidth, height = canvas.clientHeight;
    const point = device => ({x:47 + device.x / 100 * (width - 94),y:35 + device.y / 100 * (height - 70)});
    for (const [from,to] of paths) {
      const start = point(from), end = point(to);
      const marker = document.createElement('span'); marker.className = 'sim-packet';
      marker.classList.toggle('packet-drop', event.action === 'Drop');
      marker.classList.toggle('packet-reply', ['Reply', 'Echo reply', 'Time exceeded'].includes(event.action) || /echo reply/i.test(event.detail));
      marker.setAttribute('aria-hidden','true'); marker.textContent = event.action === 'Drop' ? '×' : '●';
      marker.style.left = end.x + 'px'; marker.style.top = end.y + 'px'; canvas.append(marker);
      if (animatePackets.checked && !reducedMotion.matches) marker.animate([
        {transform:'translate(' + (start.x-end.x) + 'px,' + (start.y-end.y) + 'px)'},
        {transform:'translate(0,0)'}
      ],{duration:Math.max(100,Number(speedSelect.value)*0.8),easing:'linear',fill:'forwards'});
    }
  }
  function renderConsole() {
    const rows = trace.visible().map(step => step.number + '. ' + step.protocol + ' ' + step.device + ': ' + step.detail);
    consoleOutput.textContent = [consoleCommand,...rows,...(trace.index() === trace.total()-1 && consoleResult ? [consoleResult] : [])].join('\n');
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
    const current = trace.current();
    animationStatus.textContent = current ? (player.isPlaying() ? 'Playing' : 'Paused') + ' — ' + current.protocol + ' at ' + current.device + ': ' + current.action : 'Run ping or traceroute to see packets move across the map.';
    animationStatus.setAttribute('aria-live',player.isPlaying() ? 'off' : 'polite');
    drawPacket(current);
  }
  function renderTrace() {
    const current = trace.current();
    pingEvents.replaceChildren();
    trace.visible().forEach((step, index) => {
      const row = document.createElement('li');
      if (step === current) row.setAttribute('aria-current', 'step');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'packet-event-button';
      button.setAttribute('aria-label', `Show event ${step.number}: ${step.protocol} at ${step.device}, ${step.action}`);
      const heading = document.createElement('strong');
      heading.textContent = `${step.protocol} · ${step.device} · ${step.action}`;
      const detail = document.createElement('span'); detail.textContent = step.detail;
      button.append(heading, detail);
      button.addEventListener('click', () => {
        player.pause(); trace.jump(index); renderTrace();
        pingEvents.querySelectorAll('.packet-event-button')[index]?.focus();
      });
      row.append(button); pingEvents.append(row);
    });
    packetDetail.replaceChildren();
    if (current) {
      const heading = document.createElement('h3'); heading.textContent = `Event ${current.number}: ${current.protocol} at ${current.device}`;
      const dl = document.createElement('dl');
      const fields = [
        ['Action', current.action], ['Source IP', current.packet.sourceIp], ['Destination IP', current.packet.destinationIp],
        ['Source MAC', current.packet.sourceMac], ['Destination MAC', current.packet.destinationMac],
        ['Ingress port', current.ingressPort || 'Origin device'],
        ['Egress ports', current.egressPorts.length ? current.egressPorts.join(', ') : 'None recorded']
      ];
      if (current.macTable) fields.push(['Switch MAC table', current.macTable.map(entry => `${entry.address} → ${entry.port}`).join('; ')]);
      for (const [term, value] of fields) {
        const dt = document.createElement('dt'); dt.textContent = term;
        const dd = document.createElement('dd'); dd.textContent = value;
        dl.append(dt, dd);
      }
      packetDetail.append(heading, dl);
    }
    traceProgress.textContent = current ? `Event ${trace.index() + 1} of ${trace.total()}` : 'No packet events';
    traceButtons.first.disabled = !current || trace.index() === 0;
    traceButtons.previous.disabled = !current || trace.index() === 0;
    traceButtons.next.disabled = !current || trace.index() === trace.total() - 1;
    traceButtons.last.disabled = !current || trace.index() === trace.total() - 1;
    playButton.disabled = trace.total() < 2;
    playButton.textContent = player.isPlaying() ? 'Pause' : 'Play';
    traceProgress.setAttribute('aria-live', player.isPlaying() ? 'off' : 'polite');
    highlightCurrentDevice();
    renderConsole();
  }
  function clearTrace() {
    player.pause();
    completedPing = null;
    consoleCommand = 'Topology changed. Run a new diagnostic.'; consoleResult = '';
    trace = NetworkTrace.create([]);
    player = NetworkTrace.createPlayer(trace, renderTrace);
    renderTrace();
    renderLab();
    pingResult.textContent = 'Topology changed. Run a ping to see the current path.';
  }
  function refreshPingOptions() {
    const previousSource = pingSource.value;
    const previousTarget = pingTarget.value;
    const pcs = devices.filter(device => device.type === 'pc');
    for (const select of [pingSource, pingTarget]) {
      select.replaceChildren();
      for (const pc of pcs) {
        const option = document.createElement('option');
        option.value = pc.id; option.textContent = `${pc.name} (${pc.config?.interfaces?.eth0?.ip || 'no IP'})`;
        select.append(option);
      }
    }
    pingSource.value = pcs.some(pc => pc.id === previousSource) ? previousSource : pcs[0]?.id || '';
    pingTarget.value = pcs.some(pc => pc.id === previousTarget) ? previousTarget : pcs[1]?.id || pcs[0]?.id || '';
  }
  function updateHistoryButtons() {
    undoButton.disabled = !history.canUndo();
    redoButton.disabled = !history.canRedo();
  }
  function saveDraft(invalidateTrace = true, recordHistory = true) {
    if (invalidateTrace) clearTrace();
    const result = NetworkDocument.serialize({schemaVersion: NetworkDocument.VERSION, devices, links});
    if (result.error) { announce(result.error); return; }
    if (recordHistory) history.record(result.text);
    updateHistoryButtons();
    try { localStorage.setItem(draftKey, result.text); }
    catch (_) { announce('Could not save the local draft. Your changes remain on this page.'); }
  }
  try {
    const stored = localStorage.getItem(draftKey);
    if (stored) {
      const result = NetworkDocument.parse(stored);
      if (result.document) {
        devices = result.document.devices; links = result.document.links;
        labMode = NetworkLabs.modeFor(result.document);
      }
      else announce('Saved draft was invalid; the sample topology was loaded.');
    }
  } catch (_) { announce('Saved draft could not be read; the sample topology was loaded.'); }
  history = NetworkHistory.create(NetworkDocument.serialize({schemaVersion: NetworkDocument.VERSION, devices, links}).text);
  updateHistoryButtons();
  function restoreHistory(snapshot, message) {
    if (!snapshot) return;
    const restored = NetworkDocument.parse(snapshot);
    if (!restored.document) return;
    devices = restored.document.devices;
    links = restored.document.links;
    labMode = NetworkLabs.modeFor(restored.document);
    selectedId = null; connectingFrom = null; connectingPort = null;
    saveDraft(true, false);
    render(); announce(message);
  }
  undoButton.addEventListener('click', () => restoreHistory(history.undo(), 'Topology change undone.'));
  redoButton.addEventListener('click', () => restoreHistory(history.redo(), 'Topology change redone.'));
  function addField(form, labelText, name, value) {
    const label = document.createElement('label');
    label.textContent = labelText;
    const input = document.createElement('input');
    input.type = 'text'; input.name = name; input.value = value;
    input.autocomplete = 'off'; input.spellcheck = false;
    label.append(input); form.append(label);
  }
  function addConfigForm(device) {
    if (device.type === 'switch') return;
    const form = document.createElement('form');
    form.className = 'sim-config';
    const heading = document.createElement('h4'); heading.textContent = 'IPv4 configuration'; form.append(heading);
    for (const port of NetworkTopology.portsByType[device.type]) {
      const iface = device.config?.interfaces?.[port] || {};
      const subhead = document.createElement('p'); subhead.textContent = port; form.append(subhead);
      addField(form, 'IPv4 address', `${port}-ip`, iface.ip || '');
      addField(form, 'Prefix length', `${port}-prefix`, iface.prefix ?? '');
    }
    if (device.type === 'pc') addField(form, 'Default gateway', 'gateway', device.config?.gateway || '');
    if (device.type === 'router') {
      const title = document.createElement('h4'); title.textContent = 'RIP version 2'; form.append(title);
      for (const [name, text, checked] of [
        ['rip-enabled', 'Enable RIP', device.config?.rip?.enabled],
        ...NetworkTopology.portsByType.router.map(port => ['rip-' + port, 'RIP on ' + port, device.config?.rip?.ports?.includes(port) ?? true])
      ]) {
        const label = document.createElement('label');
        const input = document.createElement('input'); input.type = 'checkbox'; input.name = name; input.checked = Boolean(checked);
        label.append(input, document.createTextNode(text)); form.append(label);
      }
      const note = document.createElement('p'); note.textContent = 'Selected interfaces exchange RIP routes and advertise their connected subnets. Routes recalculate immediately. Update timers and authentication are not simulated.'; form.append(note);
    }
    const submit = document.createElement('button'); submit.type = 'submit'; submit.textContent = 'Save settings'; form.append(submit);
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const config = {interfaces: {}};
      for (const port of NetworkTopology.portsByType[device.type]) {
        const ip = String(data.get(`${port}-ip`) || '').trim();
        const prefix = String(data.get(`${port}-prefix`) || '').trim();
        config.interfaces[port] = {ip, prefix: prefix === '' ? '' : Number(prefix)};
      }
      if (device.type === 'router') config.rip = {enabled: data.has('rip-enabled'), ports: NetworkTopology.portsByType.router.filter(port => data.has('rip-' + port))};
      if (device.type === 'pc') config.gateway = String(data.get('gateway') || '').trim();
      const candidate = {...device, config};
      const error = NetworkDocument.configError(candidate);
      if (error) { announce(`${device.name}: ${error}`); return; }
      device.config = config;
      saveDraft(); render(); announce(`${device.name} settings saved.`);
    });
    details.append(form);
    if (device.type === 'router') {
      const title = document.createElement('h4'); title.textContent = 'Routing table'; details.append(title);
      const list = document.createElement('ul');
      for (const route of NetworkRip.converge({devices, links}).get(device.id) || []) {
        const row = document.createElement('li');
        row.textContent = route.network + '/' + route.prefix + ' — ' + route.source + ', ' + route.port + (route.nextHop ? ', via ' + route.nextHop + ', metric ' + route.metric : '');
        list.append(row);
      }
      if (!list.children.length) { const row = document.createElement('li'); row.textContent = 'Configure an interface to add a connected route.'; list.append(row); }
      details.append(list);
    }
  }
  function updateWires() {
    const rect = canvas.getBoundingClientRect();
    canvas.querySelectorAll('.sim-wires line').forEach((line, index) => {
      const link = links[index];
      if (!link) return;
      const a = devices.find(device => device.id === link.a.deviceId);
      const b = devices.find(device => device.id === link.b.deviceId);
      if (!a || !b) return;
      line.setAttribute('x1', 47 + a.x / 100 * (rect.width - 94));
      line.setAttribute('y1', 35 + a.y / 100 * (rect.height - 70));
      line.setAttribute('x2', 47 + b.x / 100 * (rect.width - 94));
      line.setAttribute('y2', 35 + b.y / 100 * (rect.height - 70));
    });
  }
  function render() {
    canvas.replaceChildren();
    const wires = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    wires.classList.add('sim-wires');
    wires.setAttribute('aria-hidden', 'true');
    for (const link of links) {
      const a = devices.find(device => device.id === link.a.deviceId);
      const b = devices.find(device => device.id === link.b.deviceId);
      if (!a || !b) continue;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      wires.append(line);
    }
    canvas.append(wires);
    for (const device of devices) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'sim-device';
      button.dataset.id = device.id;
      button.style.left = `calc(${device.x}% - ${device.x * .94}px)`;
      button.style.top = `calc(${device.y}% - ${device.y * .70}px)`;
      button.setAttribute('aria-label', `${device.name}, ${labels[device.type]}. Arrow keys move; Delete removes.`);
      button.setAttribute('aria-pressed', String(device.id === selectedId));
      const glyph = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      glyph.classList.add('glyph');
      glyph.setAttribute('aria-hidden', 'true');
      glyph.setAttribute('viewBox', '0 0 64 48');
      glyph.setAttribute('focusable', 'false');
      glyphs[device.type].forEach((shape, index) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', shape);
        path.setAttribute('fill', index === 0 ? 'var(--btn)' : 'none');
        glyph.append(path);
      });
      const name = document.createElement('span');
      name.className = 'device-name'; name.textContent = device.name;
      button.append(glyph, name);
      canvas.append(button);
    }
    count.textContent = `${devices.length} device${devices.length === 1 ? '' : 's'}`;
    refreshPingOptions();
    renderLab();
    const selected = devices.find(item => item.id === selectedId);
    details.replaceChildren();
    if (selected) {
      const dl = document.createElement('dl');
      for (const [term, value] of [['Name', selected.name], ['Type', labels[selected.type]], ['Position', `${Math.round(selected.x)}%, ${Math.round(selected.y)}%`]]) {
        const dt = document.createElement('dt'); dt.textContent = term;
        const dd = document.createElement('dd'); dd.textContent = value;
        dl.append(dt, dd);
      }
      details.append(dl);
      addConfigForm(selected);
      const list = document.createElement('ul');
      const attached = NetworkTopology.linksFor(links, selected.id);
      for (const link of attached) {
        const own = link.a.deviceId === selected.id ? link.a : link.b;
        const other = link.a.deviceId === selected.id ? link.b : link.a;
        const neighbor = devices.find(device => device.id === other.deviceId);
        const row = document.createElement('li');
        row.textContent = `${own.port} ↔ ${neighbor.name} ${other.port} `;
        const disconnect = document.createElement('button');
        disconnect.type = 'button'; disconnect.textContent = 'Disconnect';
        disconnect.setAttribute('aria-label', `Disconnect ${selected.name} ${own.port} from ${neighbor.name} ${other.port}`);
        disconnect.addEventListener('click', () => {
          links = links.filter(item => item.id !== link.id);
          saveDraft();
          render(); announce(`Disconnected ${selected.name} from ${neighbor.name}.`);
        });
        row.append(disconnect); list.append(row);
      }
      if (attached.length) details.append(list);
    } else {
      const p = document.createElement('p'); p.textContent = 'Select a device to inspect or move it.'; details.append(p);
    }
    const previousPort = connectPort.value;
    const availablePorts = selected ? NetworkTopology.freePorts(selected, links) : [];
    connectPort.replaceChildren(...availablePorts.map(port => {
      const option = document.createElement('option'); option.value = port; option.textContent = port; return option;
    }));
    if (availablePorts.includes(previousPort)) connectPort.value = previousPort;
    connectPort.disabled = !selected || !!connectingFrom || !availablePorts.length;
    removeButton.disabled = !selected;
    connectButton.disabled = !selected || !!connectingFrom || !availablePorts.length;
    cancelConnectButton.hidden = !connectingFrom;
    if (connectingFrom) connectButton.textContent = 'Choose another device';
    else connectButton.textContent = 'Connect selected';
    updateWires();
    highlightCurrentDevice();
    animatedEvent = null; drawPacket(trace.current());
  }
  function select(id) {
    if (connectingFrom) {
      const from = devices.find(device => device.id === connectingFrom);
      const to = devices.find(device => device.id === id);
      const result = NetworkTopology.connect(devices, links, connectingFrom, id, connectingPort);
      connectingFrom = null;
      connectingPort = null;
      if (result.error) announce(result.error);
      else { links.push(result.link); saveDraft(); announce(`Connected ${from.name} to ${to.name}.`); }
    } else {
      const device = devices.find(item => item.id === id);
      if (device) announce(`${device.name} selected.`);
    }
    selectedId = id;
    render();
    canvas.querySelector(`[data-id="${id}"]`)?.focus();
  }
  function removeSelected() {
    const device = devices.find(item => item.id === selectedId);
    if (!device) return;
    devices = devices.filter(item => item.id !== selectedId);
    links = links.filter(link => link.a.deviceId !== selectedId && link.b.deviceId !== selectedId);
    connectingFrom = null;
    connectingPort = null;
    selectedId = null;
    saveDraft();
    render();
    announce(`${device.name} removed.`);
    canvas.focus();
  }
  document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => {
    const type = button.dataset.add;
    const n = 1 + Math.max(0, ...devices.filter(item => item.type === type).map(item => Number(item.name.match(/\d+$/)?.[0] || 0)));
    const device = {id: `${type}-${crypto.randomUUID()}`, type, name: `${labels[type]} ${n}`, x: 35 + (devices.length * 9) % 35, y: 15 + (devices.length * 11) % 55};
    devices.push(device);
    saveDraft();
    select(device.id);
    announce(`${device.name} added. Use arrow keys or drag to move it.`);
  }));
  document.getElementById('reset-topology').addEventListener('click', () => {
    labMode = 'first';
    devices = sample(); links = []; selectedId = null; connectingFrom = null; connectingPort = null;
    saveDraft(); render(); announce('Sample topology restored.');
  });
  document.getElementById('start-lab').addEventListener('click', () => {
    labMode = 'first';
    devices = sample(); links = []; selectedId = null; connectingFrom = null; connectingPort = null;
    saveDraft(); render(); announce('First ping lab loaded. Connect PC 1 to Switch 1.');
  });
  document.getElementById('load-rip-sample').addEventListener('click', () => {
    devices = [
      {id:'rip-pc-1',type:'pc',name:'PC 1',x:5,y:40,config:{interfaces:{eth0:{ip:'192.168.1.10',prefix:24}},gateway:'192.168.1.1'}},
      {id:'rip-r1',type:'router',name:'Router 1',x:35,y:40,config:{interfaces:{'g0/0':{ip:'192.168.1.1',prefix:24},'g0/1':{ip:'10.0.0.1',prefix:30}},rip:{enabled:true,ports:['g0/0','g0/1']}}},
      {id:'rip-r2',type:'router',name:'Router 2',x:65,y:40,config:{interfaces:{'g0/0':{ip:'10.0.0.2',prefix:30},'g0/1':{ip:'192.168.2.1',prefix:24}},rip:{enabled:true,ports:['g0/0','g0/1']}}},
      {id:'rip-pc-2',type:'pc',name:'PC 2',x:95,y:40,config:{interfaces:{eth0:{ip:'192.168.2.20',prefix:24}},gateway:'192.168.2.1'}}
    ];
    links = [];
    for (const [a,b] of [['rip-pc-1','rip-r1'],['rip-r1','rip-r2'],['rip-r2','rip-pc-2']]) links.push(NetworkTopology.connect(devices, links, a, b).link);
    selectedId = null; connectingFrom = null; connectingPort = null; labMode = 'first';
    saveDraft(); render(); announce('RIP example loaded. Run ping, then disable RIP on a router to test a missing route.');
  });
  document.getElementById('load-routed-sample').addEventListener('click', () => {
    labMode = 'routed';
    const example = routedSample();
    devices = example.nodes; links = example.wires; selectedId = null; connectingFrom = null; connectingPort = null;
    saveDraft(); render(); announce('Routed example loaded. Run a ping from PC 1 to PC 2.');
  });
  document.getElementById('start-routed-lab').addEventListener('click', () => {
    labMode = 'routed';
    const example = routedSample();
    example.nodes.find(device => device.id === 'routed-pc-2').config.gateway = '';
    devices = example.nodes; links = example.wires; selectedId = null; connectingFrom = null; connectingPort = null;
    saveDraft(); render(); announce('Routed lab loaded. Configure PC 2’s default gateway, then run a ping.');
  });
  document.getElementById('export-topology').addEventListener('click', () => {
    const result = NetworkDocument.serialize({schemaVersion: NetworkDocument.VERSION, devices, links});
    if (result.error) { announce(result.error); return; }
    const url = URL.createObjectURL(new Blob([result.text], {type: 'application/json'}));
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'oldweb-network-topology.json';
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    announce('Topology JSON exported.');
  });
  document.getElementById('import-topology').addEventListener('click', () => topologyFile.click());
  topologyFile.addEventListener('change', async () => {
    const file = topologyFile.files?.[0];
    topologyFile.value = '';
    if (!file) return;
    if (file.size > NetworkDocument.MAX_BYTES) { announce('Topology file exceeds 256 KiB.'); return; }
    let text;
    try { text = await file.text(); }
    catch (_) { announce('Could not read the selected file.'); return; }
    const result = NetworkDocument.parse(text);
    if (result.error) { announce(`Import failed: ${result.error}`); return; }
    devices = result.document.devices; links = result.document.links;
    labMode = NetworkLabs.modeFor(result.document);
    selectedId = null; connectingFrom = null; connectingPort = null;
    saveDraft(); render(); announce(`Imported ${devices.length} devices and ${links.length} cables.`);
  });
  removeButton.addEventListener('click', removeSelected);
  connectButton.addEventListener('click', () => {
    if (!selectedId) return;
    connectingFrom = selectedId;
    connectingPort = connectPort.value;
    render();
    announce(`Choose a second device to connect from ${connectingPort}.`);
  });
  cancelConnectButton.addEventListener('click', () => {
    connectingFrom = null; connectingPort = null; render(); announce('Connection cancelled.');
  });
  canvas.addEventListener('click', event => {
    const target = event.target.closest('.sim-device');
    if (target) select(target.dataset.id);
  });
  canvas.addEventListener('keydown', event => {
    const target = event.target.closest('.sim-device');
    if (!target) return;
    const device = devices.find(item => item.id === target.dataset.id);
    if (!device) return;
    if (event.key === 'Delete' || event.key === 'Backspace') { event.preventDefault(); selectedId = device.id; removeSelected(); return; }
    if (event.key === 'Escape' && connectingFrom) {
      event.preventDefault(); connectingFrom = null; connectingPort = null; render(); announce('Connection cancelled.'); return;
    }
    const offsets = {ArrowLeft: [-2, 0], ArrowRight: [2, 0], ArrowUp: [0, -2], ArrowDown: [0, 2]};
    if (!offsets[event.key]) return;
    event.preventDefault();
    device.x = clamp(device.x + offsets[event.key][0], 0, 100);
    device.y = clamp(device.y + offsets[event.key][1], 0, 100);
    saveDraft(false);
    selectedId = device.id; render(); canvas.querySelector(`[data-id="${device.id}"]`)?.focus();
    announce(`${device.name} moved to ${Math.round(device.x)}%, ${Math.round(device.y)}%.`);
  });
  canvas.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    const target = event.target.closest('.sim-device');
    if (!target) return;
    const device = devices.find(item => item.id === target.dataset.id);
    if (!device) return;
    drag = {id: device.id, pointerId: event.pointerId, x: device.x, y: device.y};
    target.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', event => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const device = devices.find(item => item.id === drag.id);
    const rect = canvas.getBoundingClientRect();
    if (!device) return;
    device.x = clamp((event.clientX - rect.left - 47) / Math.max(1, rect.width - 94) * 100, 0, 100);
    device.y = clamp((event.clientY - rect.top - 35) / Math.max(1, rect.height - 70) * 100, 0, 100);
    const element = canvas.querySelector(`[data-id="${device.id}"]`);
    element.style.left = `calc(${device.x}% - ${device.x * .94}px)`;
    element.style.top = `calc(${device.y}% - ${device.y * .70}px)`;
    updateWires();
  });
  canvas.addEventListener('pointerup', event => {
    if (!drag || drag.pointerId !== event.pointerId) return;
    drag = null;
    saveDraft(false);
  });
  canvas.addEventListener('pointercancel', () => {
    if (!drag) return;
    const device = devices.find(item => item.id === drag.id);
    if (device) { device.x = drag.x; device.y = drag.y; render(); }
    drag = null;
  });
  window.addEventListener('resize', updateWires);
  traceButtons.first.addEventListener('click', () => { player.pause(); trace.first(); renderTrace(); });
  traceButtons.previous.addEventListener('click', () => { player.pause(); trace.previous(); renderTrace(); });
  traceButtons.next.addEventListener('click', () => { player.pause(); trace.next(); renderTrace(); });
  traceButtons.last.addEventListener('click', () => { player.pause(); trace.last(); renderTrace(); });
  playButton.addEventListener('click', () => {
    if (player.isPlaying()) player.pause();
    else player.play(Number(speedSelect.value));
    renderTrace();
    canvas.querySelectorAll('.sim-packet').forEach(marker => marker.getAnimations().forEach(animation => {
      if (player.isPlaying()) animation.play(); else animation.pause();
    }));
  });
  speedSelect.addEventListener('change', () => {
    if (player.isPlaying()) { player.play(Number(speedSelect.value)); renderTrace(); }
  });
  function runDiagnostic(kind) {
    const model = {schemaVersion: NetworkDocument.VERSION, devices, links};
    const result = kind === 'traceroute' ? NetworkTraceroute.run(model, pingSource.value, pingTarget.value) : NetworkSimulation.ping(model, pingSource.value, pingTarget.value);
    const from = devices.find(device => device.id === pingSource.value);
    const to = devices.find(device => device.id === pingTarget.value);
    consoleCommand = '> ' + kind + ' ' + (to?.config?.interfaces?.eth0?.ip || '(choose destination)') + ' from ' + (from?.name || '(choose source)');
    consoleResult = result.reason;
    pingResult.textContent = result.reason;
    if (kind === 'ping') completedPing = {...result, sourceId: pingSource.value, targetId: pingTarget.value};
    player.pause();
    trace = NetworkTrace.create(result.events);
    player = NetworkTrace.createPlayer(trace, renderTrace);
    if (animatePackets.checked && !reducedMotion.matches) player.play(Number(speedSelect.value));
    renderTrace(); renderLab();
  }
  document.getElementById('ping-form').addEventListener('submit', event => {event.preventDefault(); runDiagnostic('ping');});
  document.getElementById('run-traceroute').addEventListener('click', () => runDiagnostic('traceroute'));
  animatePackets.addEventListener('change', () => {
    if (!animatePackets.checked) { player.pause(); canvas.querySelectorAll('.sim-packet').forEach(marker => marker.getAnimations().forEach(animation => animation.finish())); renderTrace(); }
  });
  NetworkConnectionUI.attach(canvas, {
    getDevice: id => devices.find(device => device.id === id),
    getFreePorts: device => NetworkTopology.freePorts(device, links),
    announce,
    arm: (id, port) => {
      selectedId = id; connectingFrom = id; connectingPort = port;
      render(); announce('Select a destination for ' + port + '. Escape cancels.');
      canvas.querySelector('[data-id="' + id + '"]')?.focus();
    },
    connect: (from, to, port) => {
      connectingFrom = from; connectingPort = port; select(to);
    }
  });
  canvas.tabIndex = -1;
  renderTrace();
  render();
})();
