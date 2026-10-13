---
card_id: pl-300-rls-multiple-role-union
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Manage and secure Power BI > Secure and govern Power BI items > Implement row-level security roles", "Manage and secure Power BI > Secure and govern Power BI items > Configure row-level security group membership"]
status: verified
reviewed_on: 2026-10-12
---

## Behavior

- When a report user is mapped to more than one row-level security (RLS) role, Power BI combines the roles' row filters additively: the user can see rows allowed by any mapped role (the union of the filtered row sets).

## Defaults or baseline

- RLS rules are defined in semantic-model roles, and role membership is mapped after publishing. A user's effective access can therefore depend on both direct assignments and group membership. This behavior concerns report consumers to whom RLS applies; workspace Admins, Members, and Contributors have edit permission and are not subject to RLS.

## Gotchas

- Do not assume a restrictive role overrides a broader role. If a user is mapped to both a role whose rule returns no rows and a role whose rule allows every row, the user can see every row; role membership is additive, not deny-overrides.

## Verify

- In Microsoft's RLS guidance, compare the `Workers` role with a `FALSE()` rule and the `Managers` role with a `TRUE()` rule. A user mapped to both can see all rows. In a safe model, use Power BI's **Test as role** feature to inspect the combined assignment and check indirect group memberships as well. No live Power BI model was tested for this source review.

## Applies to

- PL-300 manage and secure Power BI: implement RLS roles and configure RLS group membership.

## Evidence

```yaml
evidence:
  - claim: A user mapped to multiple RLS roles can see rows from the union of the row sets each role permits.
    source: https://learn.microsoft.com/en-us/power-bi/guidance/rls-guidance
    locator: "Create roles: paragraph on additive filters and the Workers FALSE()/Managers TRUE() example"
    source_version: Microsoft Learn Power BI RLS guidance, live documentation
    checked_on: 2026-10-12
  - claim: A user's multiple role mappings may arise directly or indirectly through security-group membership, so a restrictive role cannot be relied on to override rows allowed by another role.
    source: https://learn.microsoft.com/en-us/power-bi/guidance/rls-guidance
    locator: "Create roles: paragraphs on direct or indirect mappings and additive filters"
    source_version: Microsoft Learn Power BI RLS guidance, live documentation
    checked_on: 2026-10-12
  - claim: RLS roles and rules are defined in the model, then members are added to roles in the Power BI service after publishing; the service can test a role or combination of roles.
    source: https://learn.microsoft.com/en-us/fabric/security/service-admin-row-level-security
    locator: "To implement RLS workflow; Define roles and rules in Power BI Desktop; Manage RLS role membership in the Power BI service; Validate the role within the Power BI service"
    source_version: Microsoft Learn Power BI RLS with Power BI, live documentation (last updated May 13, 2026)
    checked_on: 2026-10-12
  - claim: The PL-300 skills measured as of April 20, 2026 include implementing row-level security roles and configuring row-level security group membership.
    source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300
    locator: "Skills measured as of April 20, 2026 > Manage and secure Power BI > Secure and govern Power BI items"
    source_version: PL-300 study guide effective April 20, 2026
    checked_on: 2026-10-12
  - claim: Role definitions are published with the semantic model, membership is added in the service, and Test as role can test a combination of roles or specific person.
    source: https://learn.microsoft.com/en-us/fabric/security/service-admin-row-level-security
    locator: "Define roles and rules in Power BI Desktop; Manage RLS role membership in the Power BI service; Validate the role within the Power BI service"
    source_version: Microsoft Learn, updated 2026-05-13
    checked_on: 2026-10-12
  - claim: RLS applies to workspace Viewers; workspace Admins, Members, and Contributors have edit permission and are not subject to it.
    source: https://learn.microsoft.com/en-us/fabric/security/service-admin-row-level-security
    locator: "Use RLS with workspaces"
    source_version: Microsoft Learn, updated 2026-05-13
    checked_on: 2026-10-12
```
