# PL-300 pilot coverage

PL-300, the Power BI analyst exam, has eighteen pilot questions in this checkout. Each question uses one verified behavior card. The first thirteen questions are published. Five analysis and navigation questions passed [independent review](analysis-navigation-independent-review.md). Four report-feature questions passed [independent review](report-features-independent-review.md). Five visualization questions passed [independent review](visualization-independent-review.md). See [the first review](independent-review.md).

The [Microsoft study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300) uses skills effective April 20, 2026. The author checked the guide and the technical sources on October 19, 2026. Each bank item records its source section.

| Domain | Questions | Behavior |
| --- | ---: | --- |
| Prepare the data | 2 | Append column alignment; reference refresh execution |
| Model the data | 1 | Simultaneous date roles |
| Visualize and analyze the data | 14 | Time trends; interactions; drillthrough; bookmarks; keyboard order; formatting; tooltips; sorting; slicers; binning; anomaly sensitivity; reference lines; mobile formatting; page navigation |
| Manage and secure Power BI | 1 | Additive RLS roles |

RLS means row-level security. Its question assumes a consumer to whom RLS applies. It does not assess a privacy policy or a legal duty.

This pilot does not cover the full exam. Scores do not predict an exam result. The preview shows issuer weight midpoints, not pilot coverage. Eighteen questions cannot estimate domain readiness.

The CALCULATE card remains draft on main. This pilot excludes that card. The pilot leaves most preparation, calculations, performance, reports, workspace management, and governance objectives uncovered. The next content pass should cover remaining objectives such as visual calculations, paginated reports, themes, automatic page refresh, and forecasting.

The pilot uses the existing quiz engine and a separate storage identifier. The canonical bank and public page live under `certs/`. The public catalog, navigation, and sitemap include the pilot. No live Power BI model was tested. No publisher practice questions or exam dumps were used.

## Release location

The public page is `certs/pl300-pilot.html`. The canonical bank is `certs/data/pl300-pilot.js`. Questions 001-013 have published status. Questions 014-018 remain unpublished in this checkout. See [production validation](../../publication-validation.md#production-deployment). Research notes and source PDFs stay outside the public staging directory.

## Visualization expansion

Five new cards cover five distinct April 20, 2026 objectives in the visualization domain. The author checked the linked Microsoft sources on October 19, 2026. Each question records its exact source section. The new items do not establish complete coverage of any objective. No live Power BI report was tested.

| Question | Behavior card | Objective |
| --- | --- | --- |
| pl300-pilot-005 | pl300-line-chart-time-trend | Select an appropriate visual |
| pl300-pilot-006 | pl300-disable-visual-interaction | Edit and configure interactions between visuals |
| pl300-pilot-007 | pl300-drillthrough-target-field | Configure drillthrough navigation, including pages, filters, and buttons |
| pl300-pilot-008 | pl300-bookmark-preserve-slicers | Configure bookmarks |
| pl300-pilot-009 | pl300-accessibility-tab-order | Design and configure Power BI reports for accessibility |

## Nine-question release

On 2026-10-19, [production run 39322737334](https://github.com/palthainon/oldwebtech/actions/runs/39322737334) succeeded after [pull request 50](https://github.com/palthainon/oldwebtech/pull/50) merged at commit `ca933f6`. The orchestrator confirmed that the [live bank](https://oldweb.tech/certs/data/pl300-pilot.js) matched the reviewed nine-question release. Questions 005-009 now have published status. Question content remains unchanged.

## Report-feature expansion

Four new cards cover four additional objectives. The source check date is October 19, 2026. Each question cites its exact Microsoft section. These items do not establish complete objective coverage. No live Power BI report was tested.

| Question | Behavior card | Objective |
| --- | --- | --- |
| pl300-pilot-010 | pl300-percentage-format-rule-number | Apply conditional formatting |
| pl300-pilot-011 | pl300-tooltip-page-enable | Create custom tooltips |
| pl300-pilot-012 | pl300-sort-label-by-order-column | Apply sorting to visuals |
| pl300-pilot-013 | pl300-synced-hidden-slicer-filter | Configure sync slicers |

## Thirteen-question release

On 2026-10-19, [production run 39344937691](https://github.com/palthainon/oldwebtech/actions/runs/39344937691) succeeded after [pull request 52](https://github.com/palthainon/oldwebtech/pull/52) merged at commit `a5c74a7`. The orchestrator confirmed that the [live bank](https://oldweb.tech/certs/data/pl300-pilot.js) matched the reviewed thirteen-question release. Questions 010-013 now have published status. Question content remains unchanged.

## Analysis and navigation expansion

Five new cards cover five additional objectives. Each source was checked on October 19, 2026. The questions remain narrow. No live Power BI report was tested.

| Question | Behavior card | Objective |
| --- | --- | --- |
| pl300-pilot-014 | pl300-bin-column-not-measure | Use grouping, binning, and clustering |
| pl300-pilot-015 | pl300-anomaly-sensitivity | Detect outliers and anomalies |
| pl300-pilot-016 | pl300-fixed-reference-line | Use reference lines, error bars, and forecasting |
| pl300-pilot-017 | pl300-mobile-format-setting-override | Design reports for mobile devices |
| pl300-pilot-018 | pl300-page-navigation-action | Configure navigation for a report |
