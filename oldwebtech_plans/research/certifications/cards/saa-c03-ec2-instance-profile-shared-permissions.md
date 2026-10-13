---
card_id: saa-c03-ec2-instance-profile-shared-permissions
certification_id: saa-c03
exam_version: "SAA-C03 current-2026-10"
objective_ids: ["1.1 Design secure access to AWS resources"]
status: verified
reviewed_on: 2026-10-12
---

## Behavior

- An EC2 instance profile supplies an IAM role to the instance. Applications running on that instance share the profile and its AWS permissions. If two applications on one instance need different AWS access, attaching a different instance profile to each process is not an available isolation mechanism.

## Defaults or baseline

- An EC2 instance can have only one attached IAM role/profile at a time. AWS recommends assigning only the permissions the application requires to the role.

## Gotchas

- A team may treat an instance profile as if it were scoped to one service process. On a shared EC2 host, another application can use the same profile permissions, so the role's effective access can exceed the first application's needs. Do not count separate application processes as separate IAM principals for this design.

## Verify

- Read the current EC2 “IAM roles for Amazon EC2” page and AWS Security Reference Architecture identity-management guide sections cited below. In a disposable test account, compare the profile assigned to an instance with the credentials and permissions available to two applications on that instance.

## Applies to

- SAA-C03 Design Secure Architectures: Task 1.1, “Design secure access to AWS resources” (role and policy authorization design).

## Evidence

```yaml
evidence:
  - claim: The current SAA-C03 Task 1.1 includes designing an authorization model with IAM users, groups, roles, and policies, and role-based access control.
    source: https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain1.html
    locator: Content Domain 1 > Task 1.1: Design secure access to AWS resources > Skills in (role/group/policy authorization and role-based access strategy)
    source_version: Current live AWS SAA-C03 Exam Guide, checked 2026-10-12; source report records retrieval on 2026-10-12
    checked_on: 2026-10-12
  - claim: EC2 uses an instance profile as the container for an IAM role, and an instance profile can contain only one role.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
    locator: “IAM roles for Amazon EC2” > “Instance profiles”
    source_version: Current live Amazon EC2 User Guide, checked 2026-10-12
    checked_on: 2026-10-12
  - claim: An EC2 instance can have only one attached IAM role.
    source: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html
    locator: “IAM roles for Amazon EC2,” introductory guidance, paragraph beginning “You can only attach one IAM role to an instance”
    source_version: Current live Amazon EC2 User Guide, checked 2026-10-12
    checked_on: 2026-10-12
  - claim: All applications running on an EC2 instance share its instance profile and the same AWS permissions; AWS advises least-privilege role permissions.
    source: https://docs.aws.amazon.com/pdfs/prescriptive-guidance/latest/security-reference-architecture-identity-management/security-reference-architecture-identity-management.pdf
    locator: “EC2 instance profiles” > “Design considerations,” printed page 25; least-privilege recommendation also appears on printed page 25
    source_version: Current live AWS Prescriptive Guidance, AWS Security Reference Architecture (identity management), 50-page PDF; copyright 2026, checked 2026-10-12
    checked_on: 2026-10-12
```

**Scope note:** This card describes the documented EC2 instance-profile model. The exam guide and AWS service documentation are living sources; recheck their current versions before using this card in questions. No live EC2 test was run.

