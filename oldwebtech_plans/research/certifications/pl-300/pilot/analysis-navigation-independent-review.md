# PL-300 analysis and navigation review

PL-300 is the Microsoft Power BI analyst exam. The independent next_review agent reviewed five cards before question writing. The agent then reviewed questions pl300-pilot-014 through pl300-pilot-018. Review date: October 19, 2026. All five cards and questions pass.

## Card approval

Every behavior, baseline, gotcha, and evidence claim matches current primary Microsoft documentation. The [study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300#skills-measured-as-of-april-20-2026) retains the April 20, 2026 objectives. Each card fits its stated visualization objective.

| Card | Approved claims | Primary source and section |
| --- | --- | --- |
| pl300-bin-column-not-measure | Bins group numeric or time values into equal-sized ranges. Calculated columns support bins. Measures do not. New group creates the bins field. | [Grouping and binning](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-grouping-and-binning), introduction and Use binning, opening paragraph and steps 1-3 |
| pl300-anomaly-sensitivity | Higher sensitivity marks smaller deviations. Lower sensitivity is more selective. The stated time-series and supported-series limits apply. | [Anomaly detection](https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-anomaly-detection), Format anomalies; Considerations and limitations, first three bullets |
| pl300-fixed-reference-line | A Y-axis constant line marks a fixed horizontal value. An Average line calculates a measure average. Clustered column charts support both. | [Analytics pane](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane), Use the Analytics pane, feature table, Y-Axis constant line and Average line |
| pl300-mobile-format-setting-override | A mobile change disconnects the affected inherited setting. Other settings remain separate. Discarding the change reconnects the current desktop value. Size and position do not inherit. | [Mobile formatting](https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-create-mobile-optimized-report-format-visuals), The visualizations pane; Discarding mobile formatting changes; Mobile formatting considerations and limitations |
| pl300-page-navigation-action | Action selects button behavior. Page navigation uses a fixed report destination without a bookmark. Back uses the previous page. A label alone sets no action. | [Buttons](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-buttons), Select the action for a button, Back bullet and steps 1-2; Create page navigation, opening paragraph and step 1 |

## Question approval

The reviewer checked every stem, answer, explanation, rationale, objective, version, and card reference. Each question has one best answer under its stated conditions. Answer letters refer to stored choice order.

| Question suffix | Answer | Review result |
| --- | --- | --- |
| 014 | B | The numeric calculated column supports bins. A measure remains unsupported even if it returns a number. |
| 015 | C | Sensitivity controls the requested detection change. Color and size control appearance. The stem requires an already configured, supported chart. |
| 016 | D | The constant line marks 45 minutes. Average, Median, and Min lines describe the data instead. All four definitions are in the cited feature table. |
| 017 | A | The affected mobile font setting remains independent. A desktop change neither clears it nor disconnects every other setting. |
| 018 | B | Page navigation and Destination meet the fixed-page requirement. Back can return elsewhere. Text and hover formatting do not set an enabled navigation action. |

## Originality and limits

The reviewer compared the five identifiers and normalized stems with 827 existing questions. No identifier collision or exact stem match exists. Normalization uses lowercase text, removes punctuation, and collapses spaces. The highest token-set Jaccard score is 0.220 between question 017 and pl300-pilot-013. Those items test different behaviors: mobile format inheritance and slicer synchronization. The reviewer read the nearest match for every new question. The five new items also test distinct behaviors from one another.

The questions use original contexts. The review did not use exam dumps or publisher practice assessments. The five questions can move to reviewed. No live Power BI report was tested. These narrow behaviors do not establish full objective coverage. Integration checks and publication remain separate.

The five-question fingerprint is SHA-256 `b8f1368e422ebd74d3b3c1d87a7f4dbb3ee358bf0fc62e2694c333a21b4cb33c`. The full eighteen-question fingerprint is `e792968a5dbf77a7d563bb110041920a168a23869c9e1402c4cb27ef047feeda`. Each fingerprint uses JSON.stringify of questions in file order after removing each status property. Content changes require another review.
