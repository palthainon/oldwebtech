---
card_id: clf-c02-shared-responsibility-service-shift
certification_id: clf-c02
exam_version: "CLF-C02"
objective_ids: ["2.1 Understand the AWS shared responsibility model"]
status: draft
reviewed_on:
---

## Behavior

- AWS secures the cloud infrastructure, while the customer secures their use of AWS services. The customer's workload responsibilities change with the service: with Lambda, AWS manages the underlying infrastructure and operating system, while the customer remains responsible for function code, resource configuration, and access permissions.

## Defaults or baseline

- The shared responsibility split is service-dependent; it is not a single fixed checklist for every AWS service.

## Gotchas

- Assuming AWS patches or secures customer function code can leave vulnerable application code or overly broad permissions in production.

## Verify

- Compare the Lambda shared-responsibility figure and its labels in the AWS Lambda Security Overview with the CLF-C02 Task Statement 2.1 wording about responsibilities shifting by service.

## Applies to

- CLF-C02 Security and Compliance, Task Statement 2.1.

## Evidence

```yaml
evidence:
  - claim: AWS manages Lambda's underlying infrastructure and operating system, while the customer is responsible for code, resource configuration, and IAM
    source: https://docs.aws.amazon.com/pdfs/whitepapers/latest/security-overview-aws-lambda/security-overview-aws-lambda.pdf
    locator: The Shared Responsibility Model; “Shared responsibility model for AWS Lambda” figure, page 5
    source_version: AWS Security Overview of AWS Lambda, PDF retrieved 2026-10-12
    checked_on: 2026-10-12
  - claim: CLF-C02 tests that the responsibility split can shift depending on service, including Lambda and EC2
    source: https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain2.html
    locator: Task Statement 2.1 > Skills in
    source_version: Current CLF-C02 exam guide, checked 2026-10-12
    checked_on: 2026-10-12
```
