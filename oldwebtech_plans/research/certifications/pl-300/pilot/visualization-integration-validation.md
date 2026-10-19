# PL-300 visualization integration validation

Date: 2026-10-19

PL-300, the Power BI Data Analyst exam, has nine questions in the expanded pilot. Five new questions cover visualization. The baseline is commit `a7be12c`, the published four-question pilot.

## Preservation and schema

The original 818 question register rows remain unchanged after Git newline normalization. The register adds five rows. All four original published question objects remain unchanged, including their answers, explanations, evidence, and status.

The pilot validator passes for all nine questions. It checks quiz fields, answer indexes, explanations, unique identifiers, verified card references, matching exam versions, evidence locators, and preview assets. The XML export contains nine questions. The GIFT export contains all nine question identifiers.

## Browser results

Chrome loaded the expanded public page from the local checkout. The page showed nine questions and five visualization questions. It retained the limited-coverage statement, the April 20, 2026 source version, and the official objective link. Existing saved progress showed four answered questions and five unseen questions before the run.

A full nine-question exam with one deliberate wrong bookmark answer produced 8 of 9 correct (89%). The domain totals were 2 of 2 for preparation, 1 of 1 for modeling, 4 of 5 for visualization, and 1 of 1 for management and security. The missed review showed the selected answer, the correct explanation, and all four choice explanations. Focus moved to the results heading. The completion announcement reported 8 of 9 correct.

Retry opened only the bookmark question. The correct answer produced 1 of 1 correct (100%). The result had no retry button. New Run followed by reload retained nine answered questions, a latest score of 100%, zero unseen questions, and zero missed questions.

The writer corrected a footer encoding defect found during the browser check. Reload confirmed the correct footer characters.

## Limits

This check covers local integration. It does not publish the expansion or confirm production deployment. The separate content review provides the factual assessment. No live Power BI model, physical mobile device, Firefox, Safari, screen reader, or Moodle import was tested in this batch.
