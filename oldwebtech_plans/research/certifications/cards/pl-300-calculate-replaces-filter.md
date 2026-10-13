---
card_id: pl-300-calculate-replaces-filter
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Model data > Create model calculations by using DAX > Use the CALCULATE function"]
status: draft
reviewed_on:
---

## Behavior

- `CALCULATE` evaluates an expression in a modified filter context. A filter argument adds a filter when its target is not already filtered; for an already-filtered column or table, the new filter replaces the existing one unless `KEEPFILTERS` is used.

## Defaults or baseline

- A measure is evaluated under the filter context created by the visual and report filters. `CALCULATE` changes that context for its expression.

## Gotchas

- A measure that filters a column with `CALCULATE` may ignore a slicer selection on that same column because the measure's filter replaces the existing filter. Use `KEEPFILTERS` when the intended behavior is to intersect with the existing selection.

## Verify

- Read the “Remarks” and “Examples” sections of the DAX `CALCULATE` reference. Its Blue Revenue example shows the added/replaced filter behavior; the filter modifier table describes `KEEPFILTERS`.

## Applies to

- PL-300 model calculations: use `CALCULATE` in DAX measures.

## Evidence

```yaml
evidence:
  - claim: CALCULATE evaluates an expression in a modified filter context
    source: https://learn.microsoft.com/en-us/dax/calculate-function-dax
    locator: Opening definition and Remarks
    source_version: Microsoft Learn DAX CALCULATE reference, live documentation
    checked_on: 2026-10-12
  - claim: without KEEPFILTERS, a CALCULATE filter replaces an existing filter on the same column or table
    source: https://learn.microsoft.com/en-us/dax/calculate-function-dax
    locator: Remarks; filter modifier functions; Blue Revenue example
    source_version: Microsoft Learn DAX CALCULATE reference, live documentation
    checked_on: 2026-10-12
  - claim: the exam includes using CALCULATE in model calculations
    source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300
    locator: Skills measured as of April 20, 2026 > Model the data > Create model calculations by using DAX
    source_version: PL-300 study guide effective April 20, 2026
    checked_on: 2026-10-12
```
