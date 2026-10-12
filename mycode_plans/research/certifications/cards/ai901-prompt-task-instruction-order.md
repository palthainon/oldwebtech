---
card_id: ai901-prompt-task-instruction-order
certification_id: ai901
exam_version: "2026-04-15"
objective_ids: ["Create effective system and user prompts for generative AI models"]
status: verified
reviewed_on: 2026-10-12
---

# Behavior

- Put the task instruction near the start of a prompt, before supporting context or examples, as a first design choice; Microsoft reports this can improve output quality.

# Defaults or baseline

- Treat this as a prompt pattern to evaluate on the model and task you deploy, not as a guaranteed improvement.

# Gotchas

- Instruction order does not affect every tested response: Microsoft's example reports the same result for GPT-4 when a statement was moved from the beginning to the end. A result on one model or task does not establish the effect for another.

# Verify

- On the target model, compare otherwise identical prompts with the task instruction before and after the supporting context or examples. Evaluate representative inputs and keep the ordering that performs better for the task.

# Applies to

- AI-901: Implement AI solutions by using Microsoft Foundry / Implement generative AI apps and agents by using Foundry; create effective system and user prompts for generative AI models. No questions linked yet.

# Evidence

```yaml
evidence:
  - claim: "AI-901 includes creating effective system and user prompts for generative AI models."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901"
    locator: "Skills measured as of April 15, 2026 > Implement AI solutions by using Microsoft Foundry > Implement generative AI apps and agents by using Foundry"
    source_version: "Skills measured 2026-04-15; page updated 2026-07-13"
    checked_on: 2026-10-12
  - claim: "Putting the task instruction at the beginning, before context or examples, can improve output quality."
    source: "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering?tabs=chat"
    locator: "Start with clear instructions"
    source_version: "Microsoft Foundry documentation checked 2026-10-12"
    checked_on: 2026-10-12
  - claim: "Microsoft reports that moving a statement from the beginning to the end did not change the answer in its GPT-4 example, and notes that results can vary with newer models."
    source: "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering?tabs=chat"
    locator: "Scenario-specific guidance; Start with clear instructions"
    source_version: "Microsoft Foundry documentation checked 2026-10-12; examples tested against base GPT-4 in English"
    checked_on: 2026-10-12
```
