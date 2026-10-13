---
card_id: cissp-logging-event-analysis-before-incident-declaration
certification_id: cissp
exam_version: "2024-04"
objective_ids: ["7.2"]
status: verified
reviewed_on: 2026-10-12
---

## Behavior

- Continuously monitor relevant log events for known malicious or suspicious activity, then analyze potentially adverse events and apply defined incident criteria before declaring an incident.
- Use automated filtering and analysis to reduce a large event stream to material for human review; retain manual review for technologies that automation cannot adequately monitor.

## Gotchas

- An anomaly or indicator is not, by itself, proof that a cybersecurity incident occurred. Prematurely treating every alert as a confirmed incident can misdirect response effort; ignoring an anomaly because it may be benign can also delay detection. Apply the organization's incident criteria to the analyzed activity, including possible false positives.

## Verify

- In NIST SP 800-61 Rev. 3, read Section 3.2, especially the DE (Detect) and DE.AE (Adverse Event Analysis) descriptions and DE.AE-02 recommendations. Trace the progression from continuously monitored log events, through analysis, to an incident declaration that initiates response activities.

## Applies to

- CISSP Domain 7, objective 7.2, conduct logging and monitoring activities. This card addresses analysis of monitored log events and incident determination; it does not prescribe a particular SIEM product or log-retention period. No questions linked yet.

## Evidence

```yaml
evidence:
  - claim: "The CISSP 2024-04 outline places logging and monitoring activities in Domain 7 objective 7.2 and lists SIEM, continuous monitoring and tuning, log management, threat intelligence, and user/entity behavior analytics as examples."
    source: "https://edge.sitecorecloud.io/internationf173-xmc4e73-prodbc0f-9660/media/Project/ISC2/Main/Media/documents/exam-outlines/CISSP-Exam-Outline-April-2024-English.pdf"
    locator: "PDF page 12, printed page 12, Domain 7, objective 7.2 and listed examples"
    source_version: "Effective 2024-04-15"
    checked_on: 2026-10-12
  - claim: "NIST describes Detect as monitoring and analysis used to find and characterize potentially adverse events and thereby find cybersecurity incidents."
    source: "https://doi.org/10.6028/NIST.SP.800-61r3"
    locator: "Section 3.2, Table 3, DE (Detect) notes, PDF page 32 (printed page 24)"
    source_version: "NIST SP 800-61 Rev. 3, final, April 2025"
    checked_on: 2026-10-12
  - claim: "Adverse-event analysis studies data collected through continuous monitoring to find possible attacks and compromises and declares when an incident has occurred to initiate response activities; anomalies can have benign or malicious causes."
    source: "https://doi.org/10.6028/NIST.SP.800-61r3"
    locator: "Section 3.2, Table 3, DE.AE (Adverse Event Analysis) notes N1–N2, PDF page 33 (printed page 25)"
    source_version: "NIST SP 800-61 Rev. 3, final, April 2025"
    checked_on: 2026-10-12
  - claim: "NIST recommends using SIEM/SOAR tools for continuous monitoring of log events for known malicious and suspicious activity and reporting findings; it also recommends regular manual log reviews where automation is insufficient."
    source: "https://doi.org/10.6028/NIST.SP.800-61r3"
    locator: "Section 3.2, Table 3, DE.AE-02 recommendations R1 and R3, PDF page 33 (printed page 25)"
    source_version: "NIST SP 800-61 Rev. 3, final, April 2025"
    checked_on: 2026-10-12
  - claim: "NIST recommends applying defined incident criteria to analyzed activity and considering known false positives before declaring an incident."
    source: "https://doi.org/10.6028/NIST.SP.800-61r3"
    locator: "Section 3.2, Table 3, DE.AE-08 recommendation R1, PDF page 34 (printed page 26)"
    source_version: "NIST SP 800-61 Rev. 3, final, April 2025"
    checked_on: 2026-10-12
```
