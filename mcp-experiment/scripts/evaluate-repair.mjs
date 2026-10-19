import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { serve } from './evaluate.mjs';
const model=process.env.EVAL_MODEL || 'gpt-5.6-luna';
const cases=[{service:'diagnostics',tool:'lookup_dns',args:{domain:'example.com',type:'a'}},{service:'logs',tool:'parse_logs',args:{text:'{"level":"INFO","message":"synthetic repair test"}',recordLimit:201}},{service:'network',tool:'inspect_subnet',args:{cidr:'192.0.2.0/24',extra:'synthetic'}}];
const reports=[];
for(const c of cases){
 const server=await serve([c]);
 const config=[`mcp_servers.oldweb.url=${JSON.stringify(`${server.base}/${c.service}/mcp`)}`,'mcp_servers.oldweb.http_headers={"x-oldweb-test"="evaluation-private"}','model_reasoning_effort="low"','approval_policy="never"'];
 const args=[path.join(process.env.APPDATA,'npm/node_modules/@openai/codex/bin/codex.js'),'exec','--ignore-user-config','--ephemeral','--skip-git-repo-check','-s','read-only','-m',model,'--json',...config.flatMap(c=>['-c',c]),'-'];
 const prompt=`Evaluate validation repair using ONLY the oldweb MCP tools. No shell, web, files or other tools. First attempt exactly one ${c.tool} call with these deliberately invalid arguments: ${JSON.stringify(c.args)}. Preserve them for the first attempt. Then use the actual error guidance to correct and retry, preserving the intended input rather than replacing it with the example. For logs use the largest allowed recordLimit. At most two repair attempts. Report whether the server rejected the first call and the correction succeeded. If the client prevents invalid input, report that limitation. DNS uses synthetic fixture results, not live Internet data.`;
 let stdout='',stderr='',timer;const began=Date.now();const child=spawn(process.execPath,args,{cwd:os.tmpdir(),stdio:['pipe','pipe','pipe'],windowsHide:true});child.stdout.on('data',c=>stdout+=c);child.stderr.on('data',c=>stderr+=c);child.stdin.end(prompt);
 const code=await new Promise(resolve=>{timer=setTimeout(()=>child.kill(),180000);child.on('exit',resolve)});clearTimeout(timer);await server.close();
 const events=stdout.split(/\r?\n/).flatMap(s=>{try{return[JSON.parse(s)]}catch{return[]}});const items=events.filter(e=>e.type==='item.completed').map(e=>e.item);const calls=items.filter(i=>i.type==='mcp_tool_call');const activity=server.events.filter(e=>e.method==='tools/call');
 const report={service:c.service,model,exitCode:code,elapsedMs:Date.now()-began,calls,summary:items.filter(i=>i.type==='agent_message').at(-1)?.text,usage:events.find(e=>e.type==='turn.completed')?.usage,errors:events.filter(e=>e.type==='error'||e.type==='turn.failed'),allInternal:server.events.every(e=>e.internal),activity:activity.map(({caller,...e})=>e),prohibitedActions:items.filter(i=>['command_execution','web_search','file_change'].includes(i.type)).map(i=>i.type)};
 report.passed=code===0&&report.allInternal&&activity[0]?.outcome==='validation_error'&&activity.slice(1).some(e=>e.outcome==='tool_success')&&report.prohibitedActions.length===0;
 reports.push(report);console.log(JSON.stringify(report));if(code!==0&&calls.length===0)break;
}
fs.writeFileSync(new URL(`../reports/model-repair-${new Date().toISOString().replace(/[:.]/g,'-')}.json`,import.meta.url),JSON.stringify({at:new Date().toISOString(),environment:'local isolated servers; Azure telemetry connection disabled; DNS fixtures',reports},null,2)+'\n');
