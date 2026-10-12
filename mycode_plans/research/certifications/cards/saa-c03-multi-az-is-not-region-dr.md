---
card_id: saa-c03-multi-az-is-not-region-dr
certification_id: saa-c03
exam_version: "SAA-C03"
objective_ids: ["2.2 Design highly available and/or fault-tolerant architectures"]
status: draft
reviewed_on:
---

## Behavior

- Spreading a workload across Availability Zones in one Region can mitigate an Availability Zone failure. It does not by itself provide recovery from a Region-wide failure; that requires a recovery design that places required resources and data in another Region.

## Defaults or baseline

- Multi-AZ and multi-Region designs address different failure scopes. Choose based on recovery objectives, data residency, and business requirements.

## Gotchas

- Treating a multi-AZ design as regional disaster recovery leaves the workload exposed to a Region-wide outage; the application may have no usable alternate Region to recover into.

## Verify

- Use the AWS Well-Architected Reliability Pillar guidance “REL10-BP01 Deploy the workload to multiple locations” and compare its Availability Zone and Region failure scopes against the SAA-C03 Task 2.2 objective.

## Applies to

- SAA-C03 Resilient Architectures: Task 2.2, design highly available or fault-tolerant architectures and choose a DR strategy.

## Evidence

```yaml
evidence:
  - claim: Multi-AZ distribution mitigates Availability Zone failures while Region recovery requires resources/data in another Region
    source: https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_fault_isolation_multiaz_region_system.html
    locator: REL10-BP01 Deploy the workload to multiple locations; Implementation guidance
    source_version: AWS Well-Architected Reliability Pillar, live documentation
    checked_on: 2026-10-12
  - claim: SAA-C03 Task 2.2 covers highly available/fault-tolerant designs, regional/AZ infrastructure, and selecting DR strategies
    source: https://docs.aws.amazon.com/pdfs/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.pdf
    locator: Content Domain 2, Task 2.2, printed pages 6–7
    source_version: AWS SAA-C03 Exam Guide, retrieved 2026-10-12
    checked_on: 2026-10-12
```
