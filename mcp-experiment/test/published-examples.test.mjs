import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { definitions } from '../dist/tools.js';
test('published MCP call examples satisfy the actual tool schemas', () => {
  const page = fs.readFileSync(new URL('../../mcp.html', import.meta.url), 'utf8');
  const seen = new Set(); let count = 0;
  for (const block of page.matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>/g)) {
    for (const line of block[1].split('\n')) {
      let value; try { value = JSON.parse(line); } catch { continue; }
      const call = value.method === 'tools/call' ? value.params : value;
      if (!call.name) continue;
      const definition = Object.values(definitions).flatMap(s => Object.entries(s)).find(([name]) => name === call.name)?.[1];
      assert.ok(definition, call.name);
      assert.ok(definition.schema.safeParse(call.arguments).success, call.name);
      seen.add(call.name); count++;
    }
  }
  assert.equal(count, 14);
  assert.equal(seen.size, 13);
});
