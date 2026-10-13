---
card_id: saa-c03-s3-lifecycle-small-object-default
certification_id: saa-c03
exam_version: "SAA-C03 current-2026-10"
objective_ids: ["4.1 Design cost-optimized storage solutions"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- With the current default S3 Lifecycle transition behavior, objects smaller than 128 KB are not transitioned to another storage class. If a workload needs those objects transitioned, configure an object-size filter; account for the per-object transition request cost when deciding whether this will save money.

## Defaults or baseline

- Starting in September 2024, the default prevents transitions of objects smaller than 128 KB to any storage class.

## Gotchas

- A lifecycle rule that appears to cover a small-object prefix can leave those objects in their original class under the current default. Older lifecycle configurations created before September 2024 can retain the previous default behavior until a rule is created, edited, or deleted, so check the configuration's history when diagnosing different results.
- Allowing many small objects to transition can make per-object request costs outweigh storage savings.

## Verify

- In the current Amazon S3 User Guide, read “Transitioning objects using Amazon S3 Lifecycle” > “Constraints and considerations for transitions” > “Objects smaller than 128 KB will not transition by default to any storage class.” Compare its current and previous default behavior notes, then inspect the lifecycle rule's filters and the S3 request-cost assumptions for the workload.

## Applies to

- SAA-C03 Design Cost-Optimized Architectures: Task 4.1, “Design cost-optimized storage solutions” (data lifecycles, storage tiering, managing S3 object lifecycles, and selecting an appropriate storage tier).

## Evidence

```yaml
evidence:
  - claim: SAA-C03 Task 4.1 includes data lifecycles and storage tiering, plus managing S3 object lifecycles and choosing an appropriate storage tier.
    source: https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain4.html
    locator: Content Domain 4 > Task 4.1: Design cost-optimized storage solutions; Knowledge of data lifecycles and storage tiering, Skills in managing S3 object lifecycles and selecting the appropriate storage tier (lines 16–59 in the live HTML page)
    source_version: Current live AWS SAA-C03 Exam Guide, checked 2026-10-13; source report records retrieval of the current PDF on 2026-10-12
    checked_on: 2026-10-13
  - claim: Under the current default, S3 Lifecycle does not transition objects smaller than 128 KB to any storage class; object-size filters can specify a custom minimum or maximum size to allow smaller-object transitions.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html
    locator: “Constraints and considerations for transitions” > “Objects smaller than 128 KB will not transition by default to any storage class,” including the object-size-filter paragraph
    source_version: Current live Amazon S3 User Guide, checked 2026-10-13
    checked_on: 2026-10-13
  - claim: Amazon S3 updated the default in September 2024; configurations created before then retain the previous behavior unless rules are modified, and a transition request is charged for each object, so costs can outweigh storage savings for small objects.
    source: https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html
    locator: “Constraints and considerations for transitions” > small-object transition notes (updated and previous default behavior) and the introductory paragraph under the small-object heading (per-object transition request cost)
    source_version: Current live Amazon S3 User Guide, checked 2026-10-13
    checked_on: 2026-10-13
```

**Scope note:** The 128 KB behavior is specifically the documented default for S3 Lifecycle configurations. Existing configurations created before September 2024 can retain the previous default; confirm their configuration history and filters before predicting object behavior. No live S3 bucket or lifecycle rule was tested.
