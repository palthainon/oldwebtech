import { test } from 'node:test';
import assert from 'node:assert/strict';
import { definitions } from '../dist/tools.js';
import { validationHelp } from '../dist/validation.js';
test('every repair example satisfies its endpoint schema and issue output is bounded', () => {
  for (const [service, tools] of Object.entries(definitions)) for (const tool of Object.keys(tools)) {
    const help = validationHelp(service, tool, Array.from({length:100}, () => ({code:'unrecognized_keys',path:['PRIVATE_FIELD']})));
    assert.equal(help.issues.length,8); assert.equal(help.omittedIssues,92);
    assert.ok(!JSON.stringify(help).includes('PRIVATE_FIELD'));
    assert.ok(tools[tool].schema.safeParse(help.example.params.arguments).success, tool);
  }
});
