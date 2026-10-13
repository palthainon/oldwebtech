---
card_id: pl300-role-playing-dates-active-relationships
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Model the data > Design and implement a data model > Implement role-playing dimensions"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- When a fact table must be filtered by two roles of the same dimension at the same time, model a separate dimension table for each role and give each its own active relationship to the fact. For example, a report that filters contracts by both effective month and renewal month needs those date roles to be independently usable in visuals.

## Defaults or baseline

- With one dimension table related twice to the same fact table, one path can be active and the other inactive. An inactive relationship does not automatically propagate a visual's filter. `USERELATIONSHIP` can activate it during a particular measure evaluation when simultaneous role filtering is not required.

## Gotchas

- Assuming that `USERELATIONSHIP` makes an inactive role available for every visual and security rule overstates its scope. Microsoft says row-level security filters never propagate through inactive relationships, even when a measure invokes `USERELATIONSHIP`. If RLS must follow each role, check the active relationship design and test it with representative roles.

## Verify

- Compare the PL-300 role-playing-dimension objective with Microsoft's active-versus-inactive relationship guidance. In a sample model, inspect which paths are active and whether two independent role slicers can filter the same fact. Test RLS separately if the model uses it; no live Power BI model was tested for this card.

## Applies to

- PL-300 skills measured as of 2026-04-20, Model the data > Design and implement a data model > Implement role-playing dimensions. No question IDs assigned.

## Evidence

```yaml
evidence:
  - claim: "The current PL-300 blueprint includes implementing role-playing dimensions in its data-model design objectives."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300"
    locator: "Skills measured as of April 20, 2026 > Model the data > Design and implement a data model"
    source_version: "PL-300 skills measured as of 2026-04-20; study guide updated 2026-03-20"
    checked_on: 2026-10-13
  - claim: "Where visuals must filter or group a fact by two dimension roles simultaneously, Microsoft recommends separate role-playing dimension tables with active relationships; one table with two relationships leaves one path inactive."
    source: "https://learn.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive"
    locator: "Active relationships, opening airport-role example and improved-model paragraphs; Refactoring methodology steps 3-4"
    source_version: "Power BI guidance, updated 2024-12-27"
    checked_on: 2026-10-13
  - claim: "An inactive relationship does not automatically propagate the second role's visual filter; USERELATIONSHIP can use it during one measure evaluation when simultaneous role filtering is not required."
    source: "https://learn.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive"
    locator: "Inactive relationships, sales date-role example and Orders Shipped measure; Recommendations"
    source_version: "Power BI guidance, updated 2024-12-27"
    checked_on: 2026-10-13
  - claim: "RLS filters only propagate through active relationships and not through an inactive path even when a measure uses USERELATIONSHIP."
    source: "https://learn.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive"
    locator: "Inactive relationships, note after Orders Shipped example; Recommendations"
    source_version: "Power BI guidance, updated 2024-12-27"
    checked_on: 2026-10-13
```
