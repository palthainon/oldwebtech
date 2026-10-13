---
card_id: az-900-resource-locks-control-plane-scope
certification_id: az-900
exam_version: "2026-07-20"
objective_ids: ["Describe the purpose of resource locks"]
status: verified
reviewed_on: 2026-10-12
---

## Behavior

- Use an Azure Resource Manager lock to prevent control-plane changes to a subscription, resource group, or resource. A `CanNotDelete` lock allows authorized users to read and modify the resource but blocks deletion; a `ReadOnly` lock blocks updates and deletion. When a storage account must be protected from accidental deletion while configuration changes remain allowed, use `CanNotDelete`.

## Defaults or baseline

- Locks apply to Azure control-plane operations. They do not protect data-plane contents, such as blobs, from being changed or deleted through data-plane operations.

## Gotchas

- A lock on a storage account is not a data-protection control for its blobs. Treating it as one can leave the data exposed to overwrite or deletion; use blob data-protection features such as soft delete for that risk.

## Verify

- In Microsoft Learn, compare “Understand scope of locks” with “Considerations before applying your locks” in the resource-lock article. Then compare the storage-account lock guidance with “Recommended data protection configuration” in the blob soft-delete overview.

## Applies to

- AZ-900 — Describe features and tools in Azure for governance and compliance: Describe the purpose of resource locks.

## Evidence

```yaml
evidence:
  - claim: The AZ-900 skills measured include the objective “Describe the purpose of resource locks” in the Azure management and governance section.
    source: https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900
    locator: Skills measured as of July 20, 2026 > Describe Azure management and governance > Describe features and tools in Azure for governance and compliance
    source_version: AZ-900 study guide, skills measured as of July 20, 2026
    checked_on: 2026-10-12
  - claim: An Azure Resource Manager lock can be applied to a subscription, resource group, or resource; CanNotDelete permits reading and modification but blocks deletion, while ReadOnly blocks update and deletion.
    source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources
    locator: Introduction, paragraphs 1–3; “Understand scope of locks” > control-plane note
    source_version: Microsoft Learn, “Lock your Azure resources to protect your infrastructure,” accessed 2026-10-12
    checked_on: 2026-10-12
  - claim: Azure Resource Manager locks apply to control-plane operations, not data-plane operations; a storage-account lock does not protect blob data from data-plane deletion or modification.
    source: https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources
    locator: “Understand scope of locks” > control-plane/data-plane distinction; “Considerations before applying your locks” > storage account examples
    source_version: Microsoft Learn, “Lock your Azure resources to protect your infrastructure,” accessed 2026-10-12
    checked_on: 2026-10-12
  - claim: A CannotDelete lock allows reading and modifying storage-account configuration but prevents deleting the account; the lock does not protect containers or blobs from deletion or overwrite.
    source: https://learn.microsoft.com/en-us/azure/storage/common/lock-account-resource
    locator: Introduction > two types of Azure Resource Manager resource locks; Caution
    source_version: Microsoft Learn, “Apply an Azure Resource Manager lock to a storage account,” accessed 2026-10-12
    checked_on: 2026-10-12
  - claim: Blob soft delete can restore blobs, snapshots, or versions after accidental deletion or overwrite during a configured retention period; Microsoft recommends it as part of blob data protection.
    source: https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-overview
    locator: Introduction; “Recommended data protection configuration” > Blob soft delete
    source_version: Microsoft Learn, “Soft delete for blobs,” accessed 2026-10-12
    checked_on: 2026-10-12
```
