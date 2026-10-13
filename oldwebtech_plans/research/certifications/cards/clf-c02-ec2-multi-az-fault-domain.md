---
card_id: clf-c02-ec2-multi-az-fault-domain
certification_id: clf-c02
exam_version: "CLF-C02 current-2026-10"
objective_ids: ["3.2 Define the AWS global infrastructure"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- If an application must remain available through the loss of one Availability Zone, placing all its EC2 instances in the same Zone preserves a common failure point. Distribute the instances across separate Availability Zones in the Region. This card concerns the placement decision, not a guarantee of automatic failover; traffic routing and application recovery also need a design. The final qualification is an architectural inference, not a promise made by the cited placement guidance.

## Defaults or baseline

- An Availability Zone is an isolated location within a Region. Each Region has multiple independent Zones; a zonal resource is specific to the Zone where it is created.

## Gotchas

- Two instances do not provide Zone-failure tolerance merely because they are separate instances. AWS explicitly gives the example that all EC2 instances in a failed single Zone would be unavailable. Multiple Zones in one Region also do not, by themselves, cover a Region-wide failure.

## Verify

- Compare CLF-C02 Domain 3 Task 3.2's multiple-Zone high-availability skill with the AWS Regions and Availability Zones guide. Its single-Zone EC2 example identifies the shared fault; its Availability Zones section describes physical separation and the multi-Zone placement practice. This is a documentation check, not a live failover test.

## Applies to

- CLF-C02, Domain 3 Task 3.2, AWS global infrastructure and high availability. No question IDs yet.

## Evidence

```yaml
evidence:
  - claim: CLF-C02 Task 3.2 covers Regions and Availability Zones, describing high availability by using multiple Zones and recognizing that Zones do not share a single point of failure.
    source: https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain3.html
    locator: Content Domain 3 > Task Statement 3.2 > Knowledge of and Skills in
    source_version: CLF-C02 current online exam guide
    checked_on: 2026-10-13
  - claim: Availability Zones are isolated locations within a Region, and each Region has multiple independent Zones; a zonal resource is specific to its Zone.
    source: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html
    locator: AWS Regions and Availability Zones > opening list; Availability Zones, paragraphs 1 and 3
    source_version: AWS Regions and Availability Zones User Guide, current online documentation
    checked_on: 2026-10-13
  - claim: All EC2 instances in one Availability Zone can become unavailable if that Zone fails; placing an application across multiple Zones is AWS's stated practice for remaining available after one Zone fails.
    source: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html
    locator: AWS Regions and Availability Zones > opening failure example; Availability Zones, paragraph 3
    source_version: AWS Regions and Availability Zones User Guide, current online documentation
    checked_on: 2026-10-13
  - claim: Availability Zones are physically separate; each consists of data centers with redundant power, networking, and connectivity, reducing shared location failures.
    source: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html
    locator: Availability Zones, paragraph 2
    source_version: AWS Regions and Availability Zones User Guide, current online documentation
    checked_on: 2026-10-13
  - claim: Regions are isolated from each other, so multiple Zones inside one Region are not a substitute for a multi-Region design when a Region-wide failure is in scope.
    source: https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html
    locator: Regions, paragraph 1; Availability Zones, paragraph 1; scoped architectural inference
    source_version: AWS Regions and Availability Zones User Guide, current online documentation
    checked_on: 2026-10-13
```
