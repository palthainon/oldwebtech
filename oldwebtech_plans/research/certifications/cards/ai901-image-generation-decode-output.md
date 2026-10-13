---
card_id: ai901-image-generation-decode-output
certification_id: ai901
exam_version: "2026-04-15"
objective_ids: ["Create new visual outputs by using generative models"]
status: verified
reviewed_on: 2026-10-12
---

## Behavior

- When an application calls a deployed MAI image model to create an image from a text prompt, it uses the image generations API. The response contains the generated PNG as base64 data in `data[].b64_json`; decode that value to create a PNG file.

## Defaults or baseline

- The image generations API returns PNG output encoded in the JSON response. The request's `model` value is the name assigned to the deployment.

## Gotchas

- The successful response is not a PNG URL or ready-to-display image file. Treating `b64_json` as the finished file leaves the application with encoded text; decode it before saving or displaying the image.

## Verify

- In the Foundry portal, deploy an MAI image model in a supported region. Send a text-only prompt to the image generations endpoint, inspect `data[].b64_json`, decode it, and confirm the resulting file is a PNG that opens as an image. The documented API flow was checked; no live Foundry call was run.

## Applies to

- AI-901 skills measured as of April 15, 2026: **Implement AI solutions with computer vision and image-generation capabilities by using Foundry** > **Create new visual outputs by using generative models**. No question IDs assigned.

## Evidence

```yaml
evidence:
  - claim: "AI-901 assesses creating new visual outputs by using generative models through Foundry."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901"
    locator: "Skills measured as of April 15, 2026 > Implement AI solutions with computer vision and image-generation capabilities by using Foundry > Create new visual outputs by using generative models"
    source_version: "Skills measured 2026-04-15; study guide last updated 2026-07-13"
    checked_on: 2026-10-12
  - claim: "For text-to-image generation with a deployed MAI image model, use the image generations API; its endpoint accepts a text prompt and returns a PNG image."
    source: "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/use-foundry-models-mai-image"
    locator: "Run text-to-image generation; API endpoints"
    source_version: "Microsoft Foundry documentation last updated 2026-09-21; MAI Image model versions listed include 2026-07-31 (preview)"
    checked_on: 2026-10-12
  - claim: "The request's model parameter is the deployment name, and the response is JSON containing base64-encoded PNG data in data[].b64_json, which must be decoded to create an image file."
    source: "https://learn.microsoft.com/en-us/azure/foundry/foundry-models/how-to/use-foundry-models-mai-image"
    locator: "Run text-to-image generation > Python example; API endpoints > Request parameters > model; Response format > data[].b64_json"
    source_version: "Microsoft Foundry documentation last updated 2026-09-21; MAI Image model versions listed include 2026-07-31 (preview)"
    checked_on: 2026-10-12
```
