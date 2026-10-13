---
card_id: ai901-content-understanding-field-extraction
certification_id: ai901
exam_version: "2026-04-15"
objective_ids: ["Extract information from documents and forms by using Azure Content Understanding in Foundry Tools"]
status: verified
reviewed_on: 2026-10-12
---

# Behavior

- Define the fields an analyzer should return in a schema; Content Understanding can extract, classify, or generate field values from unstructured content.
- For document analysis, extracted values can include source grounding and confidence estimates so a reviewer can trace and assess a field.

# Gotchas

- A schema-aligned value is not automatically trustworthy. Skipping confidence and source checks can pass an incorrect field into downstream automation.

# Verify

- Use a document analyzer with a small schema, inspect the structured output, then trace returned values to their source regions and confidence estimates.

# Applies to

- AI-901: Implement AI solutions for information extraction by using Foundry; extract information from documents and forms with Azure Content Understanding. No questions linked yet.

# Evidence

```yaml
evidence:
  - claim: "AI-901 assesses extracting information from documents and forms with Azure Content Understanding in Foundry Tools."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901"
    locator: "Skills measured as of April 15, 2026, Implement AI solutions for information extraction by using Foundry"
    source_version: "Skills measured 2026-04-15; page updated 2026-07-13"
    checked_on: 2026-10-12
  - claim: "An analyzer schema defines field extraction, which can extract, classify, or generate values."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview"
    locator: "Key components of Content Understanding, Analyzer and Field extraction; page updated 2026-09-24"
    source_version: "Documentation checked 2026-10-12; API 2025-11-01 GA"
    checked_on: 2026-10-12
  - claim: "Document analyzers can provide confidence estimates and grounding to trace extracted values to source regions."
    source: "https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview"
    locator: "Key components of Content Understanding, Confidence scores and Grounding; page updated 2026-09-24"
    source_version: "Documentation checked 2026-10-12; API 2025-11-01 GA"
    checked_on: 2026-10-12
```
