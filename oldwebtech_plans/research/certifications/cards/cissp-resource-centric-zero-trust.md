---
card_id: cissp-resource-centric-zero-trust
certification_id: cissp
exam_version: "2024-04"
objective_ids: ["3.1"]
status: verified
reviewed_on: 2026-10-12
---

# Behavior

- A zero-trust design makes access decisions for users and devices before establishing a session to an enterprise resource.
- It protects resources directly; network location and ownership alone do not grant implicit trust.

# Gotchas

- Treating an internal network location as sufficient trust can allow a compromised device or account to reach resources without the required access decision.

# Verify

- For a proposed access path, identify the resource and verify that both subject and device authentication and authorization occur before the session is established.

# Applies to

- CISSP Domain 3, objective 3.1 (secure design principles, including zero trust). No questions linked yet.

# Evidence

```yaml
evidence:
  - claim: "Zero trust performs subject and device authentication and authorization before establishing a session to an enterprise resource."
    source: "oldwebtech_plans/research/certifications/cissp/nist-sp-800-207.pdf"
    locator: "NIST SP 800-207, Abstract, PDF page 4 (Roman page ii)"
    source_version: "Final, August 2020"
    checked_on: 2026-10-12
  - claim: "Network location and asset ownership alone do not create implicit trust, and the model focuses protection on resources."
    source: "oldwebtech_plans/research/certifications/cissp/nist-sp-800-207.pdf"
    locator: "NIST SP 800-207, Abstract, PDF page 4 (Roman page ii)"
    source_version: "Final, August 2020"
    checked_on: 2026-10-12
  - claim: "The CISSP objective includes zero trust under secure design principles."
    source: "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline"
    locator: "Domain 3, objective 3.1; effective date April 15, 2024"
    source_version: "Effective 2024-04-15"
    checked_on: 2026-10-12
```
