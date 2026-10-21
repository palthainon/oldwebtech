# PL-300 report controls integration validation

Date: 2026-10-21

PL-300, the Power BI Data Analyst exam, has 28 questions in this local batch. Five new questions cover layer order, visual personalization, export settings, report filters, and Analyze comparisons. The baseline is commit `2d46cb7`, the prior 23-question release candidate.

## Preservation and schema

The original 837 question register rows remain unchanged after Git newline normalization. The register adds five rows. All 23 original question objects remain unchanged, including their existing status values. The five new questions have reviewed status after independent approval. This integration check does not change publication status.

The pilot validator passes for 28 questions. It checks quiz fields, answer indexes, explanations, unique identifiers, verified card references, matching exam versions, evidence locators, and preview assets. The XML export contains 28 questions. The GIFT export contains all 28 question identifiers. The public page, catalog, and export label show 28 questions. The public page retains its limited-coverage statement.

## Browser results

Chrome loaded the local public page. Existing saved progress showed 23 answered questions and five unseen questions. The setup showed 24 visualization questions, two preparation questions, one modeling question, and one management question. The source version remained April 20, 2026.

A full 28-question exam with one deliberate wrong Analyze answer produced 27 of 28 correct (96%). The domain totals were 2 of 2 for preparation, 1 of 1 for modeling, 23 of 24 for visualization, and 1 of 1 for management and security. The missed review showed the selected wrong answer, correct explanation, and all four choice explanations. Focus moved to the results heading.

Retry opened only the Analyze question. The correct answer produced 1 of 1 correct (100%). The result had no retry button. New Run followed by reload retained 28 answered questions with a latest score of 100%.

## Limits

This check covers local integration. It does not publish the batch or confirm production deployment. The separate content review provides the factual assessment. No live Power BI model, physical mobile device, Firefox, Safari, screen reader, or Moodle import was tested in this batch.
