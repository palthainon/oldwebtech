---
card_id: ai901-responsible-ai-design
certification_id: ai901
exam_version: "2026-04-15"
objective_ids: ["Describe principles of responsible AI"]
status: verified
reviewed_on: 2026-10-12
---

# Behavior

- Assess fairness, reliability and safety, privacy and security, inclusiveness, transparency, and accountability while designing an AI solution.
- For an agent, choose its data boundaries, permitted actions, and human approval points early enough to shape the architecture.

# Gotchas

- A final content check alone does not decide who may access data or approve an agent's actions. Leaving those decisions until release can require architectural rework.

# Verify

- Map the six principles to the AI-901 responsible-AI objective, then review the agent design choices against Microsoft's current responsible-AI guidance.

# Applies to

- AI-901: Identify AI concepts and capabilities / Describe principles of responsible AI. No questions linked yet.

# Evidence

```yaml
evidence:
  - claim: "AI-901 assesses six responsible-AI principles."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901"
    locator: "Skills measured as of April 15, 2026 / Describe principles of responsible AI"
    source_version: "2026-04-15"
    checked_on: 2026-10-12
  - claim: "Agent data sources, permissions, and human approval belong in design decisions made early."
    source: "https://learn.microsoft.com/en-us/agents/center-of-excellence/responsible-ai"
    locator: "Design responsible AI from the start"
    source_version: "checked 2026-10-12"
    checked_on: 2026-10-12
```
