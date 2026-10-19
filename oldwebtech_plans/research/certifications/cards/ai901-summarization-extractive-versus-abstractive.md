---
card_id: ai901-summarization-extractive-versus-abstractive
certification_id: ai901
exam_version: "2026-04-15"
objective_ids: ["Identify AI concepts and capabilities > Identify AI workloads > Describe common text analysis techniques, including summarization"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- For a text summary that must retain selected source sentences and their locations, use extractive summarization. For a concise summary that can rephrase and combine source ideas, use abstractive summarization.

## Defaults or baseline

- In the Azure Language text-summarization examples, extractive output consists of original input sentences and includes positional information. Abstractive output is generated rather than verbatim source sentences.

## Gotchas

- `Summarization` does not always mean newly written prose: extractive output copies selected sentences from the input. If exact source wording matters, an abstractive result does not provide that guarantee. The Azure Language summarization feature used for this comparison is scheduled to retire March 31, 2029; Microsoft's current guidance directs new projects to Foundry.

## Verify

- Compare Microsoft's text-summarization `Extractive` and `Abstractive` descriptions and example outputs. Check the retirement notice before recommending a service for a new project. No live Azure request was run.

## Applies to

- AI-901 skills effective April 15, 2026, Identify AI concepts and capabilities > Identify AI workloads > common text analysis techniques including summarization. This card explains the conceptual distinction using Microsoft's documented implementation; it does not prescribe the retiring Azure Language feature for new projects. No question IDs.

## Evidence

```yaml
evidence:
  - claim: "AI-901 includes summarization in the text-analysis techniques under Identify AI workloads."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901"
    locator: "Skills measured as of April 15, 2026 > Identify AI concepts and capabilities > Identify AI workloads"
    source_version: "AI-901 skills effective 2026-04-15; page updated 2026-07-13"
    checked_on: 2026-10-13
  - claim: "Extractive summarization selects original source sentences and returns their positional information and relevance score."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/language-service/summarization/overview?tabs=document-summarization"
    locator: "Key features for text summarization > Extractive summarization"
    source_version: "Microsoft Learn page updated 2026-06-30"
    checked_on: 2026-10-13
  - claim: "Abstractive summarization generates concise text that is not a verbatim set of source sentences, and can return summaries for contextual input ranges."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/language-service/summarization/overview?tabs=document-summarization"
    locator: "Key features for text summarization > Abstractive summarization"
    source_version: "Microsoft Learn page updated 2026-06-30"
    checked_on: 2026-10-13
  - claim: "The Azure Language summarization feature retires March 31, 2029, and Microsoft directs new projects to Foundry."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/language-service/summarization/overview?tabs=document-summarization"
    locator: "Important notice immediately after What is summarization? heading"
    source_version: "Microsoft Learn page updated 2026-06-30"
    checked_on: 2026-10-13
```
