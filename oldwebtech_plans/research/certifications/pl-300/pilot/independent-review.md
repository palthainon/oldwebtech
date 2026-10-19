# PL-300 pilot independent review

PL-300 is the Microsoft Power BI analyst exam. The independent next_review agent reviewed all four questions on October 19, 2026. All four questions pass after the scenario and source locator corrections.

The reviewer checked every stem, answer, explanation, and choice rationale against current Microsoft documentation. Each question has one correct answer under its stated conditions. Each question uses a verified card in behavior-card-register.csv. The draft CALCULATE card is excluded.

The [current study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300#skills-measured-as-of-april-20-2026) still uses the April 20, 2026 objectives. Each question matches its stated objective. The domain weights are the midpoints of the guide ranges. They do not describe the question distribution.

## Claim review

Question identifiers use the prefix pl300-pilot-. Answer letters refer to stored choice order.

| Question | Answer | Result and claims checked | Primary source and section |
| --- | --- | --- | --- |
| 001 | B | Pass. Append aligns column names. Column position, first values, and row counts do not define the column match. | [Append queries](https://learn.microsoft.com/en-us/power-query/append-queries#append-two-tables), Append two tables, paragraph after the dialog example |
| 002 | C | Pass. Loaded references execute separately. Disabling staging load does not create a shared stored result. Referenced steps can request data. Caching prevents an assumed fixed request count. | [Referencing Power Query queries](https://learn.microsoft.com/en-us/power-bi/guidance/power-query-referenced-queries#scenario), introduction and Scenario, separate executions and caching note |
| 003 | A | Pass. Separate active date dimensions support simultaneous role filters. Inactive paths do not automatically propagate slicer filters. The alternatives explicitly omit an activating measure. | [Active and inactive relationships](https://learn.microsoft.com/en-us/power-bi/guidance/relationships-active-inactive), opening paragraph, Active relationships, and Refactoring methodology steps 3-4 |
| 004 | D | Pass. Multiple role filters permit the union of rows. They do not require intersection. Assignment order does not override another role. The stem explicitly requires an RLS-enforced consumer. | [RLS guidance](https://learn.microsoft.com/en-us/power-bi/guidance/rls-guidance#create-roles), Create roles, additive filters and union |

RLS means row-level security. The reviewer also checked [Use RLS with workspaces in Power BI](https://learn.microsoft.com/en-us/fabric/security/service-admin-row-level-security#use-rls-with-workspaces-in-power-bi). The question makes no claim about workspace users with edit permission. It makes no privacy or legal decision.

## Originality and duplicate review

The reviewer compared the four stems and identifiers with all 814 existing questions. Those questions comprise 800 legacy items and 14 AI-901 pilot items. No identifier collision or normalized exact stem match exists. Normalization uses lowercase letters, removes punctuation, and collapses spaces.

A token-set Jaccard comparison found a maximum similarity of 0.167 between question 002 and ccna-052. The reviewer read that nearest match. It concerns an Ethernet routing link and has a different answer and objective. The other nearest matches also concern different behaviors. No pilot item duplicates another pilot item.

Question 002 now uses a separate rental scenario with two queries. The author changed the initial three-query example after review. The reviewer confirmed the revised choices and answer. Question 003 now cites the opening paragraph for its inactive-filter claims. No exam dump or publisher practice assessment was used in this review.

## Review boundary

The four questions can move to reviewed. The review does not approve publication. It does not establish full exam coverage. No live Power BI model was tested. Browser behavior and register integrity remain separate integration checks.

Reviewed content fingerprint: SHA-256 `9b6fa7f40402029ba51e44dea21136cb660f2391ca9524347988331e2949f550`. The input is JSON.stringify of the questions in file order after removing each question's status property. A content change requires another review.
