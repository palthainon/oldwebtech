---
card_id: pl300-export-summarized-setting
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Visualize and analyze the data > Enhance reports for usability and storytelling > Configure export settings"]
status: verified
reviewed_on: 2026-10-21
---

## Behavior

In the current report settings, choose the summarized-data export option when the requirement permits summarized export but not underlying-data export.

## Defaults or baseline

The report choices distinguish summarized data, both summarized and underlying data, and no data export.

## Gotchas

A conflicting administrator setting takes precedence over the report setting. This card describes configuration, not a confidentiality policy.

## Verify

Read the Microsoft sections below. No live Power BI report was tested.

## Applies to

PL-300 skills effective April 20, 2026: Visualize and analyze the data > Enhance reports for usability and storytelling > Configure export settings. No question assigned.

## Evidence

```yaml
evidence:
  - claim: "Report export settings provide summarized-only, both, and no-export choices."
    source: "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-export-data"
    locator: "Admin and designer controls for exporting, opening list"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-21"
  - claim: "Configure Export data under Current file > Report settings; conflicting admin settings override report settings."
    source: "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-export-data"
    locator: "Admin and designer controls for exporting, steps 1-4 and final paragraph"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-21"
  - claim: "The April 20, 2026 guide includes this objective."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300"
    locator: "Skills measured as of April 20, 2026 > Visualize and analyze the data > Enhance reports for usability and storytelling > Configure export settings"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-21"
```
