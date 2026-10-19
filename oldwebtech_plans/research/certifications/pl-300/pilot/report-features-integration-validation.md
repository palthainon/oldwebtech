# PL-300 report feature integration validation

Date: 2026-10-19

PL-300, the Power BI Data Analyst exam, has 13 questions in this local batch. Four new questions cover conditional formatting, report tooltips, sort columns, and synced slicers. The baseline is commit `9530563`, the release record for nine published questions.

## Preservation and schema

The original 823 question register rows remain unchanged after Git newline normalization. The register adds four rows. All nine original question objects remain unchanged with published status. The four new questions have reviewed status after independent approval.

The pilot validator passes for 13 questions. It checks quiz fields, answer indexes, explanations, unique identifiers, verified card references, matching exam versions, evidence locators, and preview assets. The XML export contains 13 questions. The GIFT export contains all 13 question identifiers. The public page, catalog, and export label show 13 questions. The public page retains its limited-coverage statement.

## Browser results

Chrome loaded the local public page. Existing saved progress showed nine answered questions and four unseen questions. The setup showed nine visualization questions, two preparation questions, one modeling question, and one management question. The source version remained April 20, 2026.

A full 13-question exam with one deliberate wrong tooltip answer produced 12 of 13 correct (92%). The domain totals were 2 of 2 for preparation, 1 of 1 for modeling, 8 of 9 for visualization, and 1 of 1 for management and security. The final sorting question used the corrected Intake, Test, Repair sequence. The missed review showed the selected wrong answer, correct explanation, and all four choice explanations. Focus moved to the results heading. The completion announcement reported 12 of 13 correct.

Retry opened only the tooltip question. The correct answer produced 1 of 1 correct (100%). The result had no retry button. New Run followed by reload retained 13 answered questions with a latest score of 100%.

## Limits

This check covers local integration. It does not publish the batch or confirm production deployment. The separate content review provides the factual assessment. No live Power BI model, physical mobile device, Firefox, Safari, screen reader, or Moodle import was tested in this batch.
