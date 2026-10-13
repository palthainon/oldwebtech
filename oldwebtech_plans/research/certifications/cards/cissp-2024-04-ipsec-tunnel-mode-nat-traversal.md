---
card_id: cissp-2024-04-ipsec-tunnel-mode-nat-traversal
certification_id: cissp
exam_version: "2024-04"
objective_ids: ["4.1"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- When designing IPsec connectivity between gateways or remote users, or when the connection must cross network address translation (NAT), choose ESP tunnel mode. For direct host-to-host communication on a network without NAT, ESP transport mode can be a suitable lower-overhead option.

## Defaults or baseline

- Tunnel mode wraps the original IP packet in a new packet with an outer IP header for the tunnel endpoints. Transport mode keeps the original IP header and protects the ESP payload. This makes deployment context, especially gateways and NAT traversal, relevant to mode selection.

## Gotchas

- Transport mode is incompatible with NAT in NIST's TCP-checksum example: NAT cannot recalculate a checksum inside the encrypted payload. Tunnel mode leaves an outer header that NAT can rewrite, but NIST also notes other potential tunnel-mode/NAT compatibility issues. The choice is about deployment requirements; tunnel mode is not a universal replacement for transport mode.

## Verify

- In NIST SP 800-77 Rev. 1, read Section 4.1.1, “Tunnel Mode and Transport Mode,” and compare Figures 7 and 8. Confirm the mode use cases and NAT limitations on printed pages 37–38 (PDF pages 54–55). For exam mapping, consult the ISC2 CISSP outline, Domain 4 objective 4.1, especially its secure-protocol and network-architecture examples.

## Applies to

- CISSP Domain 4, objective 4.1, secure network architecture. This card covers an IPsec ESP mode-selection decision only; it does not prescribe algorithms, IKE settings, traffic selectors, or a complete VPN design. No questions linked yet.

## Evidence

```yaml
evidence:
  - claim: "The CISSP 2024 outline includes secure network architecture as Domain 4 objective 4.1, with secure protocols including IPsec among its examples."
    source: "https://edge.sitecorecloud.io/internationf173-xmc4e73-prodbc0f-9660/media/Project/ISC2/Main/Media/documents/exam-outlines/CISSP-Exam-Outline-April-2024-English.pdf"
    locator: "PDF page 9 (printed page 9), Domain 4, objective 4.1; outline effective 2024-04-15"
    source_version: "CISSP Exam Outline effective 2024-04-15"
    checked_on: 2026-10-13
  - claim: "ESP tunnel mode creates a new outer IP header and encapsulates the original packet; it is used for gateway-to-gateway and remote-access VPN deployments and is required when the IPsec connection must traverse NAT."
    source: "https://doi.org/10.6028/NIST.SP.800-77r1"
    locator: "Section 4.1.1, ‘Tunnel Mode and Transport Mode,’ printed page 37 / PDF page 54; Figure 7"
    source_version: "NIST SP 800-77 Rev. 1, final, June 2020"
    checked_on: 2026-10-13
  - claim: "ESP transport mode retains the original IP header, protects the payload, has lower overhead than tunnel mode, is often used for host-to-host deployments without NAT, and is incompatible with NAT as described for TCP checksum handling."
    source: "https://doi.org/10.6028/NIST.SP.800-77r1"
    locator: "Section 4.1.1, ‘Tunnel Mode and Transport Mode,’ printed pages 37–38 / PDF pages 54–55; Figure 8"
    source_version: "NIST SP 800-77 Rev. 1, final, June 2020"
    checked_on: 2026-10-13
```
