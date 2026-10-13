---
card_id: az-900-cloud-service-model-control
certification_id: az-900
exam_version: "2026-07-20"
objective_ids: ["Describe cloud service types: IaaS, PaaS, SaaS"]
status: draft
reviewed_on:
---

## Behavior

- When choosing among IaaS, PaaS, and SaaS, identify which layer the provider supplies and which parts the consumer still manages. In SaaS, the consumer uses the provider's application and generally manages only limited user-specific settings; in PaaS, the consumer deploys applications but does not manage the underlying cloud infrastructure.

## Defaults or baseline

- NIST's cloud service model definitions are vendor-neutral. They do not specify the exact division of responsibility for a particular Azure product.

## Gotchas

- Calling every hosted application “PaaS” can lead to the wrong answer: a ready-to-use provider application is SaaS, while PaaS is a platform for deploying consumer applications.

## Verify

- Compare the SaaS and PaaS definitions in NIST SP 800-145, section 2, page 2 (printed page number). For Azure-specific product classification, consult the product's current Microsoft documentation.

## Applies to

- AZ-900 cloud concepts: describe cloud service types and identify suitable use cases for IaaS, PaaS, and SaaS.

## Evidence

```yaml
evidence:
  - claim: SaaS gives the consumer use of provider-run applications and generally leaves only limited user-specific configuration to the consumer
    source: https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-145.pdf
    locator: Section 2, “Software as a Service (SaaS),” page 2
    source_version: NIST SP 800-145 final, September 2011
    checked_on: 2026-10-12
  - claim: PaaS lets the consumer deploy applications without managing the underlying cloud infrastructure
    source: https://nvlpubs.nist.gov/nistpubs/legacy/sp/nistspecialpublication800-145.pdf
    locator: Section 2, “Platform as a Service (PaaS),” page 2
    source_version: NIST SP 800-145 final, September 2011
    checked_on: 2026-10-12
  - claim: the exam measures cloud service type identification and use cases
    source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900
    locator: Skills measured as of July 20, 2026 > Describe cloud service types
    source_version: AZ-900 study guide effective July 20, 2026
    checked_on: 2026-10-12
```
