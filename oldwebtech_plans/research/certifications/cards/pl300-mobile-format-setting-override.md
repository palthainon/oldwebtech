---
card_id: pl300-mobile-format-setting-override
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Visualize and analyze the data > Enhance reports for usability and storytelling > Design reports for mobile devices"]
status: verified
reviewed_on: 2026-10-19
---

## Behavior

Change an inherited formatting setting in mobile layout to make that setting independent of its desktop value.

## Defaults or baseline

Most settings initially inherit desktop values. Size and position do not inherit. Discarding a mobile formatting change reconnects the affected setting to the current desktop value.

## Gotchas

One mobile override does not disconnect every setting. Later desktop edits to the overridden setting do not replace its mobile value.

## Verify

Read the Microsoft sections below. No live Power BI report was tested.

## Applies to

PL-300 skills effective April 20, 2026: Visualize and analyze the data > Enhance reports for usability and storytelling > Design reports for mobile devices. No question assigned.

## Evidence

```yaml
evidence:
  - claim: "Most settings inherit desktop values until a change disconnects that setting; changes then remain independent in each layout."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-create-mobile-optimized-report-format-visuals"
    locator: "The visualizations pane, opening paragraphs"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
  - claim: "Discarding a mobile formatting change reconnects the setting to its current desktop value."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-create-mobile-optimized-report-format-visuals"
    locator: "Discarding mobile formatting changes"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
  - claim: "Size and position do not inherit desktop settings."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-create-mobile-optimized-report-format-visuals"
    locator: "Mobile formatting considerations and limitations"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
  - claim: "The April 20, 2026 guide includes this objective."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300"
    locator: "Skills measured as of April 20, 2026 > Visualize and analyze the data > Enhance reports for usability and storytelling > Design reports for mobile devices"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
```
