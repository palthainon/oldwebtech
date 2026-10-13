---
card_id: pl-300-reference-query-not-shared-refresh
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Prepare the data > Transform and load the data > Identify when to use reference or duplicate queries and the resulting impact"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- In Power Query, use **Reference** when several downstream queries should build on the same upstream transformation steps, so changes to that upstream query flow into them. Use **Duplicate** when a separate copy of the query is wanted. When choosing Reference for a Power BI model, assess refresh performance separately: referenced queries can each execute the upstream steps during refresh.

## Defaults or baseline

- Reference creates a new query that uses an existing query's steps; Duplicate creates a copy of the selected query. A reference is a logic relationship, not a promise that the upstream result will be fetched only once.

## Gotchas

- Assuming several references share one materialized upstream result can hide repeated source requests and slow refresh. Caching can change observed requests, so evaluate the actual model and source rather than assigning a fixed request count to every reference pattern.

## Verify

- Compare Microsoft's **Duplicating a query** and **Referencing a query** sections. For a Power BI Desktop model with multiple loaded references, inspect the query dependency and refresh behavior using the guidance in **Referencing Power Query queries**. This card is documentation-based; no live model refresh was run.

## Applies to

- PL-300 skills measured as of April 20, 2026: Prepare the data > Transform and load the data > Identify when to use reference or duplicate queries and the resulting impact. No question IDs assigned.

## Evidence

```yaml
evidence:
  - claim: The April 20 2026 PL-300 objective asks candidates to identify when to use reference or duplicate queries and their impact
    source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300
    locator: "Skills measured as of April 20, 2026 > Prepare the data > Transform and load the data"
    source_version: PL-300 study guide, skills effective 2026-04-20
    checked_on: 2026-10-13
  - claim: Duplicate creates a copy; Reference creates a new query that uses an existing query's steps and reflects changes to the original query
    source: https://learn.microsoft.com/en-us/power-query/queries-pane
    locator: "Basic actions in the Query pane > Duplicating a query; Referencing a query"
    source_version: Microsoft Learn, Using the Queries pane, updated 2023-02-17
    checked_on: 2026-10-13
  - claim: In Power BI Desktop, multiple loaded queries that reference one upstream query are evaluated separately on refresh; reference avoids duplicated logic but can increase refresh work or source requests
    source: https://learn.microsoft.com/en-us/power-bi/guidance/power-query-referenced-queries
    locator: "Introduction; Scenario; Recommendations, paragraphs 1-2"
    source_version: Microsoft Learn, Referencing Power Query queries, updated 2024-12-30
    checked_on: 2026-10-13
  - claim: Power Query caching can affect whether a query execution retrieves data from the source more than once
    source: https://learn.microsoft.com/en-us/power-bi/guidance/power-query-referenced-queries
    locator: "Scenario > Note beginning 'Power Query caching architecture is complex'"
    source_version: Microsoft Learn, Referencing Power Query queries, updated 2024-12-30
    checked_on: 2026-10-13
```
