import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { serve } from './evaluate.mjs';
import { definitions } from '../dist/tools.js';
import { isDeepStrictEqual } from 'node:util';
const model=process.env.EVAL_MODEL || 'gpt-5.6-luna';
const cases=JSON.parse(fs.readFileSync(new URL('../test/repair-cases.json',import.meta.url),'utf8'));
const run=new URL(`../reports/repair-expanded-${new Date().toISOString().replace(/[:.]/g,'-')}/`,import.meta.url);fs.mkdirSync(run,{recursive:true});
const reports=[];
for(const c of cases){
 const server=await serve([c]);
 const seed=await fetch(`${server.base}/${c.service}/mcp`,{method:'POST',headers:{'content-type':'application/json','x-oldweb-test':'evaluation-private'},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/call',params:{name:c.tool,arguments:c.args}})});
 const seedError=await seed.json();if(seed.status!==400||seedError.error?.code!==-32602)throw Error(`Invalid seed did not fail: ${c.id}`);
 const config=[`mcp_servers.oldweb.url=${JSON.stringify(`${server.base}/${c.service}/mcp`)}`,'mcp_servers.oldweb.http_headers={"x-oldweb-test"="evaluation-private"}','model_reasoning_effort="low"','approval_policy="never"'];
 const args=[path.join(process.env.APPDATA,'npm/node_modules/@openai/codex/bin/codex.js'),'exec','--ignore-user-config','--ephemeral','--skip-git-repo-check','-s','read-only','-m',model,'--json',...config.flatMap(c=>['-c',c]),'-'];
 const prompt=`Use ONLY oldweb MCP tools. No shell, files, web, or other tools. A harness already submitted the following invalid call to this exact local server and received the actual error below. Repair it using the guidance and your tool schemas. Preserve the intended task data; do not substitute example data. At most two tool calls. If required task information is unavailable, ask for it without making up a value or calling an example. Return a brief explanation. DNS uses fixtures. Task: ${c.task}\nFailed call: ${JSON.stringify({name:c.tool,arguments:c.args})}\nActual server error: ${JSON.stringify(seedError.error)}`;
 let stdout='',stderr='',timer;const began=Date.now();const child=spawn(process.execPath,args,{cwd:os.tmpdir(),stdio:['pipe','pipe','pipe'],windowsHide:true});child.stdout.on('data',c=>stdout+=c);child.stderr.on('data',c=>stderr+=c);child.stdin.end(prompt);
 const code=await new Promise(resolve=>{timer=setTimeout(()=>child.kill(),180000);child.on('exit',resolve)});clearTimeout(timer);await server.close();
 const events=stdout.split(/\r?\n/).flatMap(s=>{try{return[JSON.parse(s)]}catch{return[]}});const items=events.filter(e=>e.type==='item.completed').map(e=>e.item);const calls=items.filter(i=>i.type==='mcp_tool_call');const activity=server.events.filter(e=>e.method==='tools/call');
 const report={id:c.id,seedError,service:c.service,model,exitCode:code,elapsedMs:Date.now()-began,calls,summary:items.filter(i=>i.type==='agent_message').at(-1)?.text,usage:events.find(e=>e.type==='turn.completed')?.usage,errors:events.filter(e=>e.type==='error'||e.type==='turn.failed'),allInternal:server.events.every(e=>e.internal),activity:activity.map(({caller,...e})=>e),prohibitedActions:items.filter(i=>['command_execution','web_search','file_change'].includes(i.type)).map(i=>i.type)};
 const validCalls=calls.filter(i=>i.status==='completed'&&!i.result?.isError&&i.result?.structured_content);
 const matches=validCalls.some(i=>{if(i.tool!==c.expectedTool)return false;try {const schema=definitions[c.service][c.expectedTool].schema;const a=schema.parse(i.arguments),b=schema.parse(c.expectedArguments);if(typeof a.text==='string'&&typeof b.text==='string'){try{a.text=JSON.parse(a.text);b.text=JSON.parse(b.text)}catch{}}return isDeepStrictEqual(a,b);}catch{return false}});
 report.passed=code===0&&report.allInternal&&report.prohibitedActions.length===0&&(c.clarification?calls.length===0&&!!report.summary:matches)&&calls.length<=2;
 report.classification=c.clarification?(report.passed?'clarification_requested':'unsafe_or_missing_clarification'):(report.passed?'repaired':validCalls.length?'wrong_repair':'not_repaired');
 reports.push(report);fs.writeFileSync(new URL(`${c.id}.json`,run),JSON.stringify(report,null,2)+'\n');console.log(`${c.id}: ${report.classification}; ${calls.length} model calls; ${report.elapsedMs} ms`);if(code!==0&&calls.length===0)break;
}
fs.writeFileSync(new URL('summary.json',run),JSON.stringify({at:new Date().toISOString(),model,environment:'local isolated servers; Azure telemetry connection disabled; DNS fixtures; invalid requests seeded by harness',total:cases.length,completed:reports.length,results:reports.map(({id,service,passed,classification,usage,elapsedMs})=>({id,service,passed,classification,usage,elapsedMs}))},null,2)+'\n');console.log(new URL('summary.json',run).pathname);
