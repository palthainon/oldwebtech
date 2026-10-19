---
card_id: pl300-drillthrough-target-field
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Visualize and analyze the data > Enhance reports for usability and storytelling > Configure drillthrough navigation, including pages, filters, and buttons"]
status: verified
reviewed_on: 2026-10-19
---

## Behavior

For drillthrough within one report, place the detail key in the target page Drillthrough filters well. Use that same field without aggregation in the source visual.

## Defaults or baseline

Drillthrough from a selected data point opens the target page with that item as filter context.

## Gotchas

A matching field title alone is insufficient. The source visual must contain the same field used in the target drillthrough well.

## Verify

Read Create a drillthrough page; Use drillthrough from a visual in the linked Microsoft source. No live Power BI model was tested.

## Applies to

PL-300 skills effective April 20, 2026: Visualize and analyze the data > Enhance reports for usability and storytelling > Configure drillthrough navigation, including pages, filters, and buttons. No questions assigned.

## Evidence

```yaml
evidence:
  - claim: "The target page receives a field in its Drillthrough filters well."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-drillthrough"
    locator: "Create a drillthrough page, steps 5-7"
    source_version: "Microsoft Learn live documentation, checked 2026-10-19"
    checked_on: "2026-10-19"
  - claim: "The source visual contains the same field without aggregation; selecting a point opens the target filtered to that item."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-drillthrough"
    locator: "Use drillthrough from a visual, steps 1-6 and note; Troubleshooting > Drillthrough page does not appear in the context menu, step 3"
    source_version: "Microsoft Learn live documentation, checked 2026-10-19"
    checked_on: "2026-10-19"
  - claim: "The current PL-300 guide includes the stated objective."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300"
    locator: "Skills measured as of April 20, 2026 > Visualize and analyze the data > Enhance reports for usability and storytelling > Configure drillthrough navigation, including pages, filters, and buttons"
    source_version: "Microsoft Learn live documentation, checked 2026-10-19"
    checked_on: "2026-10-19"
```
