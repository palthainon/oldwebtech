---
card_id: az-104-child-reader-does-not-restrict-parent-contributor
certification_id: az-104
exam_version: "2026-04-17"
objective_ids: ["Manage access to Azure resources > Assign roles at different scopes", "Manage access to Azure resources > Interpret access assignments"]
status: verified
reviewed_on: 2026-10-12
---

## Behavior

- Suppose a user has Azure **Contributor** at a subscription and **Reader** at one resource group in that subscription. Azure RBAC adds applicable role permissions. The narrower Reader assignment does not reduce the Contributor permissions inherited from the subscription.

## Defaults or baseline

- A role assignment combines a principal, role, and scope. Azure scopes run from management group to subscription to resource group to resource; a child scope inherits permissions assigned at a parent scope.

## Gotchas

- Adding Reader at the resource group is not a way to downgrade an inherited Contributor grant. Investigate the parent role assignment when the user can still manage resources. A separate applicable deny assignment can block access, so do not treat additive role assignments as an absolute allow rule.

## Verify

- Use **Access control (IAM) > Check access** on the affected resource group for the user. Review assignments at that scope and inherited from parents, and check for applicable deny assignments. The Microsoft RBAC overview gives the Contributor-at-subscription/Reader-at-resource-group example. No live Azure test was run for this source review.

## Applies to

- AZ-104 skills measured as of April 17, 2026: **Manage Azure identities and governance > Manage access to Azure resources**: assign roles at different scopes and interpret access assignments. No question IDs assigned.

## Evidence

```yaml
evidence:
  - claim: AZ-104 includes assigning roles at different scopes and interpreting access assignments.
    source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104
    locator: Skills measured as of April 17, 2026 > Manage Azure identities and governance > Manage access to Azure resources
    source_version: Microsoft AZ-104 study guide, skills effective 2026-04-17, page updated 2026-03-19
    checked_on: 2026-10-12
  - claim: Azure RBAC assignment combines principal, role, and scope; parent assignments are inherited at child scopes.
    source: https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-steps
    locator: Steps to assign an Azure role > Step 3, Identify the needed scope, paragraphs 1-2
    source_version: Microsoft Learn, updated 2025-10-15
    checked_on: 2026-10-12
  - claim: Contributor at subscription plus Reader at a child resource group remains effectively Contributor because Azure RBAC role grants are additive.
    source: https://learn.microsoft.com/en-us/azure/role-based-access-control/overview
    locator: What is Azure role-based access control? > Multiple role assignments, example paragraph
    source_version: Microsoft Learn, updated 2024-03-12
    checked_on: 2026-10-12
  - claim: Azure RBAC checks applicable deny assignments before role grants, so a deny assignment can block access.
    source: https://learn.microsoft.com/en-us/azure/role-based-access-control/overview
    locator: How Azure RBAC determines if a user has access to a resource, steps 3-4
    source_version: Microsoft Learn, updated 2024-03-12
    checked_on: 2026-10-12
  - claim: Check access lists assignments at and inherited to a scope, including Azure RBAC role and deny assignments.
    source: https://learn.microsoft.com/en-us/azure/role-based-access-control/check-access
    locator: Quickstart > Step 3, Check access for a user, assignment pane description
    source_version: Microsoft Learn, updated 2024-12-12
    checked_on: 2026-10-12
```
