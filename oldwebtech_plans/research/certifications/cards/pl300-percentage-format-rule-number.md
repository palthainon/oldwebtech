---
card_id: pl300-percentage-format-rule-number
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Visualize and analyze the data > Create reports > Apply conditional formatting"]
status: verified
reviewed_on: 2026-10-19
---

## Behavior

For a table or matrix conditional-format rule on a percentage field, enter decimal bounds with the Number type. A 40 percent bound uses 0.40 Number.

## Defaults or baseline

Percent sets a boundary within the minimum-to-maximum range of values.

## Gotchas

A displayed percentage does not mean the rule boundary should use Percent. That choice changes the meaning of the threshold.

## Verify

Read the exact Microsoft sections below. No live Power BI report was tested.

## Applies to

PL-300 skills effective April 20, 2026: Visualize and analyze the data > Create reports > Apply conditional formatting. No question assigned.

## Evidence

```yaml
evidence:
  - claim: "Percentage fields use decimal rule values with Number rather than Percent."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-conditional-table-formatting"
    locator: "Color by rules for percentages"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
  - claim: "Percent boundaries describe a percentage of the overall value range."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-conditional-table-formatting"
    locator: "Color by rules, paragraph beginning When you select Percent"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
  - claim: "The April 20, 2026 guide includes this objective."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300"
    locator: "Skills measured as of April 20, 2026 > Visualize and analyze the data > Create reports > Apply conditional formatting"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
```
