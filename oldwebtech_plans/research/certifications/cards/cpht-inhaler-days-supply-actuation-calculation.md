---
card_id: cpht-inhaler-days-supply-actuation-calculation
certification_id: cpht
exam_version: "PTCE-effective-2026-01-06"
objective_ids: ["4.1"]
status: draft
reviewed_on: 2026-10-14
---

## Behavior

- For an inhaler regimen with a stated number of actuations per day, calculate days' supply as total dispensed actuations divided by prescribed actuations per day. First multiply the number of inhalers dispensed by the labeled actuations or doses per inhaler.

## Defaults or baseline

- Use the prescription's stated regimen and the product package's labeled actuation or dose count. This calculation addresses days' supply only. Billing units can use milliliters, grams, or each.

## Gotchas

- Do not divide by actuations per day before you convert all dispensed inhalers to total actuations. This can give a wrong result when more than one inhaler is dispensed.
- Do not use the billing unit, such as grams or milliliters, as the inhaler dose count for the days' supply calculation.

## Verify

- Check the order's daily actuation count and the package's labeled actuations or doses per inhaler. Then independently recompute total actuations divided by actuations per day. Have a pharmacist or qualified pharmacy technician review any unclear, variable, or as-needed regimen. Confirm the applicable billing workflow before operational use.

## Applies to

- PTCE 2026 Order Entry and Processing, objective 4.1 (formulas and calculations for days' supply).

## Evidence

```yaml
evidence:
  - claim: PTCE objective 4.1 covers formulas and calculations, including days' supply
    source: oldwebtech_plans/research/certifications/cph-t/ptcb-ptce-content-outline-effective-2026.pdf
    locator: PDF page 2, Order Entry and Processing, objective 4.1
    source_version: PTCE Content Outline v1.4, effective January 6, 2026 (document dated August 2024)
    checked_on: 2026-10-14
  - claim: The 2026 PTCB CPhT Knowledge Reference lists PTCE objective 4.1 as calculation-based knowledge for days' supply, quantity, dose, concentration, and dilutions
    source: https://ptcb.org/wp-content/uploads/2025/05/cpht-knowledge-reference.pdf
    locator: PDF page 5, Order Entry and Processing, objective 4.1
    source_version: 2026 PTCB Certified Pharmacy Technician (CPhT) Knowledge Reference, © PTCB 2024
    checked_on: 2026-10-14
  - claim: inhaler days' supply can be calculated from total actuations dispensed divided by daily actuations; multiply actuations per inhaler by inhalers dispensed first
    source: https://www.cms.gov/sites/default/files/repo-new/48/Pharmacy%20Self-Auditing%20JobAid%20OtherDosageForms.pdf
    locator: PDF page 2, Dosage Calculations > Inhaled Products; total actuations or doses equal actuations or doses per inhaler multiplied by inhalers dispensed, then divided by daily actuations or doses
    source_version: CMS Pharmacy Auditing and Dispensing Job Aid, Billing Other Dosage Forms (2015)
    checked_on: 2026-10-14
  - claim: medication-package quantity units used for billing may differ from the count of inhaled doses, so dosage-form-specific billing units should not be conflated with dose count
    source: https://www.cms.gov/sites/default/files/repo-new/48/Pharmacy%20Self-Auditing%20JobAid%20OtherDosageForms.pdf
    locator: PDF pages 3-6, Table 1, Inhaled Products; examples distinguish inhaler actuations or doses from correctly billed grams or each/canister
    source_version: CMS Pharmacy Auditing and Dispensing Job Aid, Billing Other Dosage Forms
    checked_on: 2026-10-14
```

**Review note:** Draft calculation card; pharmacist or qualified pharmacy technician review is required before operational use or question development, especially for variable/PRN regimens and payer-specific days'-supply conventions.

