---
card_id: ai901-vision-local-image-buffer
certification_id: ai901
exam_version: "2026-04-15"
objective_ids: ["Build a lightweight application that includes vision capabilities"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- When a lightweight Azure Vision Image Analysis app needs to analyze an image stored locally or at a location the service cannot access publicly, pass the image bytes to the SDK instead of supplying an image URL. For an image hosted at a publicly accessible URL, the SDK also accepts that URL. Choose the requested visual features for the task; the SDK example uses the Analyze operation.

## Defaults or baseline

- The Image Analysis 4.0 Python quickstart initializes `ImageAnalysisClient` and analyzes a public image URL. Microsoft's separate Python how-to shows reading a local file in binary mode and passing those bytes to `analyze`.

## Gotchas

- A URL that is valid only inside an application's private network is not necessarily accessible to the Image Analysis service. The REST guide lists an inaccessible image URL as an invalid request; use the SDK's image-data input for local images.
- Image Analysis 4.0 is deprecated and Microsoft says it will be retired on September 25, 2028. Treat this as version-specific guidance and check Microsoft's migration guide before starting or maintaining a production integration. Caption and dense-caption support also depends on Azure region.

## Verify

- Follow the Python Image Analysis 4.0 quickstart and the Python section of **Call the Image Analysis 4.0 Analyze API**. Adapt the URL quickstart to analyze a local test image using bytes, then use a publicly accessible URL as a comparison. If requesting captions, verify the chosen Azure region supports the feature. No Azure service call was run for this card.

## Applies to

- AI-901 skills measured as of April 15, 2026: **Implement AI solutions with computer vision and image-generation capabilities by using Foundry** > **Build a lightweight application that includes vision capabilities**. No question IDs assigned.

## Evidence

```yaml
evidence:
  - claim: "AI-901 includes building a lightweight application that includes vision capabilities."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901"
    locator: "Skills measured as of April 15, 2026 > Implement AI solutions with computer vision and image-generation capabilities by using Foundry > Build a lightweight application that includes vision capabilities"
    source_version: "Skills effective 2026-04-15; Microsoft Learn page last updated 2026-07-13"
    checked_on: 2026-10-13
  - claim: "The Python Image Analysis 4.0 SDK quickstart initializes an ImageAnalysisClient using the Vision endpoint and credential, then analyzes a public image URL with selected visual features."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/quickstarts-sdk/image-analysis-client-library-40?pivots=programming-language-python"
    locator: "Python > Create environment variables; Analyze image (client initialization and `client.analyze_from_url(...)`)"
    source_version: "Microsoft Learn Image Analysis 4.0 quickstart; page last updated 2026-02-24"
    checked_on: 2026-10-13
  - claim: "The Image Analysis 4.0 SDK accepts a publicly accessible image URL or image bytes for analysis; the SDK can read a local file into its input buffer."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/how-to/call-analyze-image-40"
    locator: "Python > Select the image to analyze > Image URL and Image buffer; Call the analyze_from_url method with options, paragraph specifying `analyze(image_data=image_data, ...)` for a buffer"
    source_version: "Microsoft Learn page last updated 2025-06-30; Image Analysis 4.0 guide"
    checked_on: 2026-10-13
  - claim: "The REST guide reports an inaccessible image URL as an invalid request; its caption feature is unsupported in some regions."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/how-to/call-analyze-image-40"
    locator: "Error codes > common 400 Bad Request causes: image URL not accessible; Caption not supported in region"
    source_version: "Microsoft Learn page last updated 2025-06-30; Image Analysis 4.0 guide"
    checked_on: 2026-10-13
  - claim: "Microsoft currently marks Image Analysis 4.0 deprecated, states it will be retired on September 25, 2028, and recommends switching to an alternative in the migration guide."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview-image-analysis"
    locator: "Caution at article opening; Image Analysis versions; page last updated 2025-09-26"
    source_version: "Microsoft Learn live documentation checked 2026-10-13; 4.0 retirement date 2028-09-25"
    checked_on: 2026-10-13
```
