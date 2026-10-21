# PL-300 report controls independent review

Reviewed on 2026-10-21 by next_review, the independent content reviewer.

## Decision

Approve five behavior cards as verified. Approve questions pl300-pilot-024 through pl300-pilot-028 as reviewed. Every question has one supported answer. Each question uses a verified card. Publication requires separate validation.

The [Microsoft exam guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300), Skills measured as of April 20, 2026, retains the five mapped objectives. The cards and questions use that version.

## Card claims

The reviewer checked every substantive claim against current primary sources before question writing.

| Card | Conclusion and precise primary locator |
| --- | --- |
| pl300-selection-layer-order | Approved. The Selection pane changes front-to-back order through name dragging or arrows. Alignment changes boundaries. [Gridlines and layout](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-gridlines-snap-to-grid), Use z-order, all three paragraphs, and Align and distribute visuals, opening two paragraphs. |
| pl300-personalization-visual-override | Approved. Report enablement permits personalization. The author can disable it per page or per visual. The visual switch is under Format, General, Header icons, Icons. [Personalization](https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-personalize-visuals), Switch the feature on or off at a page or visual level, opening paragraph, and Personalize visual per visual. |
| pl300-export-summarized-setting | Approved. The three report choices permit summarized data, both export types, or no data export. Current file report settings contain the control. Conflicting admin settings override it. [Export data](https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-export-data), Admin and designer controls for exporting, opening list, steps 1-4, and final paragraph. The card makes no confidentiality policy claim. |
| pl300-report-filter-all-pages | Approved. Report filters apply across pages. Page filters cover one page. Visual filters cover their selected visual. [Add a filter](https://learn.microsoft.com/en-us/power-bi/create-reports/power-bi-report-add-filter), Add a report-level filter for an entire report, opening paragraph, step 3, and closing paragraph, Add a filter to an entire page, opening paragraph, and Filter with a field that's not in the visual, step 5. The writer corrected the exact last heading. |
| pl300-analyze-previous-point | Approved. Analyze compares with the immediately previous point. The first point is unavailable. Documented support restrictions remain applicable. [Analyze](https://learn.microsoft.com/en-us/power-bi/explore-reports/end-user-analyze-visuals), introduction final paragraph before Which factors and categories are chosen, and Considerations and limitations, opening paragraphs and list. |

## Question review

All stems, choices, answers, explanations, and choice rationales passed. No question correction was required.

| Question | Answer | Review result |
| --- | --- | --- |
| pl300-pilot-024 | B | Layer order meets the fixed-position requirement. Align, distribute, and snap controls change placement or spacing. The same source's Use snap-to-grid and Align and distribute visuals sections support all distractor rationales. |
| pl300-pilot-025 | C | The visual switch limits the exception to one chart. The page and report switches are too broad. Leaving the visual enabled does not meet the requirement. |
| pl300-pilot-026 | D | Summarized-only matches the requested setting. Both types exceed it. No export prevents the required output. A title does not configure export. The administrator permission premise avoids a conflict. |
| pl300-pilot-027 | A | Filters on all pages gives report scope. The other choices only set page or visual scope. The related Region dimension premise makes the expected propagation clear. |
| pl300-pilot-028 | B | March immediately precedes April. January, February, and the series average do not meet that rule. The supported-chart premise avoids unsupported Analyze scenarios. |

## Originality

The duplicate comparison used 837 prior items: 800 legacy questions, 14 AI-901 questions, and 23 PL-300 questions. No identifier or normalized stem collision was found. Manual review of nearest matches found different tested behaviors. The maximum token similarity was 0.214 for question 025 against question 011. Visual personalization differs from tooltip page registration.

The five new questions test separate behaviors. Report filter scope differs from the earlier hidden synced-slicer question. Layer order differs from accessibility tab order. The questions do not copy source examples or publisher assessments.

## Content fingerprints

SHA-256 uses JSON question objects with status removed. Question order is preserved.

- New questions 024 through 028: `f34227f4303527ab0f7e0f3b7a739f6dc49cbb3e62dcb7e94558e677a5a7dd4a`
- Full 28-question bank: `d7d02ee35b17a520ee82c2821141591d18d14f8a418563fb7aa153c21b6480b7`

## Limits

No live Power BI report was tested. The review checks documented behavior and assessment content. The pilot covers selected objectives. Its score does not predict exam readiness. Browser tests and publication remain separate gates.
