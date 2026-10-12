---
card_id: cissp-govern-risk-context
certification_id: cissp
exam_version: "2024-04"
objective_ids: ["1.3"]
status: verified
reviewed_on: 2026-10-12
---

# Behavior

- In NIST CSF 2.0, Govern establishes the organization's cybersecurity risk strategy, expectations, and policy.
- That context informs how the organization prioritizes outcomes in Identify, Protect, Detect, Respond, and Recover.

# Gotchas

- Treating Govern as a final audit step leaves the other functions without a stated risk strategy or decision authority. CSF functions are continuous outcomes, not sequential project phases.

# Verify

- Read the Govern function description in NIST CSF 2.0 and compare it with the six-function overview. Check that the scenario concerns governance and risk decisions rather than a particular control implementation.

# Applies to

- CISSP domain 1, objective 1.3 (security governance principles). No questions linked yet.

# Evidence

```yaml
evidence:
  - claim: "Govern establishes and monitors risk strategy, expectations, and policy and informs prioritization of the other functions."
    source: "mycode_plans/research/certifications/cissp/nist-csf-2.0.pdf"
    locator: "NIST CSWP 29, PDF page 8, Govern function description"
    source_version: "CSF 2.0 (2024-02-26)"
    checked_on: 2026-10-12
  - claim: "The six CSF functions are continuous outcomes, not sequential project phases."
    source: "https://www.nist.gov/cyberframework/faqs"
    locator: "Framework Components / What is the Framework Core?"
    source_version: "CSF 2.0"
    checked_on: 2026-10-12
```
