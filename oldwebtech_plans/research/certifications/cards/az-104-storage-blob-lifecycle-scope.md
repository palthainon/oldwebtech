---
card_id: az-104-storage-blob-lifecycle-scope
certification_id: az-104
exam_version: "2026-04-17"
objective_ids: ["Configure blob lifecycle management"]
status: verified
reviewed_on: 2026-10-12
---

## Behavior

- When a lifecycle policy is meant to delete a blob that has older versions or snapshots, configure deletion for those previous versions and snapshots as well. Azure does not delete the current version until its associated previous versions and snapshots have been deleted.

## Defaults or baseline

- Lifecycle rules can target current versions, previous versions, and snapshots. The rule must include the applicable object types in its actions; targeting only the current version does not remove its older versions or snapshots.

## Gotchas

- A rule that deletes only current versions can appear to leave an otherwise eligible blob behind because an associated previous version or snapshot still exists. Check versioning and snapshot retention when diagnosing a delete rule that has not removed the current version.

## Verify

- In a test account with blob versioning or snapshots enabled, configure a lifecycle delete action for the current version only, then review the policy-structure guidance for the documented dependency. Extend the policy to include previous versions and snapshots and confirm the required coverage in the rule definition.

## Applies to

- AZ-104, Implement and manage storage: Configure Azure Files and Azure Blob Storage > Configure blob lifecycle management.

## Evidence

```yaml
evidence:
  - claim: Lifecycle management can operate on current versions, previous versions, and snapshots
    source: https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-structure
    locator: Opening description; “Delete action on blobs that have versions and snapshots”
    source_version: Azure Blob Storage lifecycle management policy structure, last updated 2025-12-12; checked live 2026-10-12
    checked_on: 2026-10-12
  - claim: The current version is not deleted until its previous versions and snapshots are deleted, so a delete policy for versioned or snapshotted blobs must include those previous versions and snapshots
    source: https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-structure
    locator: “Delete action on blobs that have versions and snapshots,” paragraphs 1–2
    source_version: Azure Blob Storage lifecycle management policy structure, last updated 2025-12-12; checked live 2026-10-12
    checked_on: 2026-10-12
  - claim: AZ-104 includes configuring blob lifecycle management in the current skills measured
    source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104
    locator: Skills measured as of April 17, 2026 > Implement and manage storage > Configure Azure Files and Azure Blob Storage > Configure blob lifecycle management
    source_version: AZ-104 study guide effective April 17, 2026; checked live 2026-10-12
    checked_on: 2026-10-12
```
