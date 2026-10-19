---
card_id: pl300-synced-hidden-slicer-filter
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Visualize and analyze the data > Enhance reports for usability and storytelling > Configure sync slicers"]
status: verified
reviewed_on: 2026-10-19
---

## Behavior

Select Sync for each page that must use the slicer selection. Select Visible only for pages that must show the slicer control.

## Defaults or baseline

A synced page can receive the slicer filter without displaying the slicer.

## Gotchas

Clearing Visible does not disable the synced filter. A hidden synced slicer can explain why a page still shows filtered data.

## Verify

Read the exact Microsoft sections below. No live Power BI report was tested.

## Applies to

PL-300 skills effective April 20, 2026: Visualize and analyze the data > Enhance reports for usability and storytelling > Configure sync slicers. No question assigned.

## Evidence

```yaml
evidence:
  - claim: "The Sync column selects pages affected by selections; Visible selects pages displaying the slicer."
    source: "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers"
    locator: "Sync and use slicers on other pages, steps 3-4"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
  - claim: "A synced slicer still filters a page when it is not visible there."
    source: "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers"
    locator: "Sync and use slicers on other pages, Note"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
  - claim: "The April 20, 2026 guide includes this objective."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300"
    locator: "Skills measured as of April 20, 2026 > Visualize and analyze the data > Enhance reports for usability and storytelling > Configure sync slicers"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
```
