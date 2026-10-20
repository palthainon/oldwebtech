---
card_id: pl300-import-page-refresh-unavailable
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Visualize and analyze the data > Enhance reports for usability and storytelling > Configure automatic page refresh"]
status: verified
reviewed_on: 2026-10-20
---

## Behavior

A report that uses only Import storage mode does not support automatic page refresh.

## Defaults or baseline

In Power BI Desktop, the Page refresh option is unavailable for an Import report.

## Gotchas

An open Import report can update after semantic model refresh for a user with write permissions. That behavior does not make automatic page refresh available.

## Verify

Read the Microsoft sections below. No live Power BI report was tested.

## Applies to

PL-300 skills effective April 20, 2026: Visualize and analyze the data > Enhance reports for usability and storytelling > Configure automatic page refresh. No question assigned.

## Evidence

```yaml
evidence:
  - claim: "The Page refresh option is unavailable for Import mode."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-automatic-page-refresh"
    locator: "Author reports with automatic page refresh in Power BI Desktop, Important callout"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-20"
  - claim: "Import does not support automatic page refresh; an open report can update after model refresh for users with write permission."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-automatic-page-refresh"
    locator: "Considerations and limitations, first bullet; Impact of model refresh on open reports when using Import mode, first paragraph"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-20"
  - claim: "The April 20, 2026 guide includes this objective."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300"
    locator: "Skills measured as of April 20, 2026 > Visualize and analyze the data > Enhance reports for usability and storytelling > Configure automatic page refresh"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-20"
```
