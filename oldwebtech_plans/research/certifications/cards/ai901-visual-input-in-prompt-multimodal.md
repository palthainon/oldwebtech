---
card_id: ai901-visual-input-in-prompt-multimodal
certification_id: ai901
exam_version: "2026-04-15"
objective_ids: ["Interpret visual input in prompts by using a deployed multimodal model"]
status: verified
reviewed_on: 2026-10-12
---

## Behavior

- In the Foundry portal, select a deployed vision-capable model, attach an image in the chat playground, and ask a question about it in the prompt. The model returns a text response based on the image and prompt.
- When constructing a Chat Completions request, put the instruction and image together in the user's message content as text and image parts, and target the deployed model.

## Defaults or baseline

- For API image inputs, the `detail` setting defaults to `auto`; the model chooses low or high image processing based on the image input.

## Gotchas

- Low image detail can reduce accuracy for object and text recognition. For a prompt that depends on small visual details, use high detail and check the response against the image rather than assuming the model saw every detail.

## Verify

- Follow **Start a chat session to analyze images** in the Microsoft Foundry vision guide: select an image-capable deployment, upload a sample image, ask a question, and inspect the response. For API behavior, inspect the sample Chat Completions request and compare `auto` with `high` detail on an image containing small text. No live Foundry session was run for this draft.

## Applies to

- AI-901 skills measured as of April 15, 2026: **Implement AI solutions with computer vision and image-generation capabilities by using Foundry** > **Interpret visual input in prompts by using a deployed multimodal model**. No question IDs assigned.

## Evidence

```yaml
evidence:
  - claim: AI-901 includes interpreting visual input in prompts using a deployed multimodal model.
    source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901
    locator: Skills measured as of April 15, 2026 > Implement AI solutions with computer vision and image-generation capabilities by using Foundry
    source_version: Microsoft study guide, updated 2026-07-13
    checked_on: 2026-10-12
  - claim: In the Foundry portal, a user selects an image-capable deployment, attaches an image in the chat playground, asks about it, and receives an image description or relevant response.
    source: https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/gpt-with-vision
    locator: Quickstart > Go to Foundry; Start a chat session to analyze images, steps 1-9
    source_version: Microsoft Foundry documentation, updated 2026-07-29
    checked_on: 2026-10-12
  - claim: A vision-enabled Chat Completions request can include both text and an image in the user message, and it targets a deployed model by deployment name.
    source: https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/gpt-with-vision
    locator: API details > REST and Python request examples
    source_version: Microsoft Foundry documentation, updated 2026-07-29
    checked_on: 2026-10-12
  - claim: For API image inputs, auto is the default detail setting and selects low or high processing based on image size; low resolution can affect object and text recognition accuracy.
    source: https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/gpt-with-vision
    locator: Configure image detail level; Input limitations > Image support
    source_version: Microsoft Foundry documentation, updated 2026-07-29
    checked_on: 2026-10-12
```
