import {PROFILES} from './profiles.js';
import {LIMIT} from './types.js';
const ids = ['profile','source','output','file','mode','scan','cancel','mask','clear','demo','status','error','summary','findings','reviewed','copy','download'];
const el = Object.fromEntries(ids.map(id => [id, document.getElementById(id)]));
for (const profile of PROFILES) {const option=document.createElement('option');option.value=profile.id;option.textContent=profile.label;el.profile.append(option);}
let worker, ready = false, busy = false, id = 0, fileRead = 0;
let result, selections = [], resetKey = true;
const demo = 'hostname CLIENT-A\nusername DEMO-USER secret 9 DEMO-HASH\ninterface GigabitEthernet0/1\n description DEMO-LINK\n ip address 192.0.2.10 255.255.255.0\n!\nip route 0.0.0.0 0.0.0.0 192.0.2.1\n';
function message(text) { el.status.textContent = text; }
function error(text) { el.error.textContent = text; el.error.hidden = !text; }
function controls() {
  for (const name of ['scan','file','demo','mode','profile']) el[name].disabled = !ready || busy;
  el.cancel.disabled = !busy;
  el.mask.disabled = busy || !result;
  el.reviewed.disabled = busy || !result || result.flags.length > 0;
  const allowed = !el.reviewed.disabled && el.reviewed.checked;
  el.copy.disabled = el.download.disabled = !allowed;
}
function clearPreview() {
  result = undefined;
  el.output.value = '';
  el.reviewed.checked = false;
  el.findings.replaceChildren();
  el.summary.textContent = 'No preview yet.';
  controls();
}
function startWorker() {
  ready = false;
  const current = new Worker(new URL('./worker.js', import.meta.url), {type:'module'});
  worker = current;
  current.onmessage = ({data}) => {
    if (current !== worker) return;
    if (data.ready) { ready = true; controls(); message('Ready. Add a configuration, then preview redaction.'); return; }
    if (data.id !== id) return;
    busy = false;
    if (data.error) { clearPreview(); error(data.error); return; }
    result = data.result;
    el.output.value = result.output;
    el.reviewed.checked = false;
    el.summary.textContent = result.replacements.length + ' replacements. ' + result.flags.length + ' sections block export.';
    el.findings.replaceChildren();
    // Bound DOM work while keeping every flagged section accessible through repeated scans.
    for (const flag of result.flags.slice(0, 100)) {
      const row = document.createElement('div'); row.className = 'finding';
      const text = document.createElement('p'); text.textContent = 'Line ' + flag.line + ': ' + flag.rule;
      const button = document.createElement('button'); button.type = 'button'; button.className = 'btn'; button.textContent = 'Mask section at line ' + flag.line;
      button.onclick = () => { selections.push({start:flag.start,end:flag.end}); preview(false); };
      row.append(text, button); el.findings.append(row);
    }
    if (result.flags.length > 100) {
      const more = document.createElement('p');
      more.textContent = 'The first 100 findings appear here. Mask these sections to show the remaining findings.';
      el.findings.append(more);
    }
    controls();
    message(result.flags.length ? 'Mask each flagged section before export.' : 'Compare the full text, then confirm your review.');
  };
  current.onerror = event => {
    event.preventDefault();
    if (current !== worker) return;
    current.terminate(); ready = false; busy = false; clearPreview();
    error('The local scanner could not start. Reload this page in a current browser over HTTPS.');
  };
  controls();
}
function invalidate() {
  fileRead++;
  id++;
  if (busy) { worker.terminate(); busy = false; startWorker(); }
  selections = []; resetKey = true;
  clearPreview(); error('');
  message('Source changed. Preview redaction again.');
}
function preview(newScan = true) {
  if (!ready || busy) return;
  error('');
  if (!el.source.value.trim()) { clearPreview(); error('Add a configuration first.'); return; }
  if (new TextEncoder().encode(el.source.value).length > LIMIT) {
    clearPreview(); error('The configuration exceeds the 5 MiB limit.'); return;
  }
  if (newScan) { selections = []; resetKey = true; }
  clearPreview(); busy = true; controls();
  message('Scanning locally. You can cancel this scan.');
  worker.postMessage({id:++id, source:el.source.value, profile:el.profile.value, mode:el.mode.value, selections, resetKey});
  resetKey = false;
}
el.source.addEventListener('input', invalidate);
el.scan.onclick = () => preview();
el.profile.onchange = () => { invalidate(); preview(); };
el.mode.onchange = () => { clearPreview(); preview(false); };
el.cancel.onclick = () => {
  id++; worker.terminate(); busy = false; clearPreview(); startWorker();
  message('Scan cancelled. No output was exported.');
};
el.mask.onmousedown = event => event.preventDefault();
el.mask.onclick = () => {
  const start = el.source.selectionStart, end = el.source.selectionEnd;
  if (start === end) { error('Select nonempty text in the original configuration.'); el.source.focus(); return; }
  selections.push({start,end}); preview(false);
};
el.reviewed.onchange = controls;
function exportText() {
  if (busy || !result || result.flags.length || !el.reviewed.checked) return undefined;
  return result.output;
}
el.copy.onclick = async () => {
  const text = exportText(); if (text === undefined) return;
  try { await navigator.clipboard.writeText(text); message('Redacted text copied.'); }
  catch { error('Clipboard access failed. Use Download redacted copy.'); }
};
el.download.onclick = () => {
  const text = exportText(); if (text === undefined) return;
  const url = URL.createObjectURL(new Blob([text], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a'); link.href = url; link.download = 'redacted-config.txt';
  link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  message('Redacted copy downloaded.');
};
el.file.onchange = async () => {
  const file = el.file.files[0]; if (!file) return;
  invalidate(); el.source.value = ''; const request = fileRead;
  if (file.size > LIMIT) { el.file.value = ''; error('The configuration exceeds the 5 MiB limit.'); return; }
  try {
    const text = await file.text();
    if (request !== fileRead) return;
    if (text.includes('\0')) { error('Choose a text configuration file.'); return; }
    el.source.value = text; message('File loaded locally. Preview redaction next.');
  } catch { if (request === fileRead) error('The file could not be read. Choose a local text file.'); }
  finally { el.file.value = ''; }
};
el.demo.onclick = () => { el.profile.value='cisco-ios'; invalidate(); el.source.value = demo; preview(); };
function clearPage(restart = true) {
  fileRead++; id++; worker?.terminate(); busy = false; ready = false;
  el.source.value = ''; el.file.value = ''; selections = []; resetKey = true;
  clearPreview(); error('');
  if (restart) startWorker();
}
el.clear.onclick = () => { clearPage(); el.source.focus(); };
window.addEventListener('pagehide', () => clearPage(false));
window.addEventListener('pageshow', event => { if (event.persisted) startWorker(); });
startWorker();
