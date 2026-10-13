---
card_id: ai901-tune-one-sampling-parameter
certification_id: ai901
exam_version: "2026-04-15"
objective_ids: ["Identify appropriate model deployment options and configuration parameters"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- When adjusting response variation for a supported GPT deployment, use temperature to make output more or less random, or use `top_p` as an alternative sampling control. Change one at a time and compare outputs against the task.

## Defaults or baseline

- Microsoft's GPT prompt guidance describes higher temperature as tending toward more random, divergent output and lower temperature as tending toward more focused output. These are tendencies, not a guarantee for every response.

## Gotchas

- Adjusting both temperature and `top_p` together obscures which change affected the response. Reasoning models often do not support these parameters, and Microsoft advises checking the chosen model's details before adding them. The GPT prompt guidance also says its techniques are not recommended for reasoning models such as GPT-5 and o-series.

## Verify

- For the target deployed model, inspect its supported inference parameters, then compare several outputs while changing only temperature or only `top_p`. Confirm the deployed model actually supports the selected parameter before relying on it.

## Applies to

- AI-901 skills measured as of April 15, 2026: **Identify AI concepts and capabilities** > **Identify AI model components and configurations** > **Identify appropriate model deployment options and configuration parameters**. No question IDs assigned.

## Evidence

```yaml
evidence:
  - claim: "AI-901 includes identifying appropriate model deployment options and configuration parameters."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901"
    locator: "Skills measured as of April 15, 2026 > Identify AI concepts and capabilities > Identify AI model components and configurations"
    source_version: "Skills measured 2026-04-15; page updated 2026-07-13"
    checked_on: 2026-10-13
  - claim: "For GPT prompt guidance, higher temperature tends toward more random and divergent output while lower temperature tends toward more focused output; the page describes tendencies rather than a per-response guarantee."
    source: "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering"
    locator: "Temperature and Top_p parameters"
    source_version: "Microsoft Foundry documentation; page updated 2026-05-13"
    checked_on: 2026-10-13
  - claim: "The guidance describes top_p as another randomness control and recommends changing one of temperature or top_p at a time."
    source: "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering"
    locator: "Temperature and Top_p parameters"
    source_version: "Microsoft Foundry documentation; page updated 2026-05-13"
    checked_on: 2026-10-13
  - claim: "The prompt-engineering techniques are not recommended for reasoning models such as GPT-5 and o-series; the page cautions that models can behave differently."
    source: "https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering"
    locator: "Opening note; Temperature and Top_p parameters"
    source_version: "Microsoft Foundry documentation; page updated 2026-05-13"
    checked_on: 2026-10-13
  - claim: "Reasoning models often do not support temperature and top_p; Microsoft directs readers to check the model details in the Foundry catalog before adding optional parameters."
    source: "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/use-chat-reasoning"
    locator: "Choose parameters for reasoning models, first paragraph"
    source_version: "Microsoft Foundry Models documentation, updated 2026-08-26"
    checked_on: 2026-10-13
```
