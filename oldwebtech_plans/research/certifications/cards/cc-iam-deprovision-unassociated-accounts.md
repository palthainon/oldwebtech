---
card_id: cc-iam-deprovision-unassociated-accounts
certification_id: cc
exam_version: "2026-09-01"
objective_ids: ["3.1 Understand identity life cycle management"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- When an individual account is no longer associated with its user, route it for disabling under the organization's account-management procedure within its defined time period. For example, after the user's departure is confirmed, act on the account status rather than waiting for the next periodic review.

## Defaults or baseline

- The organization sets the time period for disabling accounts; the cited control does not prescribe a universal number of hours or days.

## Gotchas

- Treating a former user's account only as a future access-review item can leave access available in the meantime. NIST separately calls for periodic account reviews and for timely disabling when an account is no longer associated with a user. This card does not assume that service or group accounts must be tied to a single individual.

## Verify

- Check the September 2026 CC outline, Domain 3 objective 3.1, and NIST SP 800-53 Rev. 5.1 AC-2(j) and AC-2(3), especially the separate review and disabling requirements. NIST's Release 5.2.0 change summary does not list AC-2 as changed. No live directory or offboarding workflow was reviewed.

## Applies to

- ISC2 CC Domain 3, objective 3.1: identity life cycle management, including deprovisioning.

## Evidence

```yaml
evidence:
  - claim: The effective September 2026 CC outline includes identity life cycle management and specifically names deprovisioning under objective 3.1.
    source: https://edge.sitecorecloud.io/internationf173-xmc4e73-prodbc0f-9660/media/Project/ISC2/Main/Media/documents/exam-outlines/2026/EXAMS-CC_Exam_Outline-English-Revised-01-2026-Final.pdf
    locator: PDF page 5 (printed page 5), Domain 3, objective 3.1
    source_version: ISC2 CC Exam Outline effective September 1, 2026
    checked_on: 2026-10-13
  - claim: Accounts no longer associated with a user or individual are to be disabled within an organization-defined period.
    source: https://csrc.nist.gov/CSRC/media/Projects/risk-management/800-53%20Downloads/800-53r5/SP_800-53_v5_1-derived-OSCAL.pdf
    locator: AC-2(3), PDF page 22 (printed page 3), Disable Accounts
    source_version: NIST SP 800-53 Rev. 5, Revision 5.1 derived OSCAL catalog
    checked_on: 2026-10-13
  - claim: The control leaves the disabling time period to the organization rather than specifying a universal duration.
    source: https://csrc.nist.gov/CSRC/media/Projects/risk-management/800-53%20Downloads/800-53r5/SP_800-53_v5_1-derived-OSCAL.pdf
    locator: AC-2(3), PDF page 22 (printed page 3), Disable Accounts
    source_version: NIST SP 800-53 Rev. 5, Revision 5.1 derived OSCAL catalog
    checked_on: 2026-10-13
  - claim: NIST separately requires periodic account review under AC-2(j), so that review does not replace the AC-2(3) disabling condition for a former user's account.
    source: https://csrc.nist.gov/CSRC/media/Projects/risk-management/800-53%20Downloads/800-53r5/SP_800-53_v5_1-derived-OSCAL.pdf
    locator: AC-2(j), PDF page 20 (printed page 2); AC-2(3), PDF page 22 (printed page 3)
    source_version: NIST SP 800-53 Rev. 5, Revision 5.1 derived OSCAL catalog
    checked_on: 2026-10-13
  - claim: NIST Release 5.2.0 does not list AC-2 among its changed controls.
    source: https://csrc.nist.gov/csrc/media/Projects/risk-management/800-53%20Comment%20Site/SP800-53-r5.2.0-changes.pdf
    locator: PDF pages 1-2, Table 1, full list of Release 5.2.0 changes
    source_version: NIST SP 800-53 Release 5.2.0 change summary, 2025-08-27
    checked_on: 2026-10-13
```
