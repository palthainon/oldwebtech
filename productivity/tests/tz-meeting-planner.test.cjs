const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const html=fs.readFileSync(require('path').join(__dirname, '../tz-meeting-planner.html'),'utf8');
const source=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1];
const duration={value:'60',validity:{valid:true}};
const document={getElementById:id=>id==='meetingDuration'?duration:null,querySelector:()=>({addEventListener(){}}),addEventListener(){}};
const ctx=vm.createContext({document,Intl,Date,console,StorageUtils:{saveList(){}}});vm.runInContext(source,ctx);
const run=s=>vm.runInContext(s,ctx);
run("TZ_SET=new Set(['UTC','America/New_York','Asia/Kolkata']); extraRows=['UTC','UTC','America/New_York'];deduplicateRows('UTC')");assert.equal(run('JSON.stringify(extraRows)'),JSON.stringify(['America/New_York']));
assert.equal(run("meetingFit(Date.parse('2026-10-21T16:00:00Z'),'UTC').cls"),'biz-green');
assert.equal(run("meetingFit(Date.parse('2026-10-21T16:30:00Z'),'UTC').cls"),'biz-yellow');
assert.equal(run("meetingFit(Date.parse('2026-10-21T17:00:00Z'),'UTC').cls"),'biz-red');
run("workingHours.UTC={start:'22:00',end:'06:00'}");assert.equal(run("meetingFit(Date.parse('2026-10-21T23:30:00Z'),'UTC').cls"),'biz-green');
run("workingHours={UTC:{start:'09:00',end:'10:00'},'America/New_York':{start:'09:00',end:'10:00'}}");assert.equal(run("nextSharedStarts(Date.parse('2026-10-21T00:00:00Z'),['UTC','America/New_York'],60).length"),0);
run("workingHours={}");assert.equal(run("new Date(nextSharedStarts(Date.parse('2026-10-21T08:00:00Z'),['UTC'],60)[0]).toISOString()"),'2026-10-21T09:30:00.000Z');
run("workingHours['America/New_York']={start:'01:00',end:'02:00'}");duration.value='120';assert.equal(run("meetingFit(Date.parse('2026-11-01T05:00:00Z'),'America/New_York').cls"),'biz-green');
run("workingHours['America/New_York']={start:'01:00',end:'04:00'}");assert.equal(run("meetingFit(Date.parse('2027-03-14T06:00:00Z'),'America/New_York').cls"),'biz-green');
duration.value='60';assert.equal(run("meetingFit(Date.parse('2026-10-21T03:30:00Z'),'Asia/Kolkata').cls"),'biz-green');
console.log('PASS: duplicate removal, exact end boundary, partial interval, outside hours, overnight, no overlap, next start, both clock changes, half-hour zone.');
run("workingHours={UTC:{start:'09:10',end:'10:10'}}");assert.equal(run("nextSharedStarts(Date.parse('2026-10-21T08:00:00Z'),['UTC'],60).length"),0);
console.log('PASS: hourly options skip periods that cannot fit.');


run("workingHours={UTC:{start:'00:00',end:'00:00'}}");
assert.equal(run("JSON.stringify(nextSharedStarts(Date.parse('2026-10-21T09:12:00Z'),['UTC'],60).map(ms=>new Date(ms).toISOString()))"),JSON.stringify(['2026-10-21T09:30:00.000Z','2026-10-21T10:30:00.000Z','2026-10-21T11:30:00.000Z']));
assert.equal(run("new Date(nextHalfHour(Date.parse('2026-10-21T09:30:00Z'),'UTC')).toISOString()"),'2026-10-21T10:00:00.000Z');
assert.equal(run("new Date(nextHalfHour(Date.parse('2026-10-21T03:20:00Z'),'Asia/Kathmandu')).toISOString()"),'2026-10-21T03:45:00.000Z');
console.log('PASS: next half hour, hourly spacing, exact boundary, quarter-hour zone.');
