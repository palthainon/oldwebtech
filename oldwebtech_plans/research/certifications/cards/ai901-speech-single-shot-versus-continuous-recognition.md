---
card_id: ai901-speech-single-shot-versus-continuous-recognition
certification_id: ai901
exam_version: "2026-04-15"
objective_ids: ["Build a lightweight application by using Azure Speech in Foundry Tools"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- For a lightweight speech-to-text app that handles one utterance and then returns a result, use single-shot recognition. When the app must keep recognizing until the application decides to stop, use continuous recognition and handle its recognition events.

## Gotchas

- Single-shot recognition ends after one utterance. Using it for a multi-utterance session will not keep transcribing later speech as a continuous stream; continuous recognition requires event handling and an explicit stop call.

## Verify

- In Microsoft's Speech SDK recognition guide, compare the single-shot example with **Use continuous recognition**. In a sample app, submit one utterance using single-shot recognition; then start continuous recognition, confirm successive results arrive through the recognition events, and call the stop method.

## Applies to

- AI-901, skills measured as of April 15, 2026: Implement AI solutions by using Microsoft Foundry > Implement AI solutions for text and speech by using Foundry > Build a lightweight application by using Azure Speech in Foundry Tools. No question IDs assigned.

## Evidence

```yaml
evidence:
  - claim: "The AI-901 objective is to build a lightweight application by using Azure Speech in Foundry Tools."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901"
    locator: "Skills measured as of April 15, 2026 > Implement AI solutions by using Microsoft Foundry > Implement AI solutions for text and speech by using Foundry"
    source_version: "Study guide updated 2026-07-13; skills effective 2026-04-15"
    checked_on: 2026-10-13
  - claim: "Single-shot recognition recognizes one utterance, whose end is determined by silence or the single-utterance processing limit."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech?pivots=programming-language-javascript"
    locator: "Use continuous recognition, introductory comparison with the preceding single-shot examples"
    source_version: "Microsoft Learn page last updated 2026-06-05; Speech SDK guide"
    checked_on: 2026-10-13
  - claim: "Continuous recognition is used when the application controls when recognition stops; the application subscribes to recognition events and calls the continuous-recognition stop method."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-recognize-speech?pivots=programming-language-javascript"
    locator: "Use continuous recognition; JavaScript section"
    source_version: "Microsoft Learn page last updated 2026-06-05; Speech SDK guide"
    checked_on: 2026-10-13
```
