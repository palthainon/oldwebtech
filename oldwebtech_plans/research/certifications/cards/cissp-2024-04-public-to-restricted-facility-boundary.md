---
card_id: cissp-2024-04-public-to-restricted-facility-boundary
certification_id: cissp
exam_version: "2024-04"
objective_ids: ["3.9"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- Where a facility has public and restricted areas, design a controlled transition and enforce physical access authorization at the relevant entry points. Apply the organization's visitor escort and activity controls where its defined circumstances require them.

## Defaults or baseline

- Physical access controls may apply at the facility boundary and at interior points around system components needing supplemental protection. A publicly accessible lobby does not itself authorize entry to restricted work areas.

## Gotchas

- A staffed reception or exterior badge reader does not cover an unguarded route from the public area to a restricted server room. NIST leaves the entry points and circumstances requiring visitor escorts to the organization; its PE-3 language does not impose a universal escort rule.

## Verify

- Read NIST SP 800-53 Rev. 5.1 PE-3 control elements a, c, and d and the Discussion about public-area barriers and interior access points. For exam mapping, see CISSP April 2024 Domain 3 objective 3.9 and its examples. No facility walk-through or access-control test was performed.

## Applies to

- CISSP Domain 3 objective 3.9, site and facility security controls. No question IDs. This is a bounded physical-boundary scenario, not a universal floor plan or mandated device choice.

## Evidence

```yaml
evidence:
  - claim: "The April 2024 CISSP outline includes Domain 3 objective 3.9 and examples of server rooms, data centers, and restricted work-area security."
    source: "https://edge.sitecorecloud.io/internationf173-xmc4e73-prodbc0f-9660/media/Project/ISC2/Main/Media/documents/exam-outlines/CISSP-Exam-Outline-April-2024-English.pdf"
    locator: "Domain 3, objective 3.9, printed page 8 (PDF page 8)"
    source_version: "CISSP exam outline effective 2024-04-15"
    checked_on: 2026-10-13
  - claim: "PE-3 directs organizations to enforce physical access authorization at defined facility entry and exit points, control access to publicly accessible areas, and escort/control visitors in defined circumstances."
    source: "https://csrc.nist.gov/CSRC/media/Projects/risk-management/800-53%20Downloads/800-53r5/SP_800-53_v5_1-derived-OSCAL.pdf"
    locator: "PE-3 control elements a, c, d; printed page 168 (PDF page 187)"
    source_version: "NIST SP 800-53 Rev. 5.1 derived OSCAL catalog"
    checked_on: 2026-10-13
  - claim: "NIST describes barriers between public and non-public areas and says access points can include interior spaces around systems needing supplemental control."
    source: "https://csrc.nist.gov/CSRC/media/Projects/risk-management/800-53%20Downloads/800-53r5/SP_800-53_v5_1-derived-OSCAL.pdf"
    locator: "PE-3 Discussion and PE-3(1) Discussion; printed pages 168-169 (PDF pages 187-188)"
    source_version: "NIST SP 800-53 Rev. 5.1 derived OSCAL catalog"
    checked_on: 2026-10-13
  - claim: "Checking the public-to-restricted transition follows from PE-3's defined entry-point enforcement and public-area controls; it is a scenario application, not a mandated layout."
    source: "https://csrc.nist.gov/CSRC/media/Projects/risk-management/800-53%20Downloads/800-53r5/SP_800-53_v5_1-derived-OSCAL.pdf"
    locator: "PE-3 elements a and c and Discussion; printed page 168 (PDF page 187)"
    source_version: "NIST SP 800-53 Rev. 5.1 derived OSCAL catalog"
    checked_on: 2026-10-13
```
