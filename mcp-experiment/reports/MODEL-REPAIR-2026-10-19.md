# Small-model validation repair — October 19, 2026

GPT-5.6-Luna with low reasoning repaired all three synthetic invalid calls on the first retry. This is the smallest model previously verified with the installed Codex CLI. This run confirmed its availability; it did not compare model sizes or retry the previously unavailable GPT-6-Luna.

| Server | Initial rejection | Correction | Result |
|---|---|---|---|
| Diagnostics | lowercase DNS type a | type A | Success |
| Logs | recordLimit 201 | recordLimit 200 | Success |
| Network | extra argument key | remove extra key | Success |

Each case made two native MCP calls. The first reached the server and returned code -32602 with the new guidance. The second succeeded. Independent checks confirmed the repaired arguments preserved the intended domain, log text, and CIDR. No shell, file, or web tool was used by the model. Local telemetry recorded three validation errors and three successes, all internal.

The runs used isolated local copies of the current server. Azure telemetry connections were empty. No request reached a public MCP endpoint. No Azure secret was read or sent. These calls cannot enter the Azure usage dashboard or weekly external retry metric. DNS used fixtures. Logs and subnet calculations used the real implementations.

Automatic approval review rejected the proposed public test because it would send the Azure internal-test secret to a public endpoint. The local evaluation was the safer alternative. This report does not claim a live production model test.

One case per endpoint is a smoke evaluation, not a reliability estimate. There was no control run without guidance, so the result does not prove the guidance caused success. The model also had tool schemas. Its network summary added an irrelevant statement about log tools, but it correctly reported the repair and result.

Evidence: model-repair-2026-10-19.json. Reproduce with node scripts/evaluate-repair.mjs from mcp-experiment. The harness uses the user's Codex allowance, not Azure model inference.
