import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(import.meta.dirname, '../../..');
const bankDir = path.join(root, 'certs', 'data');
const target = path.join(import.meta.dirname, 'question-register.csv');
if (fs.existsSync(target)) throw new Error(`Refusing to overwrite ${target}`);

const fields = ['question_id', 'certification_id', 'exam_version', 'domain_id', 'objective_id', 'card_ids', 'status', 'question_path', 'evidence_refs', 'reviewed_on', 'notes'];
const csv = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
const rows = [fields.join(',')];
const ids = new Set();
for (const file of fs.readdirSync(bankDir).filter(name => name.endsWith('.js')).sort()) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(bankDir, file), 'utf8'), context, { timeout: 1000, filename: file });
  const bank = context.window.CERT_BANK;
  if (!bank || !Array.isArray(bank.questions)) throw new Error(`Invalid bank: ${file}`);
  for (const q of bank.questions) {
    if (!q.id || ids.has(q.id)) throw new Error(`Missing or duplicate question ID: ${q.id}`);
    ids.add(q.id);
    const values = [q.id, bank.id, bank.code, q.domain, q.objective, '', 'published_legacy', `certs/data/${file}`, '', '2026-10-05', 'Existing ticket records editorial review on 2026-10-05; card and per-item evidence mapping pending'];
    rows.push(values.map(csv).join(','));
  }
}
if (ids.size !== 800) throw new Error(`Expected 800 existing questions, found ${ids.size}`);
fs.writeFileSync(target, `${rows.join('\n')}\n`);
console.log(`Seeded ${ids.size} existing questions in ${target}`);
