# PL-300 pilot coverage

PL-300, the Power BI analyst exam, has four reviewed pilot questions. Each question uses one verified behavior card. The independent review approved all answers and choice explanations. See [independent-review.md](independent-review.md).

The [Microsoft study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300) uses skills effective April 20, 2026. The author checked the guide and the technical sources on October 19, 2026. Each bank item records its source section.

| Domain | Questions | Behavior |
| --- | ---: | --- |
| Prepare the data | 2 | Append column alignment; reference refresh execution |
| Model the data | 1 | Simultaneous date roles |
| Visualize and analyze the data | 0 | No coverage |
| Manage and secure Power BI | 1 | Additive RLS roles |

RLS means row-level security. Its question assumes a consumer to whom RLS applies. It does not assess a privacy policy or a legal duty.

This pilot does not cover the full exam. Scores do not predict an exam result. The preview shows issuer weight midpoints, not pilot coverage. Four questions cannot estimate domain readiness.

The CALCULATE card remains draft on main. This pilot excludes that card. The pilot leaves most preparation, calculations, performance, reports, workspace management, and governance objectives uncovered. The next content pass should add verified visual-selection and report-interaction cards before adding more questions in the covered domains.

The pilot uses the existing quiz engine and a separate storage identifier. The canonical bank and public page live under `certs/`. The public catalog, navigation, and sitemap include the pilot. No live Power BI model was tested. No publisher practice questions or exam dumps were used.

## Release location

The public page is `certs/pl300-pilot.html`. The canonical bank is `certs/data/pl300-pilot.js`. Questions remain reviewed until deployment succeeds. Research notes and source PDFs stay outside the public staging directory.
