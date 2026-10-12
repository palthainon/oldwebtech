---
card_id: cissp-abac-request-time-policy-decision
certification_id: cissp
exam_version: "2024-04"
objective_ids: ["5.4"]
status: verified
reviewed_on: 2026-10-12
---

# Behavior

- When a subject requests an operation on a resource, ABAC evaluates the subject and resource attributes, the requested operation, relevant environment conditions, and the applicable policy to decide whether to allow that request.

# Defaults or baseline

- The applicable policy defines which operations are allowed for the evaluated attribute and context values.

# Gotchas

- Successful authentication does not grant the requested access. Authorization is a separate decision, and a request can still be denied when its attributes or current context do not satisfy policy.

# Verify

- Trace one request through NIST SP 800-162, Section 2.2 and Figure 2 in Section 2.3: identify the requested operation, subject and object attributes, any relevant environment conditions, the policy evaluation, and the resulting decision.

# Applies to

- CISSP Domain 5, objective 5.4 (ABAC authorization mechanisms). No questions linked yet.

# Evidence

```yaml
evidence:
  - claim: "CISSP Domain 5.4 includes ABAC within authorization mechanisms."
    source: "https://www.isc2.org/certifications/cissp/cissp-certification-exam-outline"
    locator: "Domain 5, objective 5.4; outline effective 2024-04-15"
    source_version: "Effective 2024-04-15"
    checked_on: 2026-10-12
  - claim: "ABAC decides an access request by evaluating subject and object attributes, the requested operation, relevant environment conditions, and policy at the request."
    source: "https://doi.org/10.6028/NIST.SP.800-162"
    locator: "Section 2.2, printed pp. 7-8 (PDF pp. 16-17); Section 2.3, Figure 2, printed p. 9 (PDF p. 18)"
    source_version: "SP 800-162, January 2014; includes updates through 2019-08-02"
    checked_on: 2026-10-12
  - claim: "A request is permitted when it satisfies the applicable access policy and denied when it does not."
    source: "https://doi.org/10.6028/NIST.SP.800-162"
    locator: "Section 2, Understanding ABAC, printed p. 4 (PDF p. 14)"
    source_version: "SP 800-162, January 2014; includes updates through 2019-08-02"
    checked_on: 2026-10-12
  - claim: "Authentication verifies use of an identifier, while authorization decides whether a subject may access an object; environment conditions such as time or location can influence authorization at decision time."
    source: "https://doi.org/10.6028/NIST.SP.800-162"
    locator: "Section 1.4, Notes on Terminology, printed pp. 2–3 (PDF pp. 12–13)"
    source_version: "SP 800-162, January 2014; includes updates through 2019-08-02"
    checked_on: 2026-10-12
```
