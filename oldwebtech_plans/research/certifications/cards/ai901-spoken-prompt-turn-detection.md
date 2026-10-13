---
card_id: ai901-spoken-prompt-turn-detection
certification_id: ai901
exam_version: "2026-04-15"
objective_ids: ["Implement AI solutions for text and speech by using Foundry / Respond to spoken prompts by using a deployed multimodal model"]
status: verified
reviewed_on: 2026-10-12
---

## Behavior

- In a speech-to-speech app using a deployed GPT Realtime model, choose who ends the spoken turn. With server voice activity detection (VAD), the service detects the end of speech and starts a response. For a push-to-talk flow with `turn_detection` set to `none`, the client commits the buffered audio with `input_audio_buffer.commit` and then requests output with `response.create`.

## Defaults or baseline

- In the documented Realtime session, `server_vad` is enabled by default and automatically generates a response at the detected end of speech.

## Gotchas

- Disabling VAD for manual turn control does not make silence trigger a response. A client that omits the commit or response event will not advance the spoken turn as expected.

## Verify

- In the Microsoft Realtime API documentation, compare **Manual turn handling (push-to-talk)** with **Server decision mode**. In a safe test session, check for `input_audio_buffer.committed` and `response.created` after the chosen turn boundary. No live Azure session was run for this source review.

## Applies to

- AI-901 skills measured as of April 15, 2026: **Implement AI solutions for text and speech by using Foundry** > **Respond to spoken prompts by using a deployed multimodal model**. No question IDs assigned.

## Evidence

```yaml
evidence:
  - claim: The AI-901 objective includes responding to spoken prompts with a deployed multimodal model.
    source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901
    locator: Skills measured as of April 15, 2026 > Implement AI solutions for text and speech by using Foundry, spoken-prompts bullet
    source_version: Microsoft study guide, updated 2026-07-13
    checked_on: 2026-10-12
  - claim: GPT Realtime speech and audio requires a deployed GPT realtime model in a supported region.
    source: https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/realtime-audio
    locator: Prerequisites, deployment bullet
    source_version: Microsoft Learn, updated 2026-09-21
    checked_on: 2026-10-12
  - claim: Server VAD is enabled by default and automatically generates a response when the end of speech is detected.
    source: https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/realtime-audio
    locator: Voice activity detection (VAD) and the audio buffer, introductory paragraphs and Server decision mode
    source_version: Microsoft Learn, updated 2026-09-21
    checked_on: 2026-10-12
  - claim: With turn_detection set to none, the client must commit buffered audio and create a response; silence alone does not generate one.
    source: https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/realtime-audio
    locator: Voice activity detection (VAD) and the audio buffer > Manual turn handling (push-to-talk)
    source_version: Microsoft Learn, updated 2026-09-21
    checked_on: 2026-10-12
  - claim: Commit creates a conversation item and response creation starts output, which can be observed through the corresponding server events.
    source: https://learn.microsoft.com/en-us/azure/foundry/openai/how-to/realtime-audio
    locator: Manual turn handling (push-to-talk), event bullets; Conversation and response generation > Response generation
    source_version: Microsoft Learn, updated 2026-09-21
    checked_on: 2026-10-12
```
