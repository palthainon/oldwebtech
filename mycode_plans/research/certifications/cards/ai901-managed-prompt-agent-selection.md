---
card_id: ai901-managed-prompt-agent-selection
certification_id: ai901
exam_version: "2026-04-15"
objective_ids: ["Create and test a single-agent solution in the Foundry portal"]
status: verified
reviewed_on: 2026-10-12
---

# Behavior

- For a single agent that needs instructions, a model, and configured tools without custom orchestration, choose a prompt agent; Foundry manages its runtime.
- Choose a hosted agent when the solution needs custom code or orchestration logic, accepting responsibility for maintaining agent logic.

# Gotchas

- Starting with a hosted agent for a configuration-only workflow adds code and runtime responsibilities that a managed prompt agent does not require.

# Verify

- In Foundry, create and test a prompt agent with instructions, a model, and a tool. Compare its requirements with the hosted-agent path only if custom code is needed.

# Applies to

- AI-901: Implement generative AI apps and agents by using Foundry; create and test a single-agent solution in the Foundry portal. No questions linked yet.

# Evidence

```yaml
evidence:
  - claim: "AI-901 includes creating and testing a single-agent solution in the Foundry portal."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901"
    locator: "Skills measured as of April 15, 2026, Implement generative AI apps and agents by using Foundry"
    source_version: "Skills measured 2026-04-15; page updated 2026-07-13"
    checked_on: 2026-10-12
  - claim: "A prompt agent configured with instructions, a model, and tools runs under Foundry with no custom application code or infrastructure to maintain."
    source: "https://learn.microsoft.com/en-us/azure/foundry/agents/overview"
    locator: "Agent types / Prompt agents; page checked 2026-10-12"
    source_version: "Documentation checked 2026-10-12"
    checked_on: 2026-10-12
  - claim: "Hosted agents support custom code and orchestration, with runtime code to maintain."
    source: "https://learn.microsoft.com/en-us/azure/foundry/agents/overview"
    locator: "Agent types / Hosted agents and Compare agent types; page checked 2026-10-12"
    source_version: "Documentation checked 2026-10-12"
    checked_on: 2026-10-12
```
