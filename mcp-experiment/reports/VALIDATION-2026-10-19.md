# Safe validation guidance — October 19, 2026

The production revision is oldweb-mcp--r6e19c929b6ee. The [deployment workflow](https://github.com/palthainon/oldwebtech/actions/runs/39271060123) passed candidate checks for all thirteen tools before promotion. The previous revision remains the rollback target. Reported monthly spend was $1.65 before deployment. Limits and the pilot deadline are unchanged.

Invalid tool calls retain HTTP 400 and the stable invalid_tool_or_arguments message. JSON-RPC code is now -32602. The response includes a reason, up to eight fixed issue hints, an omitted count, endpoint tool names, and a static valid example. Field hints expose only known top-level schema names. Nested locations are reduced to their owning top-level field. Raw Zod messages, values, unknown keys, and unknown tool names are never included in repair data. The protocol request ID is still echoed as required. Existing telemetry records metadata only.

All local tests and 116 parser assertions passed. The first sandbox run failed because localhost access was denied; the permitted rerun passed. The complete SDK matrix passed 300 of 300 cases. Privacy tests covered malicious values, unknown field names, nested invalid values, and unknown tool names. Every static repair example passed its actual schema. Issue output was tested at 100 issues and limited to eight.

All three public endpoints returned the safe error. Each returned example then completed successfully. These six requests carried the internal marker. Azure verification counted 126 application and platform rows, including three internal validation errors, with zero matches for PRIVATE_VALIDATION_LIVE_20261019. The query covered events after October 19 at 14:40 UTC. Ingestion delays and finite sentinel coverage limit this check; it is not a proof against every possible private-data leak.

No model evaluation was rerun. Real external retry success remains for the weekly review. Errors raised after schema validation, such as DNS failures or invalid domain syntax, retain their existing safe error codes.
