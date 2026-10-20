---
card_id: pl300-visual-calculation-field-scope
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Visualize and analyze the data > Create reports > Create visual calculations by using DAX"]
status: verified
reviewed_on: 2026-10-20
---

## Behavior

Add a model field to the selected visual before a visual calculation refers to that field.

## Defaults or baseline

A visual calculation belongs to its visual. It works on aggregated visual data.

## Gotchas

A field in the semantic model is not automatically available to the visual calculation.

## Verify

Read the Microsoft sections below. No live Power BI report was tested.

## Applies to

PL-300 skills effective April 20, 2026: Visualize and analyze the data > Create reports > Create visual calculations by using DAX. No question assigned.

## Evidence

```yaml
evidence:
  - claim: "Model fields must be added to the visual before reference. Visual calculations are stored on the visual and operate on aggregated data."
    source: "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-visual-calculations-overview"
    locator: "Introduction, visual calculation differences bullets 1 and 3"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-20"
  - claim: "The April 20, 2026 guide includes this objective."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300"
    locator: "Skills measured as of April 20, 2026 > Visualize and analyze the data > Create reports > Create visual calculations by using DAX"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-20"
```
