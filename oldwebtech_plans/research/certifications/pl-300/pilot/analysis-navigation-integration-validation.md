# PL-300 analysis and navigation integration validation

Date: 2026-10-19

PL-300, the Power BI Data Analyst exam, has 18 questions in this local batch. Five new questions cover binning, anomaly sensitivity, reference lines, mobile format overrides, and page navigation. The baseline is commit `e8b543c`, the release record for 13 published questions.

## Preservation and schema

The original 827 question register rows remain unchanged after Git newline normalization. The register adds five rows. All 13 original question objects remain unchanged with published status. The five new questions have reviewed status after independent approval.

The pilot validator passes for 18 questions. It checks quiz fields, answer indexes, explanations, unique identifiers, verified card references, matching exam versions, evidence locators, and preview assets. The XML export contains 18 questions. The GIFT export contains all 18 question identifiers. The public page, catalog, and export label show 18 questions. The public page retains its limited-coverage statement.

## Browser results

Chrome loaded the local public page. Existing saved progress showed 13 answered questions and five unseen questions. The setup showed 14 visualization questions, two preparation questions, one modeling question, and one management question. The source version remained April 20, 2026.

A full 18-question exam with one deliberate wrong anomaly answer produced 17 of 18 correct (94%). The domain totals were 2 of 2 for preparation, 1 of 1 for modeling, 13 of 14 for visualization, and 1 of 1 for management and security. The missed review showed the selected wrong answer, correct explanation, and all four choice explanations. Focus moved to the results heading. The completion announcement reported 17 of 18 correct.

Retry opened only the anomaly question. The correct answer produced 1 of 1 correct (100%). The result had no retry button. New Run followed by reload retained 18 answered questions with a latest score of 100%.

## Limits

This check covers local integration. It does not publish the batch or confirm production deployment. The separate content review provides the factual assessment. No live Power BI model, physical mobile device, Firefox, Safari, screen reader, or Moodle import was tested in this batch.
