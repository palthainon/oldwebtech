# PL-300 pilot integration validation

Date: 2026-10-19

PL-300, the Power BI Data Analyst exam, has four questions in this local pilot. The pilot passes `node oldwebtech_plans/research/certifications/pl-300/pilot/validate-pilot.cjs`.

The validator checks the quiz fields, answer indexes, choice explanations, unique identifiers, evidence locators, exam versions, verified card references, and preview assets. Every question references a verified card for the April 20, 2026 exam version. The preview uses the existing quiz engine. Its separate `pl300-pilot` identifier keeps its progress separate from other banks.

The question register retains its original header and 814 rows without a change. It appends four pilot rows. The changes stay in the research directory. No public page, quiz engine, navigation, or deployment file changes.

## Browser results

The Codex in-app browser completed all four questions in exam mode. One deliberate wrong answer on row-level security produced 3 of 4 correct (75%). The domain totals were 2 of 2 for data preparation, 1 of 1 for modeling, and 0 of 1 for management and security. The results omitted the visualization domain because this pilot has no visualization question.

The missed-question review showed the selected wrong answer, the correct explanation, and all four choice explanations. Focus moved to the results heading. The completion announcement reported 3 of 4 correct.

Retry opened only the missed question in practice mode. The correct answer produced 1 of 1 correct (100%). The results had no retry button. New Run followed by reload retained all four answered questions, a latest score of 100%, zero unseen questions, and zero missed questions.

The reloaded preview showed the correct exam title, April 20, 2026 version, four-question count, and official objective link. It showed the Power BI domain ranges without broken punctuation. The preview states its limited scope and unpublished status. Domain weights describe the exam, not the pilot coverage.

## Limits

This integration check does not replace the independent content review. It does not run Power BI Desktop or the Power BI service. It does not test Firefox, Safari, a screen reader, or mobile layout. The four questions do not establish full exam coverage.
