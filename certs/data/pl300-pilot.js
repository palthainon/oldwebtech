// Original scoped practice. Independent review is required before release.
window.CERT_BANK = {
  "id": "pl300-pilot",
  "vendor": "Microsoft",
  "exam": "PL-300 scoped pilot",
  "code": "PL-300 (2026-04-20)",
  "asOf": "2026-10",
  "examVersion": "2026-04-20",
  "status": "reviewed",
  "objectivesUrl": "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300",
  "scope": "Four narrow behaviors. This pilot does not cover the full exam or predict exam readiness.",
  "domains": [
    {
      "id": "1",
      "name": "Prepare the data",
      "weight": 27.5
    },
    {
      "id": "2",
      "name": "Model the data",
      "weight": 27.5
    },
    {
      "id": "3",
      "name": "Visualize and analyze the data",
      "weight": 27.5
    },
    {
      "id": "4",
      "name": "Manage and secure Power BI",
      "weight": 17.5
    }
  ],
  "questions": [
    {
      "id": "pl300-pilot-001",
      "domain": "1",
      "objective": "Merge and append queries",
      "type": "single",
      "q": "A repair shop appends two monthly tables in Power Query. Both tables contain the same fields, but the second table lists the columns in reverse order. The header names match exactly. What determines how the appended values line up?",
      "choices": [
        "The position of each column",
        "The column header names",
        "The first value in each column",
        "The number of rows in each table"
      ],
      "answer": [
        1
      ],
      "explain": "Append matches columns by header name. A different column order does not change this match.",
      "why": [
        "Column position does not control append alignment.",
        "Correct. Matching header names identify the same output column.",
        "The first value does not define the output column match.",
        "Row counts do not define the output column match."
      ],
      "cardIds": [
        "pl-300-append-aligns-column-names"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-query/append-queries",
          "locator": "Append two tables, paragraph after the Append dialog example",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "reviewed"
    },
    {
      "id": "pl300-pilot-002",
      "domain": "1",
      "objective": "Identify when to use reference or duplicate queries and the resulting impact",
      "type": "single",
      "q": "A Power BI Desktop model loads Open Rentals and Completed Rentals from two queries. Both queries reference a staging query with load disabled. The author expects refresh to fetch the staging result once for both queries. Which assessment is correct?",
      "choices": [
        "Load disabled guarantees one shared result.",
        "References guarantee no source requests during refresh.",
        "The queries run separately, so one shared fetch is not guaranteed.",
        "Exactly two source requests must occur on every refresh."
      ],
      "answer": [
        2
      ],
      "explain": "References reuse query logic. They do not guarantee one shared result during refresh. Caching can affect source requests.",
      "why": [
        "Disabling load does not make the staging result a shared stored result.",
        "Referenced steps can still retrieve source data.",
        "Correct. Separate query execution prevents this guarantee.",
        "Caching and query execution prevent a fixed request count from being assumed."
      ],
      "cardIds": [
        "pl-300-reference-query-not-shared-refresh"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-bi/guidance/power-query-referenced-queries",
          "locator": "Scenario, separate query executions and caching note",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "reviewed"
    },
    {
      "id": "pl300-pilot-003",
      "domain": "2",
      "objective": "Implement role-playing dimensions",
      "type": "single",
      "q": "An equipment rental report must filter rentals by pickup month and return month at the same time. The author wants separate slicers for both roles. Which model design follows Microsoft guidance for simultaneous role filtering?",
      "choices": [
        "Separate Pickup Date and Return Date tables, each with an active relationship to Rentals",
        "One Date table with only the pickup relationship active and no measure that uses the return relationship",
        "Separate date tables with both relationships inactive and no activating measure",
        "One Date table with only the return relationship active and no measure that uses the pickup relationship"
      ],
      "answer": [
        0
      ],
      "explain": "Separate dimension tables let each date role filter the fact table through its own active relationship.",
      "why": [
        "Correct. Each role has its own active filter path.",
        "The inactive return relationship does not automatically carry the return filter.",
        "Inactive relationships do not automatically propagate the slicer filters.",
        "The inactive pickup relationship does not automatically carry the pickup filter."
      ],
      "cardIds": [
        "pl300-role-playing-dates-active-relationships"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive",
          "locator": "Opening paragraph; Active relationships, simultaneous role filtering and improved model; Refactoring methodology steps 3-4",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "reviewed"
    },
    {
      "id": "pl300-pilot-004",
      "domain": "4",
      "objective": "Implement row-level security roles",
      "type": "single",
      "q": "A report consumer is subject to row-level security (RLS). One assigned role permits only workshop A records. Another assigned role permits only workshop B records. The workshops have distinct records. With no other filters, which records can the consumer see?",
      "choices": [
        "No records, because no record belongs to both workshops",
        "Only workshop A records, because its role was assigned first",
        "Only workshop B records, because its role was assigned last",
        "Records from both workshop A and workshop B"
      ],
      "answer": [
        3
      ],
      "explain": "Multiple RLS role filters combine additively. The consumer sees the union of the rows that the assigned roles permit.",
      "why": [
        "The filters do not require a row to satisfy both roles.",
        "Role assignment order does not make the first role override the other role.",
        "Role assignment order does not make the last role override the other role.",
        "Correct. Either role can permit a row."
      ],
      "cardIds": [
        "pl-300-rls-multiple-role-union"
      ],
      "evidenceRefs": [
        {
          "url": "https://learn.microsoft.com/en-us/power-bi/guidance/rls-guidance",
          "locator": "Create roles, paragraph on additive filters and union",
          "checkedOn": "2026-10-19"
        }
      ],
      "examVersion": "2026-04-20",
      "status": "reviewed"
    }
  ]
};
