---
card_id: pl300-bookmark-preserve-slicers
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Visualize and analyze the data > Enhance reports for usability and storytelling > Configure bookmarks"]
status: verified
reviewed_on: 2026-10-19
---

## Behavior

When a bookmark switches visible visuals without resetting the user's slicers, clear its Data option. Keep Display enabled for visibility changes.

## Defaults or baseline

Data captures filter and slicer state. Display captures visual visibility and spotlight settings.

## Gotchas

A bookmark with Data enabled can restore stored slicer selections when the user only expects a layout change.

## Verify

Read Create report bookmarks, bookmark options list and view-switching guidance in the linked Microsoft source. No live Power BI model was tested.

## Applies to

PL-300 skills effective April 20, 2026: Visualize and analyze the data > Enhance reports for usability and storytelling > Configure bookmarks. No questions assigned.

## Evidence

```yaml
evidence:
  - claim: "Data captures and restores filter and slicer states when enabled."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-bookmarks"
    locator: "Create report bookmarks, bookmark options list: Data"
    source_version: "Microsoft Learn live documentation, checked 2026-10-19"
    checked_on: "2026-10-19"
  - claim: "Display captures visual visibility and spotlight settings."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-bookmarks"
    locator: "Create report bookmarks, bookmark options list: Display"
    source_version: "Microsoft Learn live documentation, checked 2026-10-19"
    checked_on: "2026-10-19"
  - claim: "Disable Data when switching views without resetting filters."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-bookmarks"
    locator: "Create report bookmarks, paragraph after the bookmark options list"
    source_version: "Microsoft Learn live documentation, checked 2026-10-19"
    checked_on: "2026-10-19"
  - claim: "The current PL-300 guide includes the stated objective."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300"
    locator: "Skills measured as of April 20, 2026 > Visualize and analyze the data > Enhance reports for usability and storytelling > Configure bookmarks"
    source_version: "Microsoft Learn live documentation, checked 2026-10-19"
    checked_on: "2026-10-19"
```
