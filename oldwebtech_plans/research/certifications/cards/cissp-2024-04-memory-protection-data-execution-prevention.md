---
card_id: cissp-2024-04-memory-protection-data-execution-prevention
certification_id: cissp
exam_version: "2024-04"
objective_ids: ["3.4"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- When a system's security requirement is to stop an attacker from executing code placed in data-only memory, select memory protection such as data execution prevention (DEP). Prefer a hardware-enforced mechanism where the platform supports it; NIST describes hardware enforcement as stronger than software enforcement.

## Defaults or baseline

- Memory protection is a system capability that addresses unauthorized code execution in memory locations designated as non-executable or otherwise prohibited. It complements other safeguards; this card does not imply that DEP prevents every memory-corruption exploit.

## Gotchas

- Treating DEP as a complete defense against every memory-related attack overstates the control: SI-16 specifically addresses preventing unauthorized code execution from non-executable or prohibited memory locations, not every exploit technique or weakness.

## Verify

- In NIST SP 800-53 Rev. 5.1, inspect control SI-16, Memory Protection, on PDF page 366 (printed page 348). Check its discussion of attacks targeting non-executable or prohibited memory and its comparison of hardware- and software-enforced DEP. NIST's Release 5.2.0 change summary does not list SI-16 among changed controls. For exam mapping, consult the ISC2 CISSP outline, Domain 3, objective 3.4.

## Applies to

- CISSP Domain 3, objective 3.4, security capabilities of information systems. Focuses on memory protection and DEP. No questions linked yet.

## Evidence

```yaml
evidence:
  - claim: "The CISSP 2024 outline includes memory protection among examples of information-system security capabilities in objective 3.4."
    source: "https://edge.sitecorecloud.io/internationf173-xmc4e73-prodbc0f-9660/media/Project/ISC2/Main/Media/documents/exam-outlines/CISSP-Exam-Outline-April-2024-English.pdf"
    locator: "PDF page 7 (printed page 7), Domain 3, objective 3.4"
    source_version: "Effective 2024-04-15"
    checked_on: 2026-10-13
  - claim: "NIST SI-16 addresses protection against unauthorized code execution in non-executable or prohibited memory locations and identifies data execution prevention as a memory-protection control."
    source: "https://csrc.nist.gov/CSRC/media/Projects/risk-management/800-53%20Downloads/800-53r5/SP_800-53_v5_1-derived-OSCAL.pdf"
    locator: "Control SI-16, Memory Protection, discussion; PDF page 366 (printed page 348)"
    source_version: "NIST SP 800-53 Rev. 5.1, derived OSCAL publication"
    checked_on: 2026-10-13
  - claim: "SI-16 has a defined scope: preventing unauthorized code execution from non-executable or prohibited memory locations; it does not assert that the control defeats every memory-related attack."
    source: "https://csrc.nist.gov/CSRC/media/Projects/risk-management/800-53%20Downloads/800-53r5/SP_800-53_v5_1-derived-OSCAL.pdf"
    locator: "Control SI-16, Memory Protection, control statement and discussion; PDF page 366 (printed page 348)"
    source_version: "NIST SP 800-53 Rev. 5.1, derived OSCAL publication"
    checked_on: 2026-10-13
  - claim: "NIST says DEP may be hardware- or software-enforced and that hardware enforcement provides greater strength of mechanism."
    source: "https://csrc.nist.gov/CSRC/media/Projects/risk-management/800-53%20Downloads/800-53r5/SP_800-53_v5_1-derived-OSCAL.pdf"
    locator: "Control SI-16, Memory Protection, discussion; PDF page 366 (printed page 348)"
    source_version: "NIST SP 800-53 Rev. 5.1, derived OSCAL publication"
    checked_on: 2026-10-13
  - claim: "NIST's Release 5.2.0 change summary does not list SI-16 among changed controls."
    source: "https://csrc.nist.gov/csrc/media/Projects/risk-management/800-53%20Comment%20Site/SP800-53-r5.2.0-changes.pdf"
    locator: "PDF pages 1-2, Table 1, full list of Release 5.2.0 changes"
    source_version: "NIST SP 800-53 Release 5.2.0 change summary, 2025-08-27"
    checked_on: 2026-10-13
```



