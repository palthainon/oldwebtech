# Expanded small-model repair tests — October 19, 2026

GPT-5.6-Luna with low reasoning passed all 21 cases: seven per server. Eighteen repairable calls succeeded on the first model attempt after the error. Three cases lacked required task information; the model asked for the missing domain, build log, or CIDR and made no tool call. No repairable case remained unfixed in this sample.

| Server | Repairs | Correct clarification | Failures |
|---|---:|---:|---:|
| Diagnostics | 6 | 1 | 0 |
| Logs | 6 | 1 | 0 |
| Network | 6 | 1 | 0 |

Coverage includes missing fields, wrong types, unsupported names, extra keys, case-sensitive enums, numeric limits, and nested invalid values. Independent scoring compared repaired arguments with expected arguments through the actual schemas. JSON log whitespace is ignored only when comparing equivalent JSON content. All intended task data was preserved. The three clarification answers were manually inspected.

The harness submitted each invalid request to an isolated local server and supplied the actual -32602 error to the model. The model then made native MCP repair calls. This includes unknown names that a client might otherwise block before transport. It tests repair from real error guidance, not the model's ability to generate an unknown native tool call. The model also received the task and tool schemas. There was no control without guidance, so no causal improvement is established.

All 21 seed errors and 18 model calls were marked internal. The local telemetry connection was empty. No public MCP endpoint or Azure secret was used. No event can enter Azure usage or retry charts from this run. DNS used synthetic fixtures; offline tools used real implementations. Caller identifiers were removed from stored telemetry.

Limits: one run per case and one model. Broad reliability, live production transport, semantic failures after schema validation, and unknown tool requests with ambiguous intent are not established. The three missing-information cases cannot be repaired safely without user input. No product changes were needed.

Reproduce from mcp-experiment with node scripts/evaluate-repair-expanded.mjs. Each run creates a separate evidence directory. The catalogue is test/repair-cases.json. Case files retain synthetic tool calls, results, summaries, model usage, and metadata-only local events.

Observed Codex token usage, summed across cases: {"input_tokens": 893173, "cached_input_tokens": 750080, "output_tokens": 6189, "reasoning_output_tokens": 2794}. Cached input is part of reported input, not an additional token total. These figures are not Azure model charges.
