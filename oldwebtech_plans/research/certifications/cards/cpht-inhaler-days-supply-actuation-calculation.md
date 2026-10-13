---
card_id: cpht-inhaler-days-supply-actuation-calculation
certification_id: cpht
exam_version: "PTCE-effective-2026-01-06"
objective_ids: ["4.1"]
status: draft
reviewed_on: 2026-10-12
---

## Behavior

- For a scheduled inhaler regimen with a clear number of actuations per day, calculate estimated days' supply as total dispensed actuations divided by prescribed actuations per day. First multiply the number of inhalers dispensed by the labeled actuations per inhaler.

## Defaults or baseline

- Use the prescription's stated regimen and the product package's labeled dose count. This calculation addresses days' supply only; pharmacy billing units and payer rules are separate.

## Gotchas

- Dividing by doses per day before converting the package count to total actuations can produce a wrong result when more than one inhaler is dispensed.
- Do not substitute the device's package size or billing unit (such as grams or milliliters) for the count of doses when calculating days' supply.

## Verify

- Check the order's daily actuation count and the package's number of doses per inhaler, then independently recompute total actuations ÷ actuations per day. Have a pharmacist or qualified pharmacy technician review any unclear, variable, or as-needed regimen and confirm the applicable billing workflow before operational use.

## Applies to

- PTCE 2026 Order Entry and Processing, objective 4.1 (formulas and calculations for days' supply).

## Evidence

```yaml
evidence:
  - claim: PTCE objective 4.1 covers formulas and calculations, including days' supply
    source: oldwebtech_plans/research/certifications/cph-t/ptcb-ptce-content-outline-effective-2026.pdf
    locator: PDF page 2, Order Entry and Processing, objective 4.1
    source_version: PTCE Content Outline v1.4, effective January 6, 2026 (document dated August 2024)
    checked_on: 2026-10-12
  - claim: inhaler days' supply can be calculated from total actuations dispensed divided by daily actuations; multiply actuations per inhaler by inhalers dispensed first
    source: https://www.cms.gov/sites/default/files/repo-new/48/Pharmacy%20Self-Auditing%20JobAid%20OtherDosageForms.pdf
    locator: Dosage Calculations > Inhaled Products; total actuations are calculated by multiplying actuations per inhaler by inhalers dispensed, then dividing by actuations required daily
    source_version: CMS Pharmacy Auditing and Dispensing Job Aid, Billing Other Dosage Forms (2015)
    checked_on: 2026-10-12
  - claim: medication-package quantity units used for billing may differ from the count of inhaled doses, so dosage-form-specific billing units should not be conflated with dose count
    source: https://www.cms.gov/sites/default/files/repo-new/48/Pharmacy%20Self-Auditing%20JobAid%20OtherDosageForms.pdf
    locator: Table 1, Inhaled Products; examples distinguish inhaler actuations/doses from correctly billed grams or each/canister
    source_version: CMS Pharmacy Auditing and Dispensing Job Aid, Billing Other Dosage Forms
    checked_on: 2026-10-12
```

**Review note:** Draft calculation card; pharmacist or qualified pharmacy technician review is required before operational use or question development, especially for variable/PRN regimens and payer-specific days'-supply conventions.

