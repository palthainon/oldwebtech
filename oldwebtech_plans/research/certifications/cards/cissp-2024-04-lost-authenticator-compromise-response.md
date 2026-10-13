---
card_id: cissp-2024-04-lost-authenticator-compromise-response
certification_id: cissp
exam_version: "2024-04"
objective_ids: ["5.2"]
status: verified
reviewed_on: 2026-10-12
---

## Behavior

- In a CSP using NIST SP 800-63B-4, treat a reported lost authenticator as compromised. Promptly suspend, invalidate, or destroy it in the subscriber's account after detecting the compromise.
- If the CSP offers temporary suspension for an authenticator suspected of compromise, reactivation should follow successful authentication with a different, valid unsuspended authenticator and the subscriber's request.

## Defaults or baseline

- NIST says organizations should establish a time limit for promptly handling a detected compromise. The guidance treats a lost authenticator as generally presumed stolen or compromised; waiting for proof of theft is not the baseline.

## Gotchas

- A report that an authenticator is merely missing still calls for compromise handling. Temporary suspension is a possible response to suspected compromise, but reactivation is not automatic: NIST ties it to an authenticated subscriber request using another valid authenticator.

## Verify

- Read NIST SP 800-63B-4, Section 4.3, and distinguish the required response after compromise detection from optional temporary suspension. Then check Section 4.5 for invalidation and its risk-based check of the authenticity of subscriber requests.

## Applies to

- CISSP Domain 5, objective 5.2, identification and authentication strategy, scoped to credential/authenticator management. No questions linked yet.

## Evidence

```yaml
evidence:
  - claim: "The CISSP 2024 outline includes credential management systems within objective 5.2, Design identification and authentication strategy."
    source: "https://edge.sitecorecloud.io/internationf173-xmc4e73-prodbc0f-9660/media/Project/ISC2/Main/Media/documents/exam-outlines/CISSP-Exam-Outline-April-2024-English.pdf"
    locator: "PDF page 10, printed page 10, Domain 5, objective 5.2 and credential-management subtopic"
    source_version: "Effective 2024-04-15"
    checked_on: 2026-10-12
  - claim: "NIST SP 800-63B-4 generally presumes a lost authenticator has been stolen or compromised, and considers damaged or malfunctioning authenticators compromised as a precaution."
    source: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-63b-4.pdf"
    locator: "Section 4.3, Loss, Theft, Damage, and Compromise, printed p. 50 (PDF p. 61)"
    source_version: "Final, July 2025"
    checked_on: 2026-10-12
  - claim: "After detecting compromise, a CSP SHALL promptly suspend, invalidate, or destroy the affected authenticator from the subscriber account; organizations SHOULD establish time limits for this process."
    source: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-63b-4.pdf"
    locator: "Section 4.3, Loss, Theft, Damage, and Compromise, printed p. 50 (PDF p. 61)"
    source_version: "Final, July 2025"
    checked_on: 2026-10-12
  - claim: "When temporary suspension is supported for suspected compromise, NIST says it SHOULD be reversed after the subscriber authenticates using a valid, unsuspended authenticator and requests reactivation."
    source: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-63b-4.pdf"
    locator: "Section 4.3, Loss, Theft, Damage, and Compromise, printed p. 51 (PDF p. 62)"
    source_version: "Final, July 2025"
    checked_on: 2026-10-12
  - claim: "Invalidation removes the binding between an authenticator and a subscriber account; a CSP SHALL promptly invalidate a compromised authenticator and SHALL make a risk-based determination about the authenticity of a subscriber's invalidation request."
    source: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-63b-4.pdf"
    locator: "Section 4.5, Invalidation, printed p. 51 (PDF p. 62)"
    source_version: "Final, July 2025"
    checked_on: 2026-10-12
```
