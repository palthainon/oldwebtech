---
card_id: capm-requirements-traceability-validation
certification_id: capm
exam_version: "2023-eco-current-2026-10"
objective_ids: ["Domain 4, Task 3", "Domain 4, Task 6"]
status: draft
reviewed_on:
---

## Behavior

- When checking whether a product is ready for delivery, use the requirements traceability matrix or product backlog to confirm that the agreed requirements have been addressed and that the product meets its acceptance criteria.
- Keep the requirement connected to its delivered feature and acceptance evidence so an omitted requirement is visible before release.

## Defaults or baseline

- A traceability matrix or backlog is the reference named by the CAPM outline for gathering and validating requirements; the exact artifact depends on the delivery approach.

## Gotchas

- A feature being complete does not by itself establish that the product is ready: an unaddressed requirement or unmet acceptance criterion can still block delivery.

## Verify

- Review the requirement against its linked product or backlog item and the applicable acceptance criteria; resolve any uncovered item before declaring readiness.

## Applies to

- CAPM Domain 4, Task 3 (requirements traceability matrix/product backlog) and Task 6 (validate requirements through product delivery).

## Evidence

```yaml
evidence:
  - claim: the CAPM requirements-gathering objective includes explaining a traceability matrix or product backlog
    source: oldwebtech_plans/research/certifications/capm/pmi-capm-exam-content-outline-2023.pdf
    locator: PDF page 11, printed page 10, Domain 4 Task 3
    source_version: PMI CAPM Examination Content Outline, 2023
    checked_on: 2026-10-12
  - claim: product delivery validation uses the traceability matrix or backlog to determine readiness
    source: oldwebtech_plans/research/certifications/capm/pmi-capm-exam-content-outline-2023.pdf
    locator: PDF page 11, printed page 10, Domain 4 Task 6
    source_version: PMI CAPM Examination Content Outline, 2023
    checked_on: 2026-10-12
  - claim: acceptance is a distinct requirements-engineering activity and requirements are validated before acceptance
    source: oldwebtech_plans/research/certifications/capm/linker-brown-requirements-engineering-2021.pdf
    locator: PDF page 13, printed page 5, sections 2.6 Validation and 2.9 Acceptance
    source_version: Linker and Brown, first edition, 2021, CC BY-SA 4.0
    checked_on: 2026-10-12
```
