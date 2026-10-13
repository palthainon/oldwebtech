---
card_id: ai901-text-pii-redaction-in-app
certification_id: ai901
exam_version: "2026-04-15"
objective_ids: ["Build a lightweight application that includes text analysis"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- When a lightweight app needs to mask detected sensitive details in a raw text string before a downstream step, use Azure Language Text PII and process its detected-entity metadata and redacted output. Check the configured entity coverage and the output before using it in the workflow; high-risk disclosure scenarios need human oversight.
- Choose the PII workflow that matches the input: Text PII accepts raw strings; Conversation PII is for turn-based conversation data; Document PII is for native files.

## Defaults or baseline

- In the default mask-returning flow, a successful Text PII response includes detected entities and redacted text. Its synchronous request/response flow can be inserted inline in an app pipeline. The preview `NoMask` policy is an exception: it omits `redactedText`.
- The current Python quickstart demonstrates `TextAnalyticsClient` with `recognize_pii_entities(...)` and reads each result's `redacted_text`; it also exposes entity category, confidence, offset, and length.

## Gotchas

- A redacted result reflects the entities detected and the configured redaction behavior. It is not a guarantee of complete anonymization: false negatives and unsupported personal-information categories can leave sensitive content. Microsoft recommends human review for redaction scenarios where a miss could cause serious harm.
- API-version details matter: the quickstart's REST example uses `2022-05-01`, while newer redaction-policy configuration is documented under `2025-11-15-preview`. Do not copy preview-only request parameters into a GA request without confirming the API version and feature support.

## Verify

- Follow Microsoft's Python PII quickstart with synthetic test text. Confirm the app receives `redacted_text` and entity metadata in its default flow, then compare the result with the input. This card is documentation-based; no live service call was run.
- In the Text PII overview, confirm raw-string input is the intended workflow and compare it with the conversation and document PII descriptions. If testing preview policy options, use the matching preview API version and note that preview features can change.

## Applies to

- AI-901 skills measured as of April 15, 2026: **Implement AI solutions by using Microsoft Foundry** > **Implement AI solutions for text and speech by using Foundry** > **Build a lightweight application that includes text analysis**. No question IDs assigned.

## Evidence

```yaml
evidence:
  - claim: "AI-901's April 15, 2026 objective includes building a lightweight application that includes text analysis."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901"
    locator: "Skills measured as of April 15, 2026 > Implement AI solutions by using Microsoft Foundry > Implement AI solutions for text and speech by using Foundry > Build a lightweight application that includes text analysis"
    source_version: "Skills measured 2026-04-15; page last updated 2026-07-13"
    checked_on: 2026-10-13
  - claim: "The exam guide says most exam questions cover GA features, while commonly used Preview features may also appear."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901"
    locator: "Updates to the exam > note about general availability and Preview features"
    source_version: "Page last updated 2026-07-13"
    checked_on: 2026-10-13
  - claim: "Text PII accepts raw text and is intended for direct application integration; its synchronous workflow submits text, optionally configures entity filters/redaction behavior, and processes entities plus redacted output."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/language-service/personally-identifiable-information/text-pii-overview"
    locator: "At a glance; How it works; How it differs from other PII feature types; updated 2026-04-21"
    source_version: "Microsoft Learn, Text Personally Identifiable Information (PII) redaction overview, last updated 2026-04-21"
    checked_on: 2026-10-13
  - claim: "Text PII, Conversation PII, and Document PII are designed for raw text strings, turn-based chat/transcript data, and native files, respectively."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/language-service/personally-identifiable-information/overview"
    locator: "Choose the right PII feature > Feature type / Input / Best for / Key strength"
    source_version: "Microsoft Learn, Personally Identifiable Information overview, last updated 2026-07-22"
    checked_on: 2026-10-13
  - claim: "Microsoft's Python quickstart calls recognize_pii_entities and reads redacted_text plus entity text, category, confidence, offset, and length."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/language-service/personally-identifiable-information/quickstart?pivots=programming-language-python"
    locator: "Python > Code example and Output; Python client library setup"
    source_version: "Microsoft Learn quickstart, checked 2026-10-13; package version shown in the current quickstart: azure-ai-textanalytics 5.2.0"
    checked_on: 2026-10-13
  - claim: "The REST quickstart example uses API version 2022-05-01 and returns redactedText alongside detected entity records."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/language-service/personally-identifiable-information/quickstart?pivots=programming-language-python"
    locator: "REST API > Send a personally identifiable information (PII) detection API request; JSON response"
    source_version: "Microsoft Learn quickstart; API version 2022-05-01 in example, checked 2026-10-13"
    checked_on: 2026-10-13
  - claim: "The newer redaction-policy configuration is documented for API version 2025-11-15-preview; it is version-specific and preview behavior can change."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/language-service/personally-identifiable-information/how-to/redact-text-pii"
    locator: "New configuration parameters (2025-11-15-preview); CharacterMask, noMask, and entityMask policy examples; Preview note"
    source_version: "Microsoft Learn how-to, last updated 2026-06-02; API 2025-11-15-preview"
    checked_on: 2026-10-13
  - claim: "False negatives or personal data outside supported categories can remain; Microsoft recommends human oversight for redaction scenarios where a miss could cause serious harm."
    source: "https://learn.microsoft.com/en-us/azure/foundry/responsible-ai/language-service/transparency-note-personally-identifiable-information"
    locator: "Considerations when choosing a use case > high-risk automatic redaction; Characteristics and limitations > Understand and measure performance; System limitations and best practices"
    source_version: "Microsoft PII transparency note, checked 2026-10-13"
    checked_on: 2026-10-13
  - claim: "The 2025-11-15-preview NoMask redaction policy omits the redactedText field, so redacted text is not present for every successful configuration."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/language-service/personally-identifiable-information/how-to/redact-text-pii"
    locator: "New configuration parameters (2025-11-15-preview) > Redaction policies > noMask policy type"
    source_version: "Microsoft Learn how-to, last updated 2026-06-02; API 2025-11-15-preview"
    checked_on: 2026-10-13
```
