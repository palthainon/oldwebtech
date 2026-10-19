# Certification pilot publication validation

Date: 2026-10-19

AI-901, the Azure AI Fundamentals exam, has 14 pilot questions. PL-300, the Power BI Data Analyst exam, has four pilot questions. Both public pages load from the local release checkout with the existing quiz engine.

## Public page checks

Chrome loads `certs/ai901-pilot.html` and `certs/pl300-pilot.html`. Each page shows its question count, source version, official objective link, domain weights, and limited coverage. Each page states that scores do not predict an exam result. The catalog shows both pilot links with the same limits. The AI-901 catalog link opens the correct page. The pilot pages link to each other.

At a 390 by 844 viewport, both setup pages and the catalog have no horizontal overflow. The AI-901 answer screen grades a correct answer and shows each choice explanation. The PL-300 public page completes a four-question exam with one deliberate wrong answer. It reports 3 of 4 correct (75%). Its domain totals are 2 of 2 for preparation, 1 of 1 for modeling, and 0 of 1 for management and security. The missed review shows the selected answer and all four explanations. The results heading receives focus. The results page has no horizontal overflow. The viewport override was reset after the check.

## Release artifact checks

The site staging script succeeds with a fresh destination under the ignored `.site-dist` directory. The artifact includes both public pages, both public banks, the catalog, the quiz engine, quiz styles, and export code. It excludes the research directory, tickets, repository metadata, backend source, and all PDF files. The existing public `pdf` directory contains browser tools, not research PDFs.

The export catalog contains ten banks. The XML builder produces 14 AI-901 questions and four PL-300 questions. The GIFT builder includes every pilot question identifier. The catalog shows download buttons for both pilots and all ten banks.

## Limits

The local checks above validate publication files. Production confirmation follows below. The prior independent reviews remain the evidence for question accuracy. The browser screenshot tool timed out twice. The mobile check therefore covers browser interaction and page width measurements, not visual screenshot review. Firefox, Safari, physical mobile devices, screen readers, and quiz imports into Moodle remain untested.

## Production deployment

On 2026-10-19, [production run 39271749676](https://github.com/palthainon/oldwebtech/actions/runs/39271749676) succeeded after [pull request 48](https://github.com/palthainon/oldwebtech/pull/48) merged at commit `fac5a525`. The orchestrator confirmed HTTP 200 for both public pages and their JavaScript banks:

- [AI-901 pilot](https://oldweb.tech/certs/ai901-pilot.html) and [bank](https://oldweb.tech/certs/data/ai901-pilot.js).
- [PL-300 pilot](https://oldweb.tech/certs/pl300-pilot.html) and [bank](https://oldweb.tech/certs/data/pl300-pilot.js).

The 18 pilot questions now have published status. The question text, answers, explanations, evidence, and independent review fingerprints remain unchanged.
