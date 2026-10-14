---
card_id: cissp-termination-access-revocation-and-record-retention
certification_id: cissp
exam_version: "2024-04"
objective_ids: ["1.8"]
status: draft
reviewed_on: 2026-10-14
---

## Behavior

- In a personnel termination process, disable the person's system access within the organization's defined time period, revoke associated authenticators and credentials, retrieve security-related property, and preserve organizational access to information and systems the person controlled.

## Defaults or baseline

- NIST PS-4 leaves the disablement interval to the organization. It does not prescribe one universal deadline.

## Gotchas

- Retaining organizational access to information and systems is not a records-retention schedule. Apply the organization's records, legal-hold, privacy, and HR requirements separately.
- For a termination for cause, plan timely access actions. NIST notes that an organization may sometimes disable accounts before notifying the person.

## Verify

- Compare ISC2 objective 1.8 with NIST SP 800-53 Rev. 5 PS-4. Check the organization's actual policy and legal or HR process before applying timing or notification steps to a real termination. No operational termination was assessed.

## Applies to

- CISSP outline effective April 15, 2024, Domain 1 objective 1.8. Draft pending qualified HR and security-process review before situational questions about a real termination. No question IDs.

## Evidence

```yaml
evidence:
  - claim: "CISSP objective 1.8 includes personnel onboarding, transfers, and termination processes."
    source: "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline"
    locator: "CISSP Certification Exam Outline Summary > Domain 1 > 1.8 > Onboarding, transfers, and termination processes"
    source_version: "CISSP outline effective 2024-04-15"
    checked_on: 2026-10-14
  - claim: "PS-4 requires system-access disablement within an organization-defined period and revocation of associated authenticators and credentials."
    source: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf"
    locator: "PS-4 Personnel Termination, control a-b, printed page 224 (PDF page 251; zero-based page 250)"
    source_version: "NIST SP 800-53 Rev. 5, December 2020 update"
    checked_on: 2026-10-14
  - claim: "PS-4 includes retrieval of security-related organizational property and retention of access to organizational information and systems formerly controlled by the terminated person."
    source: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf"
    locator: "PS-4 Personnel Termination, control d-e, printed page 224 (PDF page 251; zero-based page 250)"
    source_version: "NIST SP 800-53 Rev. 5, December 2020 update"
    checked_on: 2026-10-14
  - claim: "For-cause termination calls for timely actions; in some situations, accounts may be disabled before notification."
    source: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf"
    locator: "PS-4 Discussion, printed page 225 (PDF page 252; zero-based page 251)"
    source_version: "NIST SP 800-53 Rev. 5, December 2020 update"
    checked_on: 2026-10-14
  - claim: "NIST SP 800-53 Release 5.2.0 does not list PS-4 among new, revised, or discussion-updated controls; the Rev. 5 PS-4 requirement remains the applicable source for this card."
    source: "https://csrc.nist.gov/csrc/media/Projects/risk-management/800-53%20Comment%20Site/SP800-53-r5.2.0-changes.pdf"
    locator: "Table 1, PDF pages 1-2: complete list of Release 5.2.0 control and discussion changes"
    source_version: "NIST SP 800-53 Release 5.2.0, August 27, 2025"
    checked_on: 2026-10-14
```
