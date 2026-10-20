---
card_id: pl300-bin-column-not-measure
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Visualize and analyze the data > Identify patterns and trends > Use grouping, binning, and clustering"]
status: verified
reviewed_on: 2026-10-19
---

## Behavior

Use binning to place numeric or time column values into equal-sized ranges. Calculated columns can be binned. Measures cannot.

## Defaults or baseline

New group lets the author set a bin size and creates a bins field for use in a visual.

## Gotchas

A numeric result alone does not make a measure eligible for bins. Use an eligible column for this feature.

## Verify

Read the Microsoft sections below. No live Power BI report was tested.

## Applies to

PL-300 skills effective April 20, 2026: Visualize and analyze the data > Identify patterns and trends > Use grouping, binning, and clustering. No question assigned.

## Evidence

```yaml
evidence:
  - claim: "Binning puts values into equal-sized groups."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-grouping-and-binning"
    locator: "Introduction, paragraph beginning In Power BI Desktop"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
  - claim: "Numeric and time fields support bins; calculated columns are eligible but measures are not."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-grouping-and-binning"
    locator: "Use binning, opening paragraph"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
  - claim: "New group sets bin size and creates a bins field."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-grouping-and-binning"
    locator: "Use binning, steps 1-3"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
  - claim: "The April 20, 2026 guide includes this objective."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300"
    locator: "Skills measured as of April 20, 2026 > Visualize and analyze the data > Identify patterns and trends > Use grouping, binning, and clustering"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
```
