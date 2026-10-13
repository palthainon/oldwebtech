---
card_id: az900-ra-grs-secondary-read-access
certification_id: az-900
exam_version: "2026-07-20"
objective_ids: ["Describe Azure storage services > Describe redundancy options"]
status: verified
reviewed_on: 2026-10-13
---

## Behavior

- For a supported Azure Storage account whose application must read replicated data from the secondary region before account failover, choose read-access geo-redundancy (RA-GRS or RA-GZRS) and design the application to use the secondary read endpoint. Ordinary GRS or GZRS replicates to a secondary region but does not expose that copy for application reads until failover.

## Defaults or baseline

- GRS and GZRS replicate from the primary region to a secondary region asynchronously. With RA-GRS or RA-GZRS enabled, the secondary endpoint is available for reads; it remains a read endpoint until failover changes the secondary into the primary.

## Gotchas

- Geo-replication alone does not guarantee immediate secondary reads or zero data loss. A recent primary write may not yet have reached the secondary if a regional disaster occurs. Read access to the secondary also does not make it a write endpoint before failover.
- Check service support: Azure Files does not support RA-GRS or RA-GZRS, so this choice is not universal across Azure Storage services.

## Verify

- In Microsoft's AZ-900 study guide, locate **Describe Azure storage services > Describe redundancy options**. In the Azure Storage redundancy reference, compare **Redundancy in a secondary region**, **Read access to data in the secondary region**, and **Supported Azure Storage services**. For a Blob Storage scenario, distinguish secondary read access before failover from read/write access after failover; note the asynchronous replication lag.

## Applies to

- AZ-900 skills measured as of July 20, 2026: Describe Azure architecture and services > Describe Azure storage services > Describe redundancy options. No question IDs assigned.

## Evidence

```yaml
evidence:
  - claim: "The AZ-900 July 2026 guide includes describing redundancy options under Azure storage services."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900"
    locator: "Skills measured as of July 20, 2026 > Describe Azure architecture and services > Describe Azure storage services > Describe redundancy options"
    source_version: "Microsoft AZ-900 study guide; skills effective 2026-07-20; page updated 2026-06-22"
    checked_on: 2026-10-13
  - claim: "GRS and GZRS replicate asynchronously to a secondary region; without read-access geo-redundancy, that secondary copy is not directly readable before failover. After failover completes, the new primary supports reads and writes."
    source: "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy"
    locator: "Redundancy in a secondary region, GRS/GZRS comparison and paragraphs on failover; Read access to data in the secondary region, first two paragraphs"
    source_version: "Microsoft Learn, Azure Storage redundancy, updated 2026-08-11"
    checked_on: 2026-10-13
  - claim: "RA-GRS and RA-GZRS permit reads from the secondary, and applications can use the secondary endpoint with the -secondary suffix."
    source: "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy"
    locator: "Read access to data in the secondary region; Design your applications for read access to the secondary"
    source_version: "Microsoft Learn, Azure Storage redundancy, updated 2026-08-11"
    checked_on: 2026-10-13
  - claim: "Asynchronous geo-replication can leave the secondary behind recent primary writes and cause data loss after a primary-region disaster."
    source: "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy"
    locator: "Redundancy in a secondary region, Important note on recovery point objective; Design your applications for read access to the secondary > Plan for data loss"
    source_version: "Microsoft Learn, Azure Storage redundancy, updated 2026-08-11"
    checked_on: 2026-10-13
  - claim: "Azure Files does not support RA-GRS or RA-GZRS."
    source: "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy"
    locator: "Read access to data in the secondary region, Note; Summary of redundancy options > Supported Azure Storage services"
    source_version: "Microsoft Learn, Azure Storage redundancy, updated 2026-08-11"
    checked_on: 2026-10-13
```
