---
card_id: aif-c01-rag-retrieves-private-context
certification_id: aif-c01
exam_version: "AIF-C01 revision 1.1"
objective_ids: ["2.1 Explain the basic concepts of GenAI: define RAG", "3.1 Describe design considerations for applications that use FMs: define RAG and describe business applications"]
status: draft
reviewed_on:
---

## Behavior

- When a foundation model needs current or private business information, a retrieval augmented generation workflow searches a connected knowledge source, adds relevant retrieved material to the prompt, and then asks the model to generate a response using that context.
- A Bedrock Knowledge Base can return citations to source material so a reader can check where retrieved information came from.

## Defaults or baseline

- Retrieval adds context at query time. It can avoid repeatedly training a model on private data, but it does not guarantee that the generated answer is correct.

## Gotchas

- Adding a knowledge base does not make every answer authoritative: the retrieved chunks may be incomplete or irrelevant, so the source citations and retrieved passages still need review.

## Verify

- Follow “How Amazon Bedrock knowledge bases work” from document ingestion through runtime retrieval, then inspect a `RetrieveAndGenerate` result and its source citations.

## Applies to

- AIF-C01 Fundamentals of GenAI, Task 2.1 RAG concepts; Applications of Foundation Models, Task 3.1 RAG definition and business use.

## Evidence

```yaml
evidence:
  - claim: Bedrock Knowledge Bases retrieve information from a data store and augment the prompt with retrieved context before generation
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html
    locator: Opening definition; Runtime execution
    source_version: Amazon Bedrock User Guide, live documentation
    checked_on: 2026-10-12
  - claim: RAG can incorporate private data without continually training the model on that data
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html
    locator: Opening definition
    source_version: Amazon Bedrock User Guide, live documentation
    checked_on: 2026-10-12
  - claim: Knowledge Base generated responses can include citations to original data sources for accuracy checking
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html
    locator: “Retrieve data and generate AI responses with Amazon Bedrock Knowledge Bases” > capabilities
    source_version: Amazon Bedrock User Guide, live documentation
    checked_on: 2026-10-12
  - claim: citations expose source material for checking, but the generated answer still needs review against the retrieved passages
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html
    locator: “Retrieve data and generate AI responses with Amazon Bedrock Knowledge Bases” > capabilities
    source_version: Amazon Bedrock User Guide, live documentation
    checked_on: 2026-10-12
  - claim: current AIF-C01 objectives include RAG concepts and applications
    source: https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html
    locator: Task Statement 2.1 > RAG; https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html, Task Statement 3.1 > RAG
    source_version: AIF-C01 revision 1.1, published April 30, 2026; current exam guide checked 2026-10-12
    checked_on: 2026-10-12
```
