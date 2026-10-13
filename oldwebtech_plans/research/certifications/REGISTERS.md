# Certification pipeline registers

The [behavior-card register](behavior-card-register.csv) records one row per proposed or written card. `card_id` is stable. Set `status` to `planned`, `draft`, `verified`, or `stale`; supply `card_path` only after a file exists. `verified` requires a human or agent to check every claim against its cited source, beyond any mechanical quote check.

The [question register](question-register.csv) records one row per question ID. The first 800 rows are the already published banks, marked `published_legacy`; they predate the card workflow and intentionally have empty `card_ids` and `evidence_refs`. New questions must reference at least one verified card, use `draft` then `reviewed` then `published`, and retain their issuer objective and version. A question may cite more than one card using semicolon-separated IDs.

Update both registers as each card or question changes state. Never mark a card `verified` merely because a source PDF was downloaded, and never mark a generated question `reviewed` merely because it passes schema checks. Question content must be original, with an explanation for each choice.

## Repeatable loop

1. Select an uncovered issuer objective from a dated source report. Add a `planned` card row with a stable ID and source references.
2. Draft one narrow card using `CARD-TEMPLATE.md`; set its row to `draft` and fill `card_path`.
3. Check every claim against the cited page or section, its current version, and the source's reuse terms. Set the card to `verified` only after that review.
4. Draft original scenario questions from verified cards. Add one row per question ID with the relevant card IDs and `draft` status.
5. Check the answer key, every choice explanation, objective fit, duplicates, and version-sensitive facts. Set `reviewed`, then `published` only when the bank is actually released.
6. At each pass, count register rows by certification and status. Revisit any card or question marked `stale` after an issuer blueprint or product change.

The two registers are the durable progress record. Source reports are the reading list; downloaded PDFs are local reference copies.

The one-time script `seed-legacy-question-register.mjs` creates the initial 800 question rows from the eight current JS banks. It refuses to overwrite an existing register so later editorial status is preserved.
