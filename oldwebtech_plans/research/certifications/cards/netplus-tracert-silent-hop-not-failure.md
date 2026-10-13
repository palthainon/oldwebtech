---
card_id: netplus-tracert-silent-hop-not-failure
certification_id: network-plus
exam_version: "N10-009 objectives v4.0"
objective_ids: ["5.5"]
status: verified
reviewed_on: 2026-10-12
---

## Behavior

- On Windows, use `tracert` to identify intermediate routers that return ICMP Time Exceeded messages as probe TTL values increase. If one hop shows only asterisks but later hops or the destination respond, continue analyzing the trace; that silent hop alone does not establish where connectivity failed.

## Defaults or baseline

- Windows `tracert` starts with TTL 1 and raises it for later probes. It displays an asterisk when it receives no matching ICMP reply before the timeout.

## Gotchas

- Treating every asterisk row as a failed router or broken forwarding path can misidentify the fault. A router may forward traffic while not returning the ICMP Time Exceeded message that `tracert` needs to display it.

## Verify

- Read the Windows `tracert` explanation and its example trace: it shows silent intermediate hops followed by a responding destination. In a safe network test, compare the silent row with whether later hops and the destination respond; do not infer an outage from that row alone. No live trace was run for this card.

## Applies to

- CompTIA Network+ N10-009 exam objectives version 4.0, 5.5: selecting command-line network troubleshooting tools, including `traceroute`/`tracert`. No question IDs assigned.

## Evidence

```yaml
evidence:
  - claim: Network+ N10-009 objective 5.5 includes traceroute or tracert as a command-line tool for troubleshooting
    source: https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-network-n10-009-exam-objectives-(4-0)-(1).pdf?sfvrsn=f31cc6c4_4
    locator: "PDF page 15, 5.0 Network Troubleshooting, objective 5.5, Software tools > Command line"
    source_version: CompTIA Network+ N10-009 Certification Exam Objectives, version 4.0
    checked_on: 2026-10-12
  - claim: Windows tracert sends ICMP echo probes with increasing TTL and derives the visible path from ICMP Time Exceeded replies from intermediate routers and an Echo Reply from the destination
    source: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tracert
    locator: "tracert, introductory paragraphs before Syntax"
    source_version: Microsoft Learn tracert reference, last updated 2024-11-01
    checked_on: 2026-10-12
  - claim: A router can omit the ICMP Time Exceeded reply and appear as asterisks even though later hops or the destination respond
    source: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tracert
    locator: "tracert, introductory paragraph beginning 'The path is determined'; Examples, trace to www.microsoft.com, hops 14–17"
    source_version: Microsoft Learn tracert reference, last updated 2024-11-01
    checked_on: 2026-10-12
  - claim: An asterisk represents no matching ICMP reply within the configured wait time
    source: https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tracert
    locator: "Syntax > Parameters > /w <timeout>"
    source_version: Microsoft Learn tracert reference, last updated 2024-11-01
    checked_on: 2026-10-12
```
