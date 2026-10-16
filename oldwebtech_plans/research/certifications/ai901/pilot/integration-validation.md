# AI-901 pilot integration validation

Date: 2026-10-16

The 14-question pilot passes `node oldwebtech_plans/research/certifications/ai901/pilot/validate-pilot.cjs`.

The validator checks the fields used by `certs/quiz.js`, answer indexes, choice explanations, unique IDs, version agreement, verified card lineage, evidence locators, and local preview assets. It loads the bank as JavaScript in a Node VM.

The duplicate check compares the 14 pilot stems with all 800 legacy stems. It finds no normalized stem duplicates or ID collisions. It reports the nearest legacy stem by token Jaccard similarity for each question. The highest score is 0.209 for `ai901-pilot-003` and `aplus-034`. Manual review confirms different objectives and answers: prompt-agent selection versus PaaS selection. Both use the managed-runtime concept. Token comparison does not prove semantic uniqueness.

Chrome loads `preview.html` with the existing quiz engine. The browser check confirms setup, run start, correct-answer grading, explanations for each choice, next-question navigation, and incorrect-answer grading. The End Run confirmation appears. The browser extension times out when accepting the confirmation. A later state read also times out. The run summary remains untested.

The preview shows the limited scope and unpublished status. It explains that the domain values are midpoints of the issuer ranges. They do not measure pilot coverage. The pilot uses its own browser storage identifier.

To preview, serve the repository root with a local HTTP server. Open `/oldwebtech_plans/research/certifications/ai901/pilot/preview.html`. No public navigation or sitemap entry was added because this artifact is for local review.

Remaining integration check: complete one normal run and confirm the result summary after the browser connection recovers.
