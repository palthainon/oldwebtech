---
card_id: cissp-2024-04-bia-dependency-prioritization
certification_id: cissp
exam_version: "2024-04"
objective_ids: ["1.7"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- When identifying business continuity requirements, trace a mission-critical service to the information assets and infrastructure it depends on, then assess and prioritize those dependencies by the harm their loss could cause to the mission. Include an upstream component when its failure can interrupt a critical business service.

## Defaults or baseline

- Treat dependency identification as part of understanding asset criticality for continuity and risk prioritization. A component's business importance can derive from the service it enables, even when that component is not itself the visible business application.

## Gotchas

- Prioritizing only the visible application can omit infrastructure whose loss interrupts the business function. Dependency mapping informs impact and prioritization; it does not, by itself, prescribe a recovery sequence, recovery-time target, or technical architecture.

## Verify

- In NIST IR 8286D-upd1, read Section 2.5 for criticality and asset interdependencies, then Section 2.6 for how a BIA records interdependencies. Confirm the example linking a network router's importance to the vital sales website it enables. For exam mapping, consult the current ISC2 CISSP outline, Domain 1 objective 1.7 and its BIA and external-dependencies examples.

## Applies to

- CISSP Domain 1, objective 1.7, Business Continuity requirements. This card covers dependency identification and impact-based prioritization in BIA. It does not establish specific business impact analysis procedures, recovery objectives, recovery sequencing, or control requirements for every organization. No questions linked yet.

## Evidence

```yaml
evidence:
  - claim: "The current CISSP outline places identifying, analyzing, assessing, prioritizing, and implementing business continuity requirements in Domain 1 objective 1.7, and names BIA and external dependencies as examples."
    source: "https://edge.sitecorecloud.io/internationf173-xmc4e73-prodbc0f-9660/media/Project/ISC2/Main/Media/documents/exam-outlines/CISSP-Exam-Outline-April-2024-English.pdf"
    locator: "Domain 1, objective 1.7, PDF page 4 (printed page 4); outline effective April 15, 2024"
    source_version: "CISSP exam outline effective 2024-04-15; checked 2026-10-13"
    checked_on: 2026-10-13
  - claim: "NIST describes a business impact analysis as evaluating potential impacts from loss or degradation of information assets; assessment of asset criticality or resource dependencies identifies and prioritizes assets supporting critical missions."
    source: "https://doi.org/10.6028/NIST.IR.8286D-upd1"
    locator: "Executive Summary, PDF page 8 (printed page 1); Section 1, PDF page 11 (printed page 4)"
    source_version: "NIST IR 8286D-upd1, final, February 2025"
    checked_on: 2026-10-13
  - claim: "For continuity and risk prioritization, NIST says criticality should consider IT systems and asset interdependencies; it illustrates that a network router may have significant enterprise importance because it enables a vital sales website."
    source: "https://doi.org/10.6028/NIST.IR.8286D-upd1"
    locator: "Section 2.5, PDF page 20 (printed page 13); Section 2.6, PDF page 20 (printed page 13)"
    source_version: "NIST IR 8286D-upd1, final, February 2025"
    checked_on: 2026-10-13
```


