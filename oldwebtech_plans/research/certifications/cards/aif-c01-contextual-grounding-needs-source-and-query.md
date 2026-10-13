---
card_id: aif-c01-contextual-grounding-needs-source-and-query
certification_id: aif-c01
exam_version: "AIF-C01 revision 1.1"
objective_ids: ["4.1.2 Explain how to use tools to identify features of responsible AI"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- For a one-shot question about a supplied document, an Amazon Bedrock Guardrails contextual grounding check evaluates the model response against both the reference source and the user's query. It produces separate grounding and relevance scores. Configured thresholds can filter responses with scores below the selected limits.

## Defaults or baseline

- The check needs three pieces: the grounding source, the query, and the response to guard. Because it needs the response, this contextual grounding check runs on output, not on the input prompt.

## Gotchas

- A response can be supported by the supplied source yet fail to answer the query; grounding and relevance are distinct checks. The check judges against the source provided, so it does not by itself establish whether that source is correct outside this context. This last point is an inference from the documented comparison scope.
- AWS lists summarization, paraphrasing, and question answering as supported uses, but explicitly excludes conversational question answering and chatbot use cases. Do not generalize this check to an ongoing chatbot conversation.

## Verify

- Compare the official Bedrock guide's grounded-but-irrelevant example with its score and threshold description. The guide also states the three required components and the supported-use boundary. This is a documentation review; no live Bedrock request was made.

## Applies to

- AIF-C01 revision 1.1, Objective 4.1.2, Task 4.1: using Amazon Bedrock Guardrails as a responsible-AI tool. No question IDs yet.

## Evidence

```yaml
evidence:
  - claim: AIF-C01 Task 4.1 includes using Amazon Bedrock Guardrails as a tool to identify responsible-AI features; this is the second objective under that task.
    source: https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain4.html
    locator: Domain 4 > Task Statement 4.1 > Objectives, second bullet
    source_version: AIF-C01 revision 1.1, published 2026-04-30
    checked_on: 2026-10-13
  - claim: Contextual grounding checks compare a model response with a supplied source for grounding and with the user query for relevance.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html
    locator: Opening paragraphs > Grounding and Relevance definitions
    source_version: Amazon Bedrock User Guide, current online documentation
    checked_on: 2026-10-13
  - claim: The check requires grounding source, query, and response, and configured grounding and relevance thresholds can filter responses below the limits.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html
    locator: Confidence scores and thresholds; three-component list immediately below
    source_version: Amazon Bedrock User Guide, current online documentation
    checked_on: 2026-10-13
  - claim: The contextual grounding check is performed on output because a model response is required, not on the prompt.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html
    locator: Calling contextual grounding check with Invoke APIs > note after tag example
    source_version: Amazon Bedrock User Guide, current online documentation
    checked_on: 2026-10-13
  - claim: A grounded response can still be irrelevant to the query; the guide's example separates the two scores.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html
    locator: Irrelevant example; Grounded but Irrelevant example
    source_version: Amazon Bedrock User Guide, current online documentation
    checked_on: 2026-10-13
  - claim: Summarization, paraphrasing, and question answering are supported use cases, while conversational question answering and chatbots are not supported.
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html
    locator: Opening paragraph, supported-use statement
    source_version: Amazon Bedrock User Guide, current online documentation
    checked_on: 2026-10-13
```
