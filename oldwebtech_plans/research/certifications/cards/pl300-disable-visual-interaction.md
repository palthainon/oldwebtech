---
card_id: pl300-disable-visual-interaction
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Visualize and analyze the data > Enhance reports for usability and storytelling > Edit and configure interactions between visuals"]
status: verified
reviewed_on: 2026-10-19
---

## Behavior

Select the source visual. In Edit interactions, set None on a target visual when selections in the source must not affect that target.

## Defaults or baseline

Interaction controls appear on the other visuals after the author selects a source visual.

## Gotchas

Setting None on one target does not mean every interaction on the page is disabled. The author configures each source and target pair.

## Verify

Read Change the interaction behavior in the linked Microsoft source. No live Power BI model was tested.

## Applies to

PL-300 skills effective April 20, 2026: Visualize and analyze the data > Enhance reports for usability and storytelling > Edit and configure interactions between visuals. No questions assigned.

## Evidence

```yaml
evidence:
  - claim: "Selecting a visual exposes interaction controls on other visuals."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions"
    locator: "Change the interaction behavior, second paragraph beginning Start by selecting"
    source_version: "Microsoft Learn live documentation, checked 2026-10-19"
    checked_on: "2026-10-19"
  - claim: "None makes the selected visual have no impact on the chosen target."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions"
    locator: "Change the interaction behavior, None option"
    source_version: "Microsoft Learn live documentation, checked 2026-10-19"
    checked_on: "2026-10-19"
  - claim: "The author can repeat the configuration for other source visuals."
    source: "https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions"
    locator: "Change the interaction behavior, second paragraph beginning Start by selecting"
    source_version: "Microsoft Learn live documentation, checked 2026-10-19"
    checked_on: "2026-10-19"
  - claim: "The current PL-300 guide includes the stated objective."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300"
    locator: "Skills measured as of April 20, 2026 > Visualize and analyze the data > Enhance reports for usability and storytelling > Edit and configure interactions between visuals"
    source_version: "Microsoft Learn live documentation, checked 2026-10-19"
    checked_on: "2026-10-19"
```
