# PL-300 report features independent review

PL-300 is the Microsoft Power BI analyst exam. The independent next_review agent reviewed four cards before question writing. The agent then reviewed questions pl300-pilot-010 through pl300-pilot-013. Review date: October 19, 2026. All four cards and questions pass after corrections.

## Card review

The reviewer checked every behavior, baseline, gotcha, and evidence claim against current Microsoft sources. The [study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300#skills-measured-as-of-april-20-2026) retains the April 20, 2026 objectives. Each card matches its stated visualization objective.

| Card | Approved claims | Primary source and section |
| --- | --- | --- |
| pl300-percentage-format-rule-number | Table and matrix percentage rules use stored decimals with Number. Percent sets boundaries relative to the value range. | [Conditional table formatting](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-conditional-table-formatting), Color by rules for percentages; Color by rules, paragraph beginning When you select Percent |
| pl300-tooltip-page-enable | Canvas size does not register a tooltip. Page Information enables it. Automatic field use also requires compatible fields and summarization. | [Report tooltips](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-tooltips), Create a report tooltip page step 2; Configure your tooltip report page steps 1-2; Considerations and limitations, field summarization bullets |
| pl300-sort-label-by-order-column | The selected label uses an order column at the same granularity. Each label maps to one sort value. Alphabetical order can differ from process order. | [Sort by column](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-sort-by-column), Set the column to use for sorting, opening paragraph and steps 1-3; Troubleshooting > Sort by column produces unexpected grouping, final bullet |
| pl300-synced-hidden-slicer-filter | Sync controls affected pages. Visible controls displayed slicers. A hidden synced slicer still filters its page. | [Slicers](https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-slicers), Sync and use slicers on other pages, steps 3-4 and Note |

The author narrowed the percentage card to tables and matrices before verification. The sorting card uses one sort value per label. It does not repeat the source's broader duplicate-rank assertion.

## Question review

The reviewer checked every stem, answer, explanation, choice rationale, objective, version, and card reference. Answer letters refer to stored choice order.

| Question suffix | Answer | Review result |
| --- | --- | --- |
| 010 | D | The stated stored value is 0.60. Number supplies the fixed threshold. Percent uses a range-relative boundary. The value 60 does not match the stored threshold. |
| 011 | A | Page Information registers the page. A name, canvas size, or Actual Size view does not. The stem supplies compatible fields as a premise. |
| 012 | B | Phase must sort by Phase Order. The corrected desired sequence is Intake, Test, Repair. Neither alphabetical direction gives that sequence. A cost measure does not define the required process order. |
| 013 | C | Sync remains selected when Visible is cleared. The North selection still filters Details. Visibility does not clear the selection or disable its filter. |

Question 012 initially requested an order that already matched alphabetical order. The author replaced it with a different sequence and explicit numeric mappings. The reviewer confirmed the correction before approval.

## Originality and limits

The reviewer compared the four new identifiers and normalized stems with 823 existing questions. No identifier collision or exact stem match exists. Normalization uses lowercase text, removes punctuation, and collapses spaces. The highest token-set Jaccard score is 0.233 between question 013 and pl300-pilot-006. Both mention report selection. They test different behaviors: cross-page slicer synchronization and a visual interaction pair. The reviewer read the nearest matches for all four questions. The four new questions also test distinct behaviors from each other.

The questions use original scenarios. The review did not use exam dumps or publisher practice assessments. The four questions can move to reviewed. No live Power BI report was tested. This review does not establish full exam coverage or approve publication before a successful release.

The new four-question fingerprint is SHA-256 `ab4fb7b757114a23dbf4d53cabf6bbf3860753c8859af12cc47bbefe9179a402`. The full thirteen-question fingerprint is `ba8fc0f6b39bc2d1b99ef79c89a0d3acec572a94fdef455b757c5447f3811c04`. Each fingerprint uses JSON.stringify of the questions in file order after removing each status property. Content changes require another review.
