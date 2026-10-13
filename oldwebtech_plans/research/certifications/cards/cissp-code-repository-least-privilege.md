---
card_id: cissp-code-repository-least-privilege
certification_id: cissp
exam_version: "2024-04"
objective_ids: ["8.2"]
status: verified
reviewed_on: 2026-10-12
---

## Behavior

- When a development team stores source code, executable code, or configuration as code, grant each person or service only the access it needs. Track repository changes to individual accounts so an unauthorized or mistaken change can be identified.

## Defaults or baseline

- Publicly readable source can still require integrity and availability protection. Private code may also require confidentiality protection; choose access controls for the code's intended exposure.

## Gotchas

- A public repository does not imply unrestricted write access. Equating read access with change permission makes it easier for unapproved code changes to reach the development workflow.

## Verify

- Review repository permissions for people, tools, and services; inspect a sample change history for individual attribution. Compare the design with NIST SSDF PS.1.1 and its examples. This card has source review only, not a live repository audit.

## Applies to

- CISSP Domain 8, Software Development Security, objective 8.2 on security controls in software development ecosystems, including code repositories and configuration management. No questions linked yet.

## Evidence

```yaml
evidence:
  - claim: "The current CISSP outline includes objective 8.2 for security controls in software development ecosystems, including code repositories and software configuration management."
    source: "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline"
    locator: "Domains > Domain 8: Software Development Security > 8.2"
    source_version: "CISSP outline effective 2024-04-15; checked 2026-10-12"
    checked_on: 2026-10-12
  - claim: "NIST SSDF PS.1.1 calls for least-privilege access to source, executable, and configuration-as-code for authorized personnel, tools, and services."
    source: "oldwebtech_plans/research/certifications/cissp/nist-sp-800-218.pdf"
    locator: "PDF page 18 (printed page 9), Table 1, Protect Software (PS), PS.1 and PS.1.1"
    source_version: "NIST SP 800-218, SSDF version 1.1, final February 2022; Rev. 1/version 1.2 remains draft as checked 2026-10-12"
    checked_on: 2026-10-12
  - claim: "NIST's PS.1.1 examples use repository version control to attribute changes to an individual account, and distinguish publicly accessible code needing integrity and availability protection from code that also needs confidentiality."
    source: "oldwebtech_plans/research/certifications/cissp/nist-sp-800-218.pdf"
    locator: "PDF page 18 (printed page 9), Table 1, PS.1.1, Examples 1 and 2"
    source_version: "NIST SP 800-218, SSDF version 1.1, final February 2022"
    checked_on: 2026-10-12
```
