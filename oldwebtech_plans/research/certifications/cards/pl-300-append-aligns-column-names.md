---
card_id: pl-300-append-aligns-column-names
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Prepare the data > Transform and load the data > Merge and append queries"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- When combining tables that hold the same kind of records in separate batches, append their queries to add rows. Align equivalent fields by column name before appending, because Power Query matches appended columns by header name rather than their position.

## Defaults or baseline

- Append adds rows from one or more tables into a combined table. Its resulting schema includes all column headers; a source row has null in a result column that its source table lacks.

## Gotchas

- If one batch calls a field `CustomerID` and another calls it `ClientID`, append keeps separate columns and fills the absent field with null for each batch. Similar looking column order does not make those fields line up. For matching records across two tables by key, merge is the relevant query operation instead.

## Verify

- Compare the Microsoft Power Query Append queries section `Append two tables` with `Merge queries overview` sections `Merging queries` and `Select column pairs`. Inspect the output columns in a safe sample query before loading data. No live Power BI transformation was run.

## Applies to

- PL-300 skills effective April 20, 2026: Prepare the data > Transform and load the data > Merge and append queries. No question IDs.

## Evidence

```yaml
evidence:
  - claim: "The April 2026 PL-300 guide includes merging and appending queries under data preparation."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300"
    locator: "Skills measured as of April 20, 2026 > Prepare the data > Transform and load the data"
    source_version: "PL-300 skills effective 2026-04-20; page updated 2026-03-20"
    checked_on: 2026-10-13
  - claim: "Append adds table contents as rows; the result includes all headers, and missing source columns yield null values."
    source: "https://learn.microsoft.com/en-us/power-query/append-queries"
    locator: "Append queries, introduction and Append two tables"
    source_version: "Power Query documentation updated 2026-04-08"
    checked_on: 2026-10-13
  - claim: "Power Query aligns appended columns by header name, not relative header position."
    source: "https://learn.microsoft.com/en-us/power-query/append-queries"
    locator: "Append two tables, paragraph after the Append dialog example"
    source_version: "Power Query documentation updated 2026-04-08"
    checked_on: 2026-10-13
  - claim: "Merge joins two tables by matching values in selected columns, unlike append's row combination."
    source: "https://learn.microsoft.com/en-us/power-query/merge-queries-overview"
    locator: "Merge queries overview, opening paragraph and Select column pairs"
    source_version: "Power Query documentation updated 2026-04-09"
    checked_on: 2026-10-13
  - claim: "Different header names such as CustomerID and ClientID would produce separate appended columns with missing values; this is a scenario inference from documented name matching and null behavior."
    source: "https://learn.microsoft.com/en-us/power-query/append-queries"
    locator: "Append queries, introduction and Append two tables"
    source_version: "Power Query documentation updated 2026-04-08"
    checked_on: 2026-10-13
```
