# PL-300 report design integration validation

Date: 2026-10-20

PL-300, the Power BI Data Analyst exam, has 23 questions in this local batch. Five new questions cover visual calculation scope, paginated printing, theme overrides, Import refresh restrictions, and forecasting. The baseline is commit `cf8888b`, the release record for 18 published questions.

## Preservation and schema

The original 832 question register rows remain unchanged after Git newline normalization. The register adds five rows. All 18 original question objects remain unchanged with published status. The five new questions have reviewed status after independent approval.

The pilot validator passes for 23 questions. It checks quiz fields, answer indexes, explanations, unique identifiers, verified card references, matching exam versions, evidence locators, and preview assets. The XML export contains 23 questions. The GIFT export contains all 23 question identifiers. The public page, catalog, and export label show 23 questions. The public page retains its limited-coverage statement.

## Browser results

Chrome loaded the local public page. Existing saved progress showed 18 answered questions and five unseen questions. The setup showed 19 visualization questions, two preparation questions, one modeling question, and one management question. The source version remained April 20, 2026.

A full 23-question exam with one deliberate wrong forecast answer produced 22 of 23 correct (96%). The domain totals were 2 of 2 for preparation, 1 of 1 for modeling, 18 of 19 for visualization, and 1 of 1 for management and security. The missed review showed the selected wrong answer, correct explanation, and all four choice explanations. Focus moved to the results heading. The completion announcement reported 22 of 23 correct.

Retry opened only the forecast question. The correct answer produced 1 of 1 correct (100%). The result had no retry button. New Run followed by reload retained 23 answered questions with a latest score of 100%.

## Limits

This check covers local integration. It does not publish the batch or confirm production deployment. The separate content review provides the factual assessment. No live Power BI model, physical mobile device, Firefox, Safari, screen reader, or Moodle import was tested in this batch.
