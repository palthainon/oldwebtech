'use strict';
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), assert = require('node:assert/strict');
const repo = path.resolve(__dirname, '../../../../..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'ai901-pilot.js'), 'utf8'), context);
const bank = context.window.CERT_BANK;
const text = v => typeof v === 'string' && v.trim().length > 0;
assert(bank && Array.isArray(bank.questions) && bank.questions.length, 'Missing questions');
for (const k of ['id', 'exam', 'vendor', 'code', 'objectivesUrl', 'asOf']) assert(text(bank[k]), `Missing bank.${k}`);
assert(bank.id.includes('pilot'), 'Use a separate pilot storage identifier');
const domains = new Set(bank.domains.map(d => d.id));
assert.equal(domains.size, bank.domains.length, 'Duplicate domain IDs');
for (const d of bank.domains) assert(text(d.id) && text(d.name) && Number.isFinite(d.weight) && d.weight >= 0 && d.weight <= 100, 'Invalid domain');
function csv(input) {
  const rows = []; let row = [], field = '', quoted = false;
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (c === '"') { if (quoted && input[i + 1] === '"') { field += '"'; i++; } else quoted = !quoted; }
    else if (c === ',' && !quoted) { row.push(field); field = ''; }
    else if (c === '\n' && !quoted) { row.push(field.replace(/\r$/, '')); rows.push(row); row = []; field = ''; }
    else field += c;
  }
  if (field || row.length) { row.push(field.replace(/\r$/, '')); rows.push(row); }
  const headers = rows.shift(); return rows.map(values => Object.fromEntries(headers.map((h, i) => [h, values[i]])));
}
const cards = new Map(csv(fs.readFileSync(path.join(repo, 'oldwebtech_plans/research/certifications/behavior-card-register.csv'), 'utf8').replace(/^\uFEFF/, '')).map(r => [r.card_id, r]));
const ids = new Set(), stems = new Set();
for (const q of bank.questions) {
  assert(text(q.id) && !ids.has(q.id), `Invalid ID: ${q.id}`); ids.add(q.id);
  assert(text(q.q) && !stems.has(q.q.trim()), `Invalid stem: ${q.id}`); stems.add(q.q.trim());
  assert(domains.has(q.domain) && text(q.objective), `Missing domain or objective: ${q.id}`);
  assert(['single', 'multi'].includes(q.type), `Invalid type: ${q.id}`);
  assert(Array.isArray(q.choices) && q.choices.length >= 2 && q.choices.length <= 6 && q.choices.every(text), `Invalid choices: ${q.id}`);
  assert.equal(new Set(q.choices).size, q.choices.length, `Duplicate choices: ${q.id}`);
  assert(Array.isArray(q.answer) && q.answer.length && q.answer.every(a => Number.isInteger(a) && a >= 0 && a < q.choices.length), `Invalid answer: ${q.id}`);
  assert.equal(new Set(q.answer).size, q.answer.length, `Duplicate answers: ${q.id}`);
  assert(q.type === 'single' ? q.answer.length === 1 : q.answer.length > 1, `Type mismatch: ${q.id}`);
  assert(text(q.explain) && Array.isArray(q.why) && q.why.length === q.choices.length && q.why.every(text), `Missing explanations: ${q.id}`);
  assert(Array.isArray(q.cardIds) && q.cardIds.length, `Missing lineage: ${q.id}`);
  for (const id of q.cardIds) {
    const c = cards.get(id); assert(c && c.status === 'verified' && c.certification_id === 'ai901', `Unverified lineage: ${q.id}/${id}`);
    assert.equal(q.examVersion, c.exam_version, `Version mismatch: ${q.id}/${id}`);
    assert(/^status: verified\s*$/m.test(fs.readFileSync(path.join(repo, c.card_path), 'utf8')), `Card file is not verified: ${id}`);
  }
  assert(Array.isArray(q.evidenceRefs) && q.evidenceRefs.length && q.evidenceRefs.every(e => text(e.url) && /^https:\/\//.test(e.url) && text(e.locator) && /^\d{4}-\d{2}-\d{2}$/.test(e.checkedOn)), `Missing evidence: ${q.id}`);
}
const html = fs.readFileSync(path.join(__dirname, 'preview.html'), 'utf8');
for (const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)) assert(fs.existsSync(path.resolve(__dirname, m[1])), `Missing asset: ${m[1]}`);
assert(html.includes('../../../../../certs/quiz.js'), 'Use the existing engine');
console.log(`PASS: ${bank.questions.length} questions; engine fields, answer indexes, explanations, unique IDs, located evidence, verified card lineage, preview assets.`);
console.log('This check does not establish factual accuracy or replace browser interaction review.');
// Report the closest legacy stem for each pilot item. Similarity is a review aid.
const legacy = [];
for (const file of fs.readdirSync(path.join(repo, 'certs/data')).filter(f => f.endsWith('.js'))) {
  const scope = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(repo, 'certs/data', file), 'utf8'), scope);
  if (scope.window.CERT_BANK) legacy.push(...scope.window.CERT_BANK.questions);
}
const tokens = s => new Set(s.toLowerCase().match(/[a-z0-9]+/g) || []);
const normalized = s => [...tokens(s)].sort().join(' ');
function similarity(a, b) { const common = [...a].filter(t => b.has(t)).length; return common / (a.size + b.size - common); }
for (const q of bank.questions) {
  let best = { score: -1, id: '' };
  for (const old of legacy) {
    assert.notEqual(q.id, old.id, `Legacy ID collision: ${q.id}`);
    assert.notEqual(normalized(q.q), normalized(old.q), `Legacy stem duplicate: ${q.id}/${old.id}`);
    const score = similarity(tokens(q.q), tokens(old.q));
    if (score > best.score) best = { score, id: old.id };
  }
  console.log(`Nearest legacy stem: ${q.id} -> ${best.id}; token Jaccard ${best.score.toFixed(3)}`);
}
console.log(`Compared pilot stems against ${legacy.length} legacy questions. Review similarity results manually; this is not proof of originality.`);
