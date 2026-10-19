# PL-300 pilot coverage

PL-300, the Power BI analyst exam, has nine pilot questions in this checkout. Each question uses one verified behavior card. The first four questions are published. Five visualization questions passed [independent review](visualization-independent-review.md). See [the first review](independent-review.md).

The [Microsoft study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300) uses skills effective April 20, 2026. The author checked the guide and the technical sources on October 19, 2026. Each bank item records its source section.

| Domain | Questions | Behavior |
| --- | ---: | --- |
| Prepare the data | 2 | Append column alignment; reference refresh execution |
| Model the data | 1 | Simultaneous date roles |
| Visualize and analyze the data | 5 | Time trends; visual interactions; drillthrough; bookmarks; keyboard tab order |
| Manage and secure Power BI | 1 | Additive RLS roles |

RLS means row-level security. Its question assumes a consumer to whom RLS applies. It does not assess a privacy policy or a legal duty.

This pilot does not cover the full exam. Scores do not predict an exam result. The preview shows issuer weight midpoints, not pilot coverage. Nine questions cannot estimate domain readiness.

The CALCULATE card remains draft on main. This pilot excludes that card. The pilot leaves most preparation, calculations, performance, reports, workspace management, and governance objectives uncovered. The next content pass should cover missing visualization behaviors such as conditional formatting, tooltips, sorting, and sync slicers.

The pilot uses the existing quiz engine and a separate storage identifier. The canonical bank and public page live under `certs/`. The public catalog, navigation, and sitemap include the pilot. No live Power BI model was tested. No publisher practice questions or exam dumps were used.

## Release location

The public page is `certs/pl300-pilot.html`. The canonical bank is `certs/data/pl300-pilot.js`. Questions 001-004 have published status. Questions 005-009 remain unpublished in this checkout. See [production validation](../../publication-validation.md#production-deployment). Research notes and source PDFs stay outside the public staging directory.

## Visualization expansion

Five new cards cover five distinct April 20, 2026 objectives in the visualization domain. The author checked the linked Microsoft sources on October 19, 2026. Each question records its exact source section. The new items do not establish complete coverage of any objective. No live Power BI report was tested.

| Question | Behavior card | Objective |
| --- | --- | --- |
| pl300-pilot-005 | pl300-line-chart-time-trend | Select an appropriate visual |
| pl300-pilot-006 | pl300-disable-visual-interaction | Edit and configure interactions between visuals |
| pl300-pilot-007 | pl300-drillthrough-target-field | Configure drillthrough navigation, including pages, filters, and buttons |
| pl300-pilot-008 | pl300-bookmark-preserve-slicers | Configure bookmarks |
| pl300-pilot-009 | pl300-accessibility-tab-order | Design and configure Power BI reports for accessibility |
