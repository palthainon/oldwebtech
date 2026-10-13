---
card_id: netplus-apipa-link-local-scope
certification_id: network-plus
exam_version: "N10-009 objectives v4.0"
objective_ids: ["1.7"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- When a workstation reports an IPv4 address in `169.254.0.0/16`, treat it as an IPv4 link-local address. Check whether the host obtained its expected routable configuration (for example, whether DHCP is available on that link); traffic using the link-local address is limited to the same physical or logical link and cannot be forwarded to another network.

## Defaults or baseline

- IPv4 link-local autoconfiguration uses the `169.254/16` prefix when stable, routable address configuration is unavailable. Hosts can use it to communicate locally while configuration is unavailable.

## Gotchas

- A `169.254/16` address is not an ordinary private subnet address that can be made reachable through a router. Do not conclude from the address alone that the DHCP server itself is faulty: the address suggests checking routable configuration on that interface, while the cause still needs to be isolated.

## Verify

- Compare the host's address with the IPv4 link-local range, then check its DHCP/configuration path and whether the intended peer is on the same link. RFC 3927 Sections 1 and 2.7 define the address's local scope and forwarding behavior. No live host or DHCP test was run for this card.

## Applies to

- CompTIA Network+ N10-009 exam objectives version 4.0, objective 1.7: use appropriate IPv4 network addressing, including APIPA. No question IDs assigned.

## Evidence

```yaml
evidence:
  - claim: Network+ N10-009 objective 1.7 covers using appropriate IPv4 network addressing and lists APIPA among the address types.
    source: https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-network-n10-009-exam-objectives-(4-0)-(1).pdf?sfvrsn=f31cc6c4_4
    locator: "PDF page 6, section 1.0 Networking Concepts, objective 1.7, Public vs. private bullet (APIPA)"
    source_version: CompTIA Network+ N10-009 Certification Exam Objectives, version 4.0
    checked_on: 2026-10-13
  - claim: An IPv4 link-local host may use an address from 169.254/16 when other address configuration is unavailable; that range is for communication on the same physical or logical link, not with devices off-link.
    source: https://www.rfc-editor.org/rfc/rfc3927.html
    locator: "RFC 3927, Sections 1 and 1.9"
    source_version: RFC 3927, May 2005 (Standards Track)
    checked_on: 2026-10-13
  - claim: Routers must not forward packets with IPv4 link-local source or destination addresses, so such an address cannot supply routed connectivity to another network.
    source: https://www.rfc-editor.org/rfc/rfc3927.html
    locator: "RFC 3927, Section 2.7, Link-Local Packets Are Not Forwarded"
    source_version: RFC 3927, May 2005 (Standards Track)
    checked_on: 2026-10-13
  - claim: A 169.254/16 observation alone does not identify DHCP-server failure as the cause; RFC 3927 permits link-local assignment when an interface has no operable routable address, and says this assignment is based on interface state and independent of DHCP.
    source: https://www.rfc-editor.org/rfc/rfc3927.html
    locator: "RFC 3927, Section 1.9, When to configure an IPv4 Link-Local address"
    source_version: RFC 3927, May 2005 (Standards Track)
    checked_on: 2026-10-13
```
