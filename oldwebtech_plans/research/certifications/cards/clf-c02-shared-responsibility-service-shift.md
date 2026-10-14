---
card_id: clf-c02-shared-responsibility-service-shift
certification_id: clf-c02
exam_version: "CLF-C02"
objective_ids: ["2.1 Understand the AWS shared responsibility model"]
status: verified
reviewed_on: 2026-10-14
---

## Behavior

- AWS and the customer share security and compliance responsibilities. The customer's workload responsibilities change with the service: with Lambda, AWS manages the underlying infrastructure, foundation services, operating system, and application platform; the customer is responsible for the security of its code and AWS IAM for the Lambda service and within the function.

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
  - claim: AWS manages Lambda's underlying infrastructure, foundation services, operating system, and application platform; the customer is responsible for the security of its code and AWS IAM to the Lambda service and within its function
    source: https://docs.aws.amazon.com/pdfs/whitepapers/latest/security-overview-aws-lambda/security-overview-aws-lambda.pdf
    locator: The Shared Responsibility Model, PDF page 8 (printed page number 5)
    source_version: AWS Security Overview of AWS Lambda, current PDF retrieved 2026-10-14
    checked_on: 2026-10-14
  - claim: CLF-C02 tests that the responsibility split can shift depending on service, including Lambda and EC2
    source: https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain2.html
    locator: Task Statement 2.1 > Skills in
    source_version: Current CLF-C02 online exam guide, checked 2026-10-14
    checked_on: 2026-10-14
```
