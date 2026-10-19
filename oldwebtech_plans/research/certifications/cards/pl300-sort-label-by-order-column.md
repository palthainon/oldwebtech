---
card_id: pl300-sort-label-by-order-column
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Visualize and analyze the data > Enhance reports for usability and storytelling > Apply sorting to visuals"]
status: verified
reviewed_on: 2026-10-19
---

## Behavior

In Power BI Desktop, use Sort by Column on a category label to set its custom order from another column. Each label must map to one order value at the same level of detail.

## Defaults or baseline

Select the label column, then choose its order column. This differs from sorting a visual by its measure.

## Gotchas

Alphabetical label order does not imply the required process order. A label mapped to multiple order values cannot define one stable sort key.

## Verify

Read the exact Microsoft sections below. No live Power BI report was tested.

## Applies to

PL-300 skills effective April 20, 2026: Visualize and analyze the data > Enhance reports for usability and storytelling > Apply sorting to visuals. No question assigned.

## Evidence

```yaml
evidence:
  - claim: "Sort by Column uses a different column to order the selected column; both columns need the same granularity."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-sort-by-column"
    locator: "Set the column to use for sorting, opening paragraph and steps 1-3"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
  - claim: "Each unique sorted value maps to exactly one sort value."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-sort-by-column"
    locator: "Troubleshooting sort by column > Sort by column produces unexpected grouping, final bullet"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
  - claim: "The April 20, 2026 guide includes this objective."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300"
    locator: "Skills measured as of April 20, 2026 > Visualize and analyze the data > Enhance reports for usability and storytelling > Apply sorting to visuals"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
```
