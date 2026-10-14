---
card_id: saa-c03-multi-az-is-not-region-dr
certification_id: saa-c03
exam_version: "SAA-C03"
objective_ids: ["2.2 Design highly available and/or fault-tolerant architectures"]
status: verified
reviewed_on: 2026-10-14
---

## Behavior

- Spreading a workload across Availability Zones in one Region can mitigate an Availability Zone failure. For a disaster event involving Region-wide failure scope, AWS Well-Architected guidance calls for disaster recovery across multiple Regions.

## Defaults or baseline

- Multi-AZ and multi-Region designs address different failure scopes. Choose based on recovery objectives and business requirements.

## Gotchas

- A multi-AZ design alone has no second Region. If the scenario requires protection from Region-wide disruption, include a multi-Region recovery design.

## Verify

- Use the AWS Well-Architected Reliability Pillar guidance "REL10-BP02 Select the appropriate locations for your multi-location deployment" and compare its Availability Zone and Region failure scopes against the SAA-C03 Task 2.2 objective.

## Applies to

- SAA-C03 Resilient Architectures: Task 2.2, design highly available or fault-tolerant architectures and choose a DR strategy.

## Evidence

```yaml
evidence:
  - claim: Multi-AZ mitigates Availability Zone disruption, while Region-wide failure scope calls for disaster recovery across multiple Regions
    source: https://docs.aws.amazon.com/wellarchitected/2024-06-27/framework/rel_fault_isolation_select_location.html
    locator: REL10-BP02 > Implementation guidance; Implementation steps > Disaster recovery (DR)
    source_version: AWS Well-Architected Reliability Pillar, live documentation
    checked_on: 2026-10-14
  - claim: SAA-C03 Task 2.2 covers highly available/fault-tolerant designs, regional/AZ infrastructure, and selecting DR strategies
    source: https://docs.aws.amazon.com/pdfs/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.pdf
    locator: Content Domain 2, Task 2.2, PDF pages 7–8 (printed pages 6–7)
    source_version: AWS SAA-C03 Exam Guide, copyright 2026
    checked_on: 2026-10-14
```
