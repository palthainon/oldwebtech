---
card_id: ai901-content-understanding-video-frame-sampling
certification_id: ai901
exam_version: "2026-04-15"
objective_ids: ["Extract information from audio and video by using Content Understanding"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- In the documented `2026-06-01-preview` video analyzer, Content Understanding samples about one frame per second. It can combine visual analysis with speech transcription, but a brief visual event between sampled frames can be missed.
- If a decision depends on whether a short-lived visual event occurred, do not treat a negative analyzer result as exhaustive frame-by-frame inspection; review the relevant original footage or use a separately validated capture path.

## Defaults or baseline

- Microsoft's video overview identifies the `2026-06-01-preview` API and describes transcript and key-frame outputs. The sampling and resolution limits on that page apply to this preview documentation; recheck them as the service changes.

## Gotchas

- A transcript may include words spoken during a moment even when the corresponding brief visual action is absent from the analyzer's sampled frames. Speech coverage does not prove that every visual event was inspected.
- Sampled frames are resized to 512 × 512 pixels, so small text or distant objects can also be lost.

## Verify

- In Content Understanding Studio, analyze a short video containing a visual change that lasts less than a second. Compare the returned transcript and visual descriptions with the original frames, then inspect the sampling and resolution limitations in Microsoft's video documentation.

## Applies to

- AI-901 skills measured as of April 15, 2026: **Implement AI solutions for information extraction by using Foundry** > **Extract information from audio and video by using Content Understanding**. No question IDs assigned.

## Evidence

```yaml
evidence:
  - claim: "AI-901 includes extracting information from audio and video by using Content Understanding."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901"
    locator: "Skills measured as of April 15, 2026 > Implement AI solutions for information extraction by using Foundry > Extract information from audio and video by using Content Understanding"
    source_version: "Skills measured 2026-04-15; study guide last updated 2026-07-13"
    checked_on: 2026-10-13
  - claim: "The documented 2026-06-01-preview video analyzer transcribes spoken words and extracts visual information; it samples about one frame per second, so rapid motions or single-frame events can be missed."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/video/overview"
    locator: "Content extraction capabilities > Transcription and Key frame extraction; Technical constraints and limitations > Frame sampling (~ 1 FPS)"
    source_version: "Microsoft Foundry Tools documentation; page last updated 2026-08-10; API 2026-06-01-preview identified on page"
    checked_on: 2026-10-13
  - claim: "When missed short events matter to a decision, reviewing original footage or a separately validated capture path is a cautious application of Microsoft's stated sampling limitation, not a Microsoft product guarantee."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/video/overview"
    locator: "Technical constraints and limitations > Frame sampling (~ 1 FPS)"
    source_version: "Microsoft Foundry Tools documentation; page last updated 2026-08-10; reviewer inference"
    checked_on: 2026-10-13
  - claim: "Sampled video frames are resized to 512 × 512 pixels, which can cause small text or distant objects to be lost."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/video/overview"
    locator: "Technical constraints and limitations > Frame resolution (512 × 512 px)"
    source_version: "Microsoft Foundry Tools documentation; page last updated 2026-08-10; API 2026-06-01-preview identified on page"
    checked_on: 2026-10-13
```
