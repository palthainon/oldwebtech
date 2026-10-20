---
card_id: pl300-theme-manual-color-override
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Visualize and analyze the data > Create reports > Apply and customize a theme"]
status: verified
reviewed_on: 2026-10-20
---

## Behavior

An explicit non-theme color on a visual does not automatically follow a new theme palette. Reset the relevant formatting section to restore theme formatting.

## Defaults or baseline

Theme colors follow their palette position when the theme changes.

## Gotchas

Resetting the whole visual can also remove actions and conditional formatting. Use the relevant section when only that section needs its default.

## Verify

Read the Microsoft sections below. No live Power BI report was tested.

## Applies to

PL-300 skills effective April 20, 2026: Visualize and analyze the data > Create reports > Apply and customize a theme. No question assigned.

## Evidence

```yaml
evidence:
  - claim: "Non-theme colors do not automatically update with the theme; theme colors follow their palette position."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-report-themes"
    locator: "Understand how theme colors are used by the report, paragraphs beginning The colors in the color palette and If you prefer"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-20"
  - claim: "Reset can apply to a formatting section; whole-visual reset removes actions and conditional formatting."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-report-themes"
    locator: "Understand how the report uses themes, paragraph beginning Individual visuals and following Note"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-20"
  - claim: "The April 20, 2026 guide includes this objective."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300"
    locator: "Skills measured as of April 20, 2026 > Visualize and analyze the data > Create reports > Apply and customize a theme"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-20"
```
