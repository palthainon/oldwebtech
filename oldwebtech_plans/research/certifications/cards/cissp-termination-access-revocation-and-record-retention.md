---
card_id: cissp-termination-access-revocation-and-record-retention
certification_id: cissp
exam_version: "2024-04"
objective_ids: ["1.8"]
status: draft
reviewed_on: 2026-10-13
---

## Behavior

- In a personnel termination process, disable the person's system access within the organization's defined time period, revoke associated authenticators and credentials, retrieve security-related property, and preserve organizational access to information and systems the person controlled.

## Defaults or baseline

- NIST PS-4 leaves the disablement interval to the organization. It does not prescribe one universal deadline.

## Gotchas

- Revoking a person's access does not mean deleting the organizational information they controlled. For a termination for cause, plan timely access actions; NIST notes that an organization may sometimes disable accounts before notifying the person.

## Verify

- Compare ISC2 objective 1.8 with NIST SP 800-53 Rev. 5 PS-4. Check the organization's actual policy and legal or HR process before applying timing or notification steps to a real termination. No operational termination was assessed.

## Applies to

- CISSP outline effective April 15, 2024, Domain 1 objective 1.8. Draft pending qualified HR and security-process review before situational questions about a real termination. No question IDs.

## Evidence

```yaml
evidence:
  - claim: "CISSP objective 1.8 includes personnel onboarding, transfers, and termination processes."
    source: "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline"
    locator: "Domain 1 > 1.8, personnel security policies and procedures"
    source_version: "CISSP outline effective 2024-04-15"
    checked_on: 2026-10-13
  - claim: "PS-4 requires system-access disablement within an organization-defined period and revocation of associated authenticators and credentials."
    source: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf"
    locator: "PS-4 Personnel Termination, control a-b, printed page 224 (PDF page 251; zero-based page 250)"
    source_version: "NIST SP 800-53 Rev. 5, December 2020 update"
    checked_on: 2026-10-13
  - claim: "PS-4 includes retrieval of security-related organizational property and retention of access to organizational information and systems formerly controlled by the terminated person."
    source: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf"
    locator: "PS-4 Personnel Termination, control d-e, printed page 224 (PDF page 251; zero-based page 250)"
    source_version: "NIST SP 800-53 Rev. 5, December 2020 update"
    checked_on: 2026-10-13
  - claim: "For-cause termination calls for timely actions; in some situations, accounts may be disabled before notification."
    source: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r5.pdf"
    locator: "PS-4 Discussion, printed page 225 (PDF page 252; zero-based page 251)"
    source_version: "NIST SP 800-53 Rev. 5, December 2020 update"
    checked_on: 2026-10-13
```
