---
card_id: az-104-policy-audit-deny-existing-resources
certification_id: az-104
exam_version: "2026-04-17"
objective_ids: ["Implement and manage Azure Policy"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- If an administrator wants to observe noncompliant resource requests while allowing them, assign a policy with the `audit` effect. If the goal is to reject a noncompliant Resource Manager create or update request, use `deny`; Azure Policy blocks it before it reaches the resource provider and returns 403 Forbidden.
- A resource that already exists and matches a `deny` policy is reported as non-compliant during evaluation. The `deny` effect does not repair or delete that existing resource.

## Defaults or baseline

- `audit` records a policy audit operation in the Activity Log for a noncompliant create or update and allows the request to continue. A standard compliance evaluation cycle updates compliance status without creating that request-time audit entry.

## Gotchas

- Assigning a `deny` policy is not a cleanup operation for existing resources. An administrator who expects it to fix existing noncompliance must plan a separate correction; Azure Policy remediation tasks apply to `modify` and `deployIfNotExists` effects.

## Verify

- Compare the Microsoft Learn `audit` and `deny` effect pages, then review “Test your policy's effectiveness” in the policy-impact guidance. In a disposable resource group, evaluate an already noncompliant resource and separately try a matching create or update with `audit` and `deny` to observe reporting versus request blocking.

## Applies to

- AZ-104 skills measured as of April 17, 2026: **Manage Azure identities and governance > Manage Azure subscriptions and governance > Implement and manage Azure Policy**. No question IDs assigned.

## Evidence

```yaml
evidence:
  - claim: AZ-104 includes the objective “Implement and manage Azure Policy” under Manage Azure subscriptions and governance.
    source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104
    locator: Skills measured as of April 17, 2026 > Manage Azure identities and governance > Manage Azure subscriptions and governance
    source_version: Microsoft AZ-104 study guide, skills effective 2026-04-17; page last updated 2026-03-19
    checked_on: 2026-10-13
  - claim: For Azure Resource Manager mode, audit logs and marks a noncompliant create or update without stopping the request; during a standard compliance evaluation cycle, only compliance status is updated.
    source: https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effect-audit
    locator: “Audit effect”; “Audit evaluation,” paragraphs 1–2
    source_version: Microsoft Learn, “Azure Policy definitions audit effect,” last updated 2025-03-04
    checked_on: 2026-10-13
  - claim: For Azure Resource Manager mode, deny blocks a matching create or update before it reaches the resource provider and returns 403 Forbidden.
    source: https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effect-deny
    locator: “Deny effect”; “Deny evaluation,” first paragraph
    source_version: Microsoft Learn, “Azure Policy definitions deny effect,” last updated 2025-03-04
    checked_on: 2026-10-13
  - claim: Existing resources matching a deny policy are marked non-compliant on evaluation, and remediation tasks are for modify or deployIfNotExists effects rather than deny.
    source: https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effect-deny
    locator: “Deny evaluation,” second paragraph
    source_version: Microsoft Learn, “Azure Policy definitions deny effect,” last updated 2025-03-04
    checked_on: 2026-10-13
  - claim: Existing resources can be evaluated before implementation; noncompliant resources can be cleaned up manually or through a remediation task when the policy effect is deployIfNotExists or modify.
    source: https://learn.microsoft.com/en-us/azure/governance/policy/concepts/evaluate-impact
    locator: “Test your policy's effectiveness,” paragraphs 1–3
    source_version: Microsoft Learn, “Evaluate the impact of a new Azure Policy definition,” last updated 2025-03-04
    checked_on: 2026-10-13
```
