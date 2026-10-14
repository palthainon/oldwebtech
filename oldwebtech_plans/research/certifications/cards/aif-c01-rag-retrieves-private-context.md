---
card_id: aif-c01-rag-retrieves-private-context
certification_id: aif-c01
exam_version: "AIF-C01 revision 1.1"
objective_ids: ["3.1 Describe design considerations for applications that use FMs: define RAG and describe business applications"]
status: verified
reviewed_on: 2026-10-14
---

## Behavior

- A retrieval augmented generation (RAG) workflow searches a connected data source, adds relevant retrieved material to the prompt, and then sends the augmented prompt to the model to generate a response.
- Amazon Bedrock Knowledge Bases can use proprietary information in a generative AI application and include citations to the original source data.

## Defaults or baseline

- Retrieval adds context at query time. Amazon Bedrock describes it as a way to avoid continually training a model to use private data.

## Gotchas

- Use citations to check the original data source. AIF-C01 also identifies inaccuracy as a GenAI disadvantage.

## Verify

- Follow “How Amazon Bedrock knowledge bases work” from document ingestion through runtime retrieval, then inspect a `RetrieveAndGenerate` result and its source citations.

## Applies to

- AIF-C01 Applications of Foundation Models, Task 3.1: define RAG and describe its business applications.

## Evidence

```yaml
evidence:
  - claim: Bedrock Knowledge Bases retrieve information from a data store and augment the prompt with retrieved context before generation
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html
    locator: "How Amazon Bedrock knowledge bases work" > opening paragraphs; "Runtime execution"
    source_version: Amazon Bedrock User Guide, live documentation
    checked_on: 2026-10-14
  - claim: RAG can incorporate private data without continually training the model on that data
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html
    locator: "How Amazon Bedrock knowledge bases work" > paragraph 2
    source_version: Amazon Bedrock User Guide, live documentation
    checked_on: 2026-10-14
  - claim: Knowledge Base generated responses can include citations to original data sources for accuracy checking
    source: https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html
    locator: "Retrieve data and generate AI responses with Amazon Bedrock Knowledge Bases" > capabilities, "Include citations"
    source_version: Amazon Bedrock User Guide, live documentation
    checked_on: 2026-10-14
  - claim: AIF-C01 identifies inaccuracy as a GenAI disadvantage
    source: https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain2.html
    locator: Task Statement 2.2 > Objectives > "Identify disadvantages of GenAI solutions" > "inaccuracy"
    source_version: AIF-C01 revision 1.1, published April 30, 2026
    checked_on: 2026-10-14
  - claim: current AIF-C01 objectives include defining RAG and describing its business applications
    source: https://docs.aws.amazon.com/aws-certification/latest/ai-practitioner-01/ai-practitioner-01-domain3.html
    locator: Task Statement 3.1 > Objectives > "Define Retrieval Augmented Generation (RAG) and describe its business applications"
    source_version: AIF-C01 revision 1.1, published April 30, 2026
    checked_on: 2026-10-14
```
