---
card_id: cissp-2024-04-role-transfer-access-realignment
certification_id: cissp
exam_version: "2024-04"
objective_ids: ["5.5"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- When a person's job changes, use the transfer as a trigger to review the person's existing accounts and privileges against the new role's approved duties. Reassign or remove privileges that no longer fit current business needs, and grant any new access through the organization's authorization process.

## Defaults or baseline

- Account management should be coordinated with personnel transfer processes. Account reviews and the timing of notifications or reviews follow organization-defined procedures.

## Gotchas

- Adding the new role's access while leaving old privileges untouched can preserve access that no longer matches the person's work. A transfer notice is a trigger for review; it does not by itself establish which permissions remain appropriate or require disabling the person's entire account.

## Verify

- In NIST SP 800-53 Rev. 5.1, inspect AC-2, Account Management, especially control elements h, i, j, and l; then inspect AC-6(7), Review of User Privileges. Confirm that transfers or changed need-to-know prompt coordination, account access rests on valid authorization and intended use, accounts are reviewed at an organization-defined frequency, and privileges may be reassigned or removed. For exam mapping, consult the current ISC2 CISSP outline, Domain 5 objective 5.5.

## Applies to

- CISSP Domain 5, objective 5.5, identity and access provisioning lifecycle. This card focuses on an employee role transfer and associated account and privilege review. It does not set universal review periods or prescribe a specific identity-management workflow. No questions linked yet.

## Evidence

```yaml
evidence:
  - claim: "The current CISSP outline maps account access review, provisioning and deprovisioning during transfers, role transitions, privilege escalation, and service account management to objective 5.5."
    source: "https://edge.sitecorecloud.io/internationf173-xmc4e73-prodbc0f-9660/media/Project/ISC2/Main/Media/documents/exam-outlines/CISSP-Exam-Outline-April-2024-English.pdf"
    locator: "PDF page 10, printed page 10, Domain 5, objective 5.5 and listed subtopics"
    source_version: "Effective 2024-04-15; current outline page confirms effective date"
    checked_on: 2026-10-13
  - claim: "NIST SP 800-53 AC-2 calls for notifying account managers when users are transferred or when system usage or need-to-know changes, reviewing accounts for compliance, and aligning account management with personnel transfer processes; system access is based on valid authorization and intended use."
    source: "https://csrc.nist.gov/CSRC/media/Projects/risk-management/800-53%20Downloads/800-53r5/SP_800-53_v5_1-derived-OSCAL.pdf"
    locator: "AC-2 Account Management, control elements h(2)-h(3), i, j, and l; PDF page 20 (printed page 2)"
    source_version: "NIST SP 800-53 Rev. 5.1 derivative control catalog; official NIST publication page checked 2026-10-13"
    checked_on: 2026-10-13
  - claim: "NIST AC-6(7) calls for reviewing assigned privileges at an organization-defined frequency to validate need and reassigning or removing privileges when necessary to reflect organizational mission and business needs."
    source: "https://csrc.nist.gov/CSRC/media/Projects/risk-management/800-53%20Downloads/800-53r5/SP_800-53_v5_1-derived-OSCAL.pdf"
    locator: "AC-6(7), Least Privilege | Review of User Privileges; PDF page 41 (printed page 23)"
    source_version: "NIST SP 800-53 Rev. 5.1 derivative control catalog; official NIST publication page checked 2026-10-13"
    checked_on: 2026-10-13
  - claim: "The NIST SP 800-53 Release 5.2.0 changes are limited to newly added controls, a revision to SI-07(12), and discussion or related-control updates listed by NIST; AC-2 and AC-6(7) are not listed as changed."
    source: "https://csrc.nist.gov/csrc/media/Projects/risk-management/800-53%20Comment%20Site/SP800-53-r5.2.0-changes.pdf"
    locator: "PDF pages 1-2, complete Release 5.2.0 change list"
    source_version: "NIST SP 800-53 Release 5.2.0, 2025-08-27"
    checked_on: 2026-10-13
```
 
