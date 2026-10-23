import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const source=path.resolve(process.argv[2] || '');
if(!process.argv[2])throw new Error('Pass the lawson-config-redactor source directory.');
const manifest=JSON.parse(fs.readFileSync(path.join(source,'package.json'),'utf8'));
if(manifest.name!=='lawson-config-redactor')throw new Error('Choose the redactor repository.');
const base=new URL('./',import.meta.url),hashes={};
for(const name of ['types','scanner','cisco','profiles','vendors','addresses','replacements']) {
 const content=fs.readFileSync(path.join(source,'src',name+'.ts'));
 fs.writeFileSync(new URL('vendor/'+name+'.ts',base),content);
 hashes[name+'.ts']=createHash('sha256').update(content.toString('utf8').replaceAll('\r\n','\n')).digest('hex');
}
for(const name of ['vendor-cases.json','VENDOR-SOURCES.md'])fs.copyFileSync(path.join(source,'test','fixtures',name),new URL('test/fixtures/'+name,base));
fs.writeFileSync(new URL('vendor/source.json',base),JSON.stringify({repository:'https://github.com/palthainon/lawson-config-redactor',version:manifest.version,hashes},null,2)+'\n');
console.log('Synced redactor '+manifest.version+'. Run build.mjs and both test suites.');
