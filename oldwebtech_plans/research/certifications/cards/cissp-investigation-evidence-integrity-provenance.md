---
card_id: cissp-investigation-evidence-integrity-provenance
certification_id: cissp
exam_version: "2024-04"
objective_ids: ["7.1"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- During an incident investigation, collect relevant incident data and metadata while preserving their integrity and provenance. Record investigative actions and protect the records from unauthorized access or alteration.
- Follow the organization's evidence-preservation procedures and retention policies. Consider whether prosecution is possible and the cost of keeping data and the tools needed to access it later.

## Defaults or baseline

- Collected incident data is evidence even when the incident does not require formal evidence gathering or chain-of-custody procedures. NIST says those formal procedures may not be used for every incident.

## Gotchas

- Assuming every incident requires formal chain-of-custody procedures overstates NIST guidance; assuming incident data is not evidence when formal handling is not planned risks losing useful investigative material. Preserve integrity and provenance under organizational procedures, and determine whether formal chain of custody applies to the case.

## Verify

- Read NIST SP 800-61 Rev. 3, Section 3.2, Table 3, RS.AN-06 and RS.AN-07. Check the separation between preserving investigation-record integrity/provenance and using formal evidence-gathering and chain-of-custody procedures only when appropriate.

## Applies to

- CISSP Domain 7, objective 7.1, investigations. This card focuses on incident data and documentation handling. No questions linked yet.

## Evidence

```yaml
evidence:
  - claim: "The CISSP 2024-04 outline places evidence collection and handling, reporting and documentation, investigative techniques, digital forensics, and artifacts under objective 7.1."
    source: "https://edge.sitecorecloud.io/internationf173-xmc4e73-prodbc0f-9660/media/Project/ISC2/Main/Media/documents/exam-outlines/CISSP-Exam-Outline-April-2024-English.pdf"
    locator: "PDF page 12, printed page 12, Domain 7, objective 7.1 and listed subtopics"
    source_version: "Effective 2024-04-15"
    checked_on: 2026-10-13
  - claim: "NIST recommends recording actions performed during an investigation and preserving the integrity and provenance of those records; access should be limited to authorized personnel."
    source: "https://doi.org/10.6028/NIST.SP.800-61r3"
    locator: "Section 3.2, Table 3, RS.AN-06 recommendation R1 and note N1, PDF page 37 (printed page 29)"
    source_version: "NIST SP 800-61 Rev. 3, final, April 2025"
    checked_on: 2026-10-13
  - claim: "NIST recommends collecting and retaining incident evidence under organizational evidence-preservation procedures and retention policies, considering possible prosecution and the cost of retaining data and future access tools."
    source: "https://doi.org/10.6028/NIST.SP.800-61r3"
    locator: "Section 3.2, Table 3, RS.AN-07 recommendation R1, PDF page 37 (printed page 29)"
    source_version: "NIST SP 800-61 Rev. 3, final, April 2025"
    checked_on: 2026-10-13
  - claim: "Formal evidence gathering and chain-of-custody procedures may not be used for every incident; incident data collected in those cases is still evidence."
    source: "https://doi.org/10.6028/NIST.SP.800-61r3"
    locator: "Section 3.2, Table 3, RS.AN-07 note N1, PDF page 37 (printed page 29)"
    source_version: "NIST SP 800-61 Rev. 3, final, April 2025"
    checked_on: 2026-10-13
```
