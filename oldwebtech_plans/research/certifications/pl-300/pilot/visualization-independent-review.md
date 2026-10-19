# PL-300 visualization expansion review

PL-300 is the Microsoft Power BI analyst exam. The independent next_review agent checked five cards before question writing. The agent then checked questions pl300-pilot-005 through pl300-pilot-009. Review date: October 19, 2026. All five cards and questions pass.

## Card approval

The [current study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300#skills-measured-as-of-april-20-2026) retains the April 20, 2026 objectives. All five cards map to its visualization domain. The reviewer checked every behavior, baseline, gotcha, and evidence claim against the live primary sources below. Locator corrections were applied before the cards received verified status.

| Card | Claims checked | Primary source and precise section |
| --- | --- | --- |
| pl300-line-chart-time-trend | Line charts show time trends. Continuous horizontal data suits them. Donut charts show parts of a whole. | [Visualizations overview](https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualizations-overview), Charts for comparison and trends > Line charts; Charts for part-to-whole relationships > Pie and donut charts |
| pl300-disable-visual-interaction | The selected source exposes target controls. None stops that source from affecting one target. Other pairs remain configurable. | [Visual interactions](https://learn.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions), Change the interaction behavior, second paragraph and Filter, Highlight, None options |
| pl300-drillthrough-target-field | The target well receives the same field used without aggregation in the source. Drillthrough passes the selected item context. A title does not configure the field. | [Drillthrough](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-drillthrough), Create a drillthrough page steps 5-7; Use drillthrough from a visual steps 1-6 and note; Troubleshooting > Drillthrough page does not appear in the context menu step 3 |
| pl300-bookmark-preserve-slicers | Data restores filter and slicer state. Display restores visibility and spotlight. Data can be disabled to preserve current filters during a view switch. | [Report bookmarks](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-bookmarks), Create report bookmarks, bookmark options list and following paragraph |
| pl300-accessibility-tab-order | Tab order determines keyboard sequence. The Selection pane permits reordering and exclusion. Decorative shapes and images should not add keyboard stops. | [Report accessibility](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-accessibility-creating-reports), Tab order, Shapes, and Images |

## Question approval

The reviewer checked every stem, answer, explanation, and choice rationale. Each question has one best answer under its stated conditions. Each question uses its approved card above. Answer letters refer to stored choice order.

| Question suffix | Answer | Review result |
| --- | --- | --- |
| 005 | C | A date-based line chart fits the requested temperature trend. Shares, one reading, and values without dates omit the requested sequence. |
| 006 | A | None controls the selected source-to-target pair. Filter and Highlight change the target. The corrected stem specifies a column chart so Highlight is a supported alternative. |
| 007 | D | The target well must contain the source field. A title, count, or navigation button alone does not establish that field. The source field is explicitly nonaggregated. |
| 008 | B | Data off preserves the current slicer state. Display on restores the saved chart and table visibility. The other combinations fail one stated requirement. |
| 009 | C | Excluding decoration removes unnecessary stops. Removing controls harms navigation. Keeping or moving decoration first retains the problem. |

The scenarios use original lake, report, pump, date-slicer, and border-shape contexts. The reviewer found no copied source example or duplicated behavior. No exam dump or publisher practice assessment was used.

The reviewer compared new identifiers and normalized stems against 818 existing questions. No identifier collision or exact normalized stem match exists. A token-set similarity check returned unrelated networking and security scenarios as the nearest matches. The reviewer read those matches. Normalization uses lowercase text, removes punctuation, and collapses spaces. The five new questions also test distinct behaviors from one another.

## Approval boundary

The five new questions can move to reviewed. They remain a small sample of the visualization domain. No live Power BI model or assistive technology session was tested. Integration validation remains separate. Publication requires a successful release.

The five-question content fingerprint is SHA-256 `7eac009967f295fcf403f886e36523c27358442e2fe531d818524c4d27273a8b`. The full nine-question fingerprint is `cf7d8d77509acf50ca10261be08565cd2d0298ad1cbc8e1ab47ea6252f2a5e95`. Each fingerprint uses JSON.stringify of questions in file order after removing each status property. Content changes require another review.
