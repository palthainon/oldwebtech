import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createRequire} from 'node:module';
import {isIP as nodeIP} from 'node:net';
import ts from '../../../mcp-experiment/node_modules/typescript/lib/typescript.js';
import {scan} from '../../../nettools/config-redactor/scanner.js';
import {replace, manualSpans} from '../../../nettools/config-redactor/replacements.js';
import {isIP} from '../../../nettools/config-redactor/runtime.js';
const nativeRequire = createRequire(import.meta.url), modules = new Map();
function original(name) {
  if (modules.has(name)) return modules.get(name);
  const text = fs.readFileSync(new URL('../vendor/'+name+'.ts', import.meta.url),'utf8');
  const js = ts.transpileModule(text,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS}}).outputText;
  const module = {exports:{}};
  new Function('require','module','exports','Buffer',js)(id => id.startsWith('./') ? original(id.slice(2)) : nativeRequire(id),module,module.exports,Buffer);
  modules.set(name,module.exports); return module.exports;
}
const reference = original('replacements'), referenceScan = original('scanner').scan;
const checker = {exports:{}};
new Function('require','exports',fs.readFileSync(new URL('large-checks.cjs',import.meta.url),'utf8'))
  (id => id === '../dist/addresses' ? original('addresses') : nativeRequire(id),checker.exports);
const fixture = name => fs.readFileSync(new URL('fixtures/'+name,import.meta.url),'utf8');
const large = fixture('large-cisco.ios'), expected = JSON.parse(fixture('large-cisco.expected.json'));
for (const mode of ['labels','addresses']) {
  test('large synthetic fixture parity and independent checks: '+mode, async () => {
    const options={addressMode:mode,key:new Uint8Array(32).fill(19)};
    const actual=await replace(large,scan(large),[],options);
    assert.deepEqual(actual,reference.replace(large,referenceScan(large),[],options));
    assert.ok(checker.exports.verifyLarge(large,actual,expected,mode).lines>1000);
  });
}
test('address mapping parity across ten keys', async () => {
  for (let seed=1;seed<=10;seed++) {
    const options={addressMode:'addresses',key:new Uint8Array(32).fill(seed)};
    const actual=await replace(large,scan(large),[],options);
    assert.deepEqual(actual,reference.replace(large,referenceScan(large),[],options));
    checker.exports.verifyLarge(large,actual,expected,'addresses');
  }
});
for (const name of ['cisco-labs.ios','encoded.json']) test('fixture scanner parity: '+name, async () => {
  const text=fixture(name);
  assert.deepEqual(scan(text),referenceScan(text));
  assert.deepEqual(await replace(text,scan(text)),reference.replace(text,referenceScan(text)));
});
test('strict browser address parser agrees with Node', () => {
  const values=['','1.2.3.4','01.2.3.4','256.1.1.1','1.2.3','::','::1','2001:db8::1','::ffff:192.0.2.1','::ffff:192.0.02.1','1:2:3:4:5:6:7:8','1:2:3:4:5:6:7','1:2:3:4:5:6:7:8::',':::1','1::2::3','fe80::1%eth0','fe80::1%','fe80::1%bad space','2001:gg::1',':1:2:3:4:5:6:7','1:2:3:4:5:6:7:'];
  for(let i=0;i<1000;i++) values.push(i%2 ? '2001:db8:'+i.toString(16)+'::1' : '192.0.2.'+i);
  for(const value of values) assert.equal(isIP(value),nodeIP(value),value);
});
test('unknown blocks stay flagged until fully masked', async () => {
  const text='crypto private-key unsupported DEMO-SECRET';
  const detected=scan(text); assert.ok(detected.flags.length);
  assert.ok((await replace(text,detected,manualSpans(text,[{start:0,end:6}]))).flags.length);
  const masked=await replace(text,detected,manualSpans(text,[{start:0,end:text.length}]));
  assert.equal(masked.flags.length,0); assert.ok(!masked.output.includes('DEMO-SECRET'));
});
test('manual masks replace identical occurrences without exposing overlapping secrets', async () => {
  const text='enable secret 9 DEMO-PASSWORD\n! DEMO-PASSWORD';
  const start=text.indexOf('PASSWORD');
  const result=await replace(text,scan(text),manualSpans(text,[{start,end:start+8}]));
  assert.ok(!result.output.includes('DEMO')); assert.ok(!result.output.includes('PASSWORD'));
});
test('UTF-8 byte size is enforced', () => {
  assert.throws(()=>scan('é'.repeat(2621441)),/5 MiB/);
});
test('no analytics, remote assets, or configuration storage code', () => {
  const html=fs.readFileSync(new URL('../../../nettools/config-redactor.html',import.meta.url),'utf8');
  assert.match(html,/connect-src 'none'/); assert.ok(!html.includes('app-insights'));
  for(const file of ['page.js','worker.js','runtime.js']) {
    const source=fs.readFileSync(new URL('../../../nettools/config-redactor/'+file,import.meta.url),'utf8');
    assert.doesNotMatch(source,/\b(fetch|XMLHttpRequest|WebSocket|sendBeacon|localStorage|sessionStorage|indexedDB)\b/);
  }
});

const vendorCases=JSON.parse(fixture('vendor-cases.json'));
for(const item of vendorCases)for(const mode of ['labels','addresses'])test('vendor browser parity: '+item.profile+' '+mode,async()=>{
 const options={addressMode:mode,key:new Uint8Array(32).fill(19)};
 const result=await replace(item.source,scan(item.source,item.profile),[],options);
 assert.deepEqual(result,reference.replace(item.source,referenceScan(item.source,item.profile),[],options));
 assert.equal(result.flags.length,0);
 for(const seed of item.remove)assert.ok(!result.output.includes(seed));
 for(const value of item.keep)assert.ok(result.output.includes(value));
});
test('wrong format and XML external entities block browser export',()=>{
 assert.ok(scan('set mgt-config users someone phash PRIVATE','cisco-ios').flags.length);
 assert.ok(scan('<!DOCTYPE config [<!ENTITY x SYSTEM "https://invalid.example">]><config>&x;</config>','panos-xml').flags.length);
});

test('vendored source matches its synchronization manifest',()=>{
 const manifest=JSON.parse(fs.readFileSync(new URL('../vendor/source.json',import.meta.url),'utf8'));
 for(const [name,expectedHash] of Object.entries(manifest.hashes)) {
  const content=fs.readFileSync(new URL('../vendor/'+name,import.meta.url),'utf8').replaceAll('\r\n','\n');
  assert.equal(nativeRequire('node:crypto').createHash('sha256').update(content).digest('hex'),expectedHash,name);
 }
});
test('XML credentials cannot use the default-route exemption',async()=>{
 const source='<config password="0.0.0.0/0"><phash>0.0.0.0/0</phash></config>';
 const result=await replace(source,scan(source,'panos-xml'),[],{addressMode:'addresses',key:new Uint8Array(32).fill(19)});
 assert.equal(result.flags.length,0);assert.ok(!result.output.includes('0.0.0.0'));
 assert.ok(scan('<?xml secret="PRIVATE"?><config/>','panos-xml').flags.length);
});
