# PL-300 report design independent review

Reviewed on 2026-10-20 by next_review, the independent content reviewer.

## Decision

Approve five behavior cards as verified. Approve questions pl300-pilot-019 through pl300-pilot-023 as reviewed after the correction below. Each question has one supported answer. Each question uses a verified card. This decision does not approve publication.

The [Microsoft exam guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300), Skills measured as of April 20, 2026, retains all five mapped objectives. The cards and questions use that version.

## Card claims

| Card | Independent conclusion and primary locator |
| --- | --- |
| pl300-visual-calculation-field-scope | Approved. A model field must be in the selected visual before a visual calculation references it. Visual calculations belong to the visual and use aggregated data. [Visual calculations](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-visual-calculations-overview), introduction, differences bullets 1 and 3. |
| pl300-paginated-all-table-rows | Approved. Paginated tables print across the pages needed for their rows. A regular report page prints visible table rows. The introduction supports precise page layout. [Paginated reports](https://learn.microsoft.com/en-us/power-bi/paginated-reports/paginated-reports-report-builder-power-bi), introduction paragraph beginning Paginated reports are designed, and Compare Power BI reports and paginated reports, first two paragraphs. |
| pl300-theme-manual-color-override | Approved. Explicit non-theme colors retain their manual value. Theme palette colors follow palette positions. A section reset restores defaults. A whole-visual reset can also remove actions and conditional formatting. [Report themes](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-report-themes), Understand how theme colors are used by the report, final two paragraphs, and Understand how the report uses themes, Individual visuals paragraph and following Note. |
| pl300-import-page-refresh-unavailable | Approved. Pure Import reports lack automatic page refresh. Open reports can update after model refresh for users with write permission. That behavior is separate. [Automatic page refresh](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-automatic-page-refresh), Author reports with automatic page refresh in Power BI Desktop, Important callout, Considerations and limitations, first bullet, and Impact of model refresh on open reports when using Import mode, first paragraph. |
| pl300-forecast-line-visual | Approved. Forecast estimates future values from historical time data on a line chart. Settings include length and confidence interval. Constant lines show fixed values. Anomalies identify unexpected spikes or dips. [Analytics pane](https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-analytics-pane), Use the Analytics pane feature table, Forecast section, and Anomalies opening paragraph. |

The Import card avoids a claim that only DirectQuery supports the feature. The current service support table also lists Direct Lake.

## Question review

All stems, choices, answers, explanations, and choice rationales passed substantive review.

| Question | Answer | Review result |
| --- | --- | --- |
| pl300-pilot-019 | A | Adding Parts Cost to the selected matrix meets field scope. Another visual, a page name, or model membership does not meet that requirement. |
| pl300-pilot-020 | B | A paginated table meets the requirement for every matching row. A page print, saved filters, and a summary card do not produce that output. |
| pl300-pilot-021 | C | The section reset removes the direct color override. Reapplying the theme, another explicit color, or a page name does not restore the default. |
| pl300-pilot-022 | D | Pure Import mode explains the missing feature. Themes, bookmarks, and page names do not remove that restriction. |
| pl300-pilot-023 | A | Forecast supplies the future estimate. Constant, anomaly, and average features serve different purposes. The feature table also supports the average-line rationale. |

Question 020 first implied that bookmarks save table scroll position. The writer replaced that claim with saved report filters. The [bookmark documentation](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-bookmarks), introduction opening paragraph, supports the corrected choice. The bank and register now include this source.

## Originality and duplicate check

The comparison used 832 prior questions: 800 legacy questions, 14 AI-901 questions, and 18 PL-300 questions. No new identifier or normalized stem duplicates a prior item. Manual review of the nearest matches found distinct tested behaviors. The largest stem token similarity was 0.256 for question 022 against question 017. Storage-mode support differs from mobile format inheritance.

The five new items test distinct behaviors. Forecast tests feature purpose. It does not repeat the earlier line-chart selection or fixed-reference-line questions. The scenarios do not copy Microsoft examples or publisher questions.

## Content fingerprints

SHA-256 uses JSON question objects with status removed. Question order is preserved.

- New questions 019 through 023: `cf6108a1d8a61141e511c89b750e4ddf597a7141e11c31c3b2c4993d7e469bcb`
- Full 23-question bank: `47872897b63ef5d06b0afeb8ef2c7676f502771b4b55dacab1bde26db0792a07`

## Limits

No live Power BI report was tested. This review checks documented behavior and assessment content. The pilot covers selected objectives. Its score does not predict exam readiness. Integration checks and publication remain separate gates.
