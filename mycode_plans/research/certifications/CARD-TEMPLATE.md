# Certification behavior card template

One card explains one exam-relevant behavior or decision. Keep it short enough to review as a unit. Write fresh prose from current primary sources; a card is not an exam-outline copy or a textbook summary.

```yaml
---
card_id: pmp-example-area
certification_id: pmp
exam_version: "2026-07"
objective_ids: ["<issuer objective identifier>"]
status: draft # draft | verified | stale
reviewed_on: YYYY-MM-DD
---
```

## Behavior

- State what happens or which decision follows in a realistic scenario.

## Defaults or baseline

- State a real default, expected starting condition, or standard assumption only when the source supports it.

## Gotchas

- Name the plausible misconception and its practical consequence.

## Verify

- Describe the official document section, worked example, or safe lab that confirms the behavior.

## Applies to

- List exam objectives and question IDs that this card supports.

## Evidence

Record one source entry for every substantive claim. Use a local file path and page or a stable publisher URL and section. Exact short quotations are optional and must be confined to sources whose terms permit reuse; otherwise use a locator and an independently written claim. Record the source version and checked date. A mechanical quote match establishes only that the text exists; a reviewer must still confirm that it supports the claim.

```yaml
evidence:
  - claim: "<specific claim in this card>"
    source: "<publisher URL or local research path>"
    locator: "<page, heading, or paragraph>"
    source_version: "<version or date>"
    checked_on: YYYY-MM-DD
```

Keep downloaded PDFs in `mycode_plans/research/certifications/<exam>/`. They are local research copies, excluded from Git and the public site. Do not turn exam dumps, commercial practice questions, or restricted textbook prose into cards or questions.
