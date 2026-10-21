---
card_id: pl300-report-filter-all-pages
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Visualize and analyze the data > Create reports > Apply slicing and filtering"]
status: verified
reviewed_on: 2026-10-21
---

## Behavior

Place a filter under Filters on all pages when its intended scope is the entire report.

## Defaults or baseline

A page-level filter covers its page. A visual-level filter covers its selected visual.

## Gotchas

A filter on one page does not establish the same filter on every page.

## Verify

Read the Microsoft sections below. No live Power BI report was tested.

## Applies to

PL-300 skills effective April 20, 2026: Visualize and analyze the data > Create reports > Apply slicing and filtering. No question assigned.

## Evidence

```yaml
evidence:
  - claim: "Report-level filters apply across report pages and use Filters on all pages."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-report-add-filter"
    locator: "Add a report-level filter for an entire report, opening paragraph, step 3 and closing paragraph"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-21"
  - claim: "Page filters apply to all visuals on one page; a visual filter changes its selected visual."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-report-add-filter"
    locator: "Add a filter to an entire page, opening paragraph; Filter with a field that's not in the visual, step 5"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-21"
  - claim: "The April 20, 2026 guide includes this objective."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300"
    locator: "Skills measured as of April 20, 2026 > Visualize and analyze the data > Create reports > Apply slicing and filtering"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-21"
```
