---
card_id: az-104-nsg-priority-first-match
certification_id: az-104
exam_version: "2026-04-17"
objective_ids: ["Configure secure access to virtual networks: create and configure NSGs; evaluate effective security rules"]
status: draft
reviewed_on:
---

## Behavior

- Azure evaluates matching network security group rules in ascending priority-number order. A lower number has higher priority, and evaluation stops at the first matching rule.
- When troubleshooting a flow, inspect the effective rules at the actual subnet or network interface scope; a later matching rule cannot reverse the result of an earlier match.

## Defaults or baseline

- NSG rule priorities range from 100 through 4096. Azure's default rules use the lowest precedence, so custom rules are evaluated before them.

## Gotchas

- A larger priority number does not mean a stronger rule. If a broad allow rule has a smaller number than a specific deny rule, the allow may match first and the deny will never be evaluated; this can expose traffic that the administrator expected to block.

## Verify

- Review the “Security rules” section of the Azure NSG overview and inspect effective security rules for the relevant network interface in the Azure portal or with the documented Azure tooling.

## Applies to

- AZ-104 virtual networking: create/configure NSGs and evaluate effective security rules.

## Evidence

```yaml
evidence:
  - claim: NSG rules are processed in ascending priority number and evaluation stops after a match
    source: https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
    locator: Security rules > Priority
    source_version: Microsoft Learn Azure NSG overview, live documentation
    checked_on: 2026-10-12
  - claim: NSG rule priority values range from 100 to 4096 and default rules have the lowest precedence
    source: https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview
    locator: Security rules > Priority
    source_version: Microsoft Learn Azure NSG overview, live documentation
    checked_on: 2026-10-12
  - claim: AZ-104 tests NSG creation/configuration and effective-rule evaluation
    source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104
    locator: Skills measured as of April 17, 2026 > Implement and manage virtual networking > Configure secure access to virtual networks
    source_version: AZ-104 study guide effective April 17, 2026
    checked_on: 2026-10-12
```
