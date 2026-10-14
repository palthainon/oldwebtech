---
card_id: cc-vlan-routing-requires-inter-vlan-filter
certification_id: cc
exam_version: "2026-09-01"
objective_ids: ["4.2"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- VLANs separate Layer 2 broadcast domains. If a Layer 3 device routes between two VLANs, apply an access rule or equivalent policy at the routing boundary when traffic between them must be restricted.

## Gotchas

- Separate VLAN membership alone does not guarantee that hosts cannot reach each other after inter-VLAN routing is enabled. A broad route may permit communication; a targeted rule can deny access to one destination while allowing another.

## Verify

- Check ISC2 CC objective 4.2 for network segmentation and Cisco's RV34x routed-VLAN example for the behavior. Its syntax and defaults are device-specific; this card only uses the general traffic decision. No live network test was run.

## Applies to

- ISC2 CC outline effective September 1, 2026, Domain 4 objective 4.2. No question IDs.

## Evidence

```yaml
evidence:
  - claim: "CC objective 4.2 covers network segmentation, including VLANs and firewall zones."
    source: "https://www.isc2.org/certifications/cc/cc-certification-exam-outline"
    locator: "Domain 4 > 4.2, network security architecture > network segmentation"
    source_version: "ISC2 CC outline effective 2026-09-01"
    checked_on: 2026-10-13
  - claim: "VLANs define Layer 2 broadcast domains; inter-VLAN communication needs Layer 3 routing in Cisco's example."
    source: "https://www.cisco.com/c/en/us/support/docs/smb/routers/cisco-rv-series-small-business-routers/1393-Inter-VLAN-Routing-with-Targeted-ACL-Restrictions.html"
    locator: "Introduction, paragraphs 1-4"
    source_version: "Cisco RV34x technical note updated 2019-10-08, software 1.0.03.16"
    checked_on: 2026-10-13
  - claim: "With routing enabled, Cisco's example permits inter-VLAN traffic, then applies a targeted ACL to block VLAN2 from one VLAN1 server while retaining access to another host."
    source: "https://www.cisco.com/c/en/us/support/docs/smb/routers/cisco-rv-series-small-business-routers/1393-Inter-VLAN-Routing-with-Targeted-ACL-Restrictions.html"
    locator: "Topology; Configuration steps 6 and 10-11; Verification bullets"
    source_version: "Cisco RV34x technical note updated 2019-10-08, software 1.0.03.16"
    checked_on: 2026-10-13
```
