---
card_id: az-104-app-service-slot-setting-stays-with-slot
certification_id: az-104
exam_version: "2026-04-17"
objective_ids: ["Create and configure Azure App Service > Configure deployment slots"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- When staging and production use different database connection strings, mark each connection string as a deployment slot setting before swapping the App Service slots. The staged application content can move into production while each slot retains its own connection string.

## Defaults or baseline

- App settings and connection strings normally move with the app during a slot swap unless configured to stick to a slot. Microsoft documents a slot-specific connection string option in the portal and the Azure CLI.

## Gotchas

- Cloning a slot's configuration or deploying code to staging does not make a connection string slot-specific. If an environment-specific string remains swappable, it can follow the staged app into production. Confirm the setting's slot-specific designation and the source/target configuration before the swap.

## Verify

- Read the App Service guide's "Which settings are swapped" and "Make an app setting unswappable" sections, then inspect the swap dialog's Source slot changes and Target slot changes for the intended production target. No live slot swap was run for this card.

## Applies to

- AZ-104 skills effective April 17, 2026: Deploy and manage Azure compute resources > Create and configure Azure App Service > Configure deployment slots. No question IDs yet.

## Evidence

```yaml
evidence:
  - claim: The AZ-104 April 2026 study guide includes configuring App Service deployment slots.
    source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104
    locator: Skills measured as of April 17, 2026 > Deploy and manage Azure compute resources > Create and configure Azure App Service
    source_version: AZ-104 skills effective 2026-04-17; study-guide page updated 2026-03-19
    checked_on: 2026-10-13
  - claim: App settings and connection strings can move in a slot swap, while settings designated as slot-specific remain with the slot.
    source: https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots
    locator: Which settings are swapped, opening paragraph and swapped-settings list
    source_version: Azure App Service documentation, updated 2025-11-28
    checked_on: 2026-10-13
  - claim: A connection string can be marked as a deployment slot setting in the portal or by adding its name to the CLI --slot-settings option.
    source: https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots
    locator: Make an app setting unswappable, portal step 2 and connection-string CLI example
    source_version: Azure App Service documentation, updated 2025-11-28
    checked_on: 2026-10-13
  - claim: The swap dialog identifies source and target configuration changes, and Microsoft says to verify the target production settings before swapping.
    source: https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots
    locator: Swap deployment slots, opening paragraph and portal step 2
    source_version: Azure App Service documentation, updated 2025-11-28
    checked_on: 2026-10-13
```
