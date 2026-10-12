# First-wave other-industry certification source inventory

Reviewed 2026-10-12. Scope: PMP, CAPM, SHRM-CP, and PTCB Certified Pharmacy Technician (CPhT/PTCE). This inventory records exam blueprints and reference material for authoring **original** behavior cards and practice questions. The local PDFs are research copies, not site assets or question banks. Paths below are relative to `mycode_plans/research/certifications/` unless stated otherwise.

## Status at a glance

| Certification | Current exam authority | Locally verified PDFs | Main remaining source gap |
| --- | --- | ---: | --- |
| PMP | PMI July 2026 Examination Content Outline | 2 already held in `pmp/` | Current, openly reusable material on AI, sustainability, and contemporary adaptive/hybrid delivery |
| CAPM | PMI 2023 Examination Content Outline, still reflected by PMI's current certification page | 2 in `capm/`; PMP open textbook may be reused locally without a duplicate copy | Current business analysis guidance beyond a software-oriented requirements text |
| SHRM-CP | SHRM 2026 Body of Applied Skills and Knowledge (BASK) and 2026 Certification Handbook | 3 in `shrm-cp/` | Current U.S. employment-law sources and qualified HR review before question publication |
| CPhT / PTCE | PTCB outline effective January 6, 2026 and 2026 CPhT Knowledge Reference | 3 in `cph-t/` | Current drug-specific labels and federal/state rules; pharmacist or qualified technician review |

All eight newly downloaded files were fetched from the linked publisher/issuer or an identified open-book archive, checked for the `%PDF` signature, hashed with SHA-256, and reopened with `pypdf` to confirm page count and document identity. The existing PMP files had already been checked in its own report. Download failures are listed below; no incomplete or HTML files were kept.

## PMP

The existing [PMP source report](pmp/pmp-source-report.md) covers the [PMI July 2026 exam outline](https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf?rev=eb2fb918d0f94ccebb8bc1587021f60c) and [BCcampus *Project Management – 2nd Edition*](https://collection.bccampus.ca/resource/qG6YTBiy/). Their local PDFs are `pmp/pmi-pmp-exam-content-outline-july-2026.pdf` and `pmp/watt-project-management-2nd-edition.pdf`. No duplicate downloads were made. The PMI outline has People 33%, Process 41%, and Business Environment 26%; the BCcampus book is CC BY 4.0 except where noted and predates the July 2026 changes. PMI's exam outline is copyrighted and is a mapping source, not reusable question prose.

## CAPM

PMI's [current CAPM certification page](https://www.pmi.org/certifications/certified-associate-capm) still lists the same four domains as its [2023 CAPM Examination Content Outline](https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf): Project Management Fundamentals and Core Concepts **36%**, Predictive/Plan-Based Methodologies **17%**, Agile Frameworks/Methodologies **20%**, and Business Analysis Frameworks **27%**. This 2023 outline supersedes an older PMI PDF still indexed online that divides the exam into PMBOK Sixth Edition knowledge areas. Use the 2023 outline for IDs, task mapping, and sampling weights. PMI lists 150 items, of which 15 are unscored; question types can include graphics and scenario media. It is copyrighted by PMI, so link to it and author independent questions.

| Source | Local PDF, verification | Rights and useful coverage |
| --- | --- | --- |
| [PMI CAPM Examination Content Outline](https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/capm-exam-content-outline-english.pdf), 2023 update | `capm/pmi-capm-exam-content-outline-2023.pdf`; 17 pages; 5,133,064 bytes; SHA-256 `64EA8CFFB8448B1F65BA3042B5C62003BFB7EC7680558E23CE9F767A84E1DDDD` | ©2023 PMI, all rights reserved. Primary exam blueprint. No republication of its prose, images, or sample items. |
| [Linker and Brown, *Requirements Engineering: A Modern Approach to the Requirements Engineering Body of Knowledge*](https://jsep.info/index.php/jsep/article/download/18/12), first edition 2021 | `capm/linker-brown-requirements-engineering-2021.pdf`; 140 pages; 1,327,915 bytes; SHA-256 `2AAF9E3798BD3253DCF8BDBBD047AA841D284804AFDBEACE9F54F36617D02E00` | CC BY-SA 4.0; covers stakeholders, elicitation, validation, traceability, backlog, and prioritization. It is software oriented, so use only for transferable concepts and verify any PMI-specific terminology against the outline. |

The existing `pmp/watt-project-management-2nd-edition.pdf` is also a useful general CAPM foundation for initiation, planning, execution, monitoring, and closure. Do not duplicate it under `capm/`. Neither open text should be used as a source of copied exercises or exam questions.

## SHRM-CP

SHRM's [2026 BASK PDF](https://www.shrm.org/content/dam/en/shrm/credentials/shrm-certification/bask/shrm-bask.pdf) is the exam content authority; the [2026 Certification Handbook](https://www.shrm.org/content/dam/en/shrm/credentials/shrm-certification/2026-shrm-certification-handbook.pdf) supplies test composition and weights. The BASK organizes **eight** behavioral competencies under Leadership, Interpersonal, and Business clusters and **14** functional areas under People, Organization, and Workplace domains. The 2026 revision combines earlier inclusion and global-mindset areas and adds AI examples. The BASK has a stray page-9 sentence referring to “nine behavioral competencies,” while its page-8 count and enumerated clusters total eight; map cards to the enumerated 2026 competencies.

The handbook gives Leadership **19%**, Business **17.5%**, Interpersonal **13.5%**, People **19%**, Organization **18%**, and Workplace **13%**. The exam has 134 multiple-choice items: 80 knowledge and 54 situational-judgment items, including 24 unscored field-test items. Roughly half the content concerns behavioral competency clusters. The question-writing plan should include realistic best-action scenarios, not only fact recall.

| Source | Local PDF, verification | Rights and useful coverage |
| --- | --- | --- |
| [SHRM 2026 BASK](https://www.shrm.org/content/dam/en/shrm/credentials/shrm-certification/bask/shrm-bask.pdf) | `shrm-cp/shrm-bask-2026.pdf`; 109 pages; 1,566,251 bytes; SHA-256 `BC7FD739F7822B6F9F1A7901710B99C064716AC603CB4830E3C560E605A71F7E` | SHRM copyrighted exam authority. Use for objective mapping and link to source; write independent explanations and scenarios. |
| [SHRM 2026 Certification Handbook](https://www.shrm.org/content/dam/en/shrm/credentials/shrm-certification/2026-shrm-certification-handbook.pdf) | `shrm-cp/shrm-certification-handbook-2026.pdf`; 31 pages; 1,942,215 bytes; SHA-256 `B69954F5D8F2ECD333CDE57F154A0B97AC2379B898FCD5BA5CEEBD9DF55BEA7D` | SHRM copyrighted exam composition and candidate guidance. Do not seed question generation with SHRM sample questions. |
| [*Beginning Management of Human Resources*, v1.0](https://2012books.lardbucket.org/pdfs/beginning-management-of-human-resources.pdf), preserved by the 2012 Book Archive | `shrm-cp/beginning-management-of-human-resources-2012.pdf`; 559 pages; 28,136,888 bytes; SHA-256 `BD36EA5E7B5B42E680DAC341D973392164A3851D37831D577F4B1C539C41F092` | CC BY-NC-SA 3.0 per the [archive's license page](https://2012books.lardbucket.org/books/beginning-management-of-human-resources/index.html). Background on staffing, development, compensation, performance, labor relations, and safety. Old and noncommercial; do not ingest or adapt into a commercial/AI question product without a rights review. Do not rely on its old legal or regulatory details. |

The linked [SHRM BASK landing page](https://www.shrm.org/credentials/certification/exam-preparation/bask) still contains older 2021 wording; the downloaded 2026 PDF and handbook are the current files checked on this date. U.S. employment-law cards should cite up-to-date agency primary sources, and state-specific rules should be labeled by jurisdiction and review date.

## PTCB CPhT / PTCE

The [PTCE outline](https://ptcb.org/wp-content/uploads/2025/07/PTCE-Content-Outline.pdf) took effect **January 6, 2026**. Domain weights are Medications **35%**, Federal Requirements **18.75%**, Patient Safety and Quality Assurance **23.75%**, and Order Entry and Processing **22.5%**. The [2026 CPhT Knowledge Reference](https://ptcb.org/wp-content/uploads/2025/05/cpht-knowledge-reference.pdf) distinguishes blue PTCE-tested statements from other required/recommended technician knowledge. Use the tested statements as question-objective IDs; keep supplemental knowledge separate. PTCB reports a 90-item exam with 80 scored and 10 unscored questions. State boards define technician scope of practice, so do not frame a federal or general behavior as universally permissible in every state.

| Source | Local PDF, verification | Rights and useful coverage |
| --- | --- | --- |
| [PTCB PTCE Content Outline](https://ptcb.org/wp-content/uploads/2025/07/PTCE-Content-Outline.pdf), effective January 6, 2026 | `cph-t/ptcb-ptce-content-outline-effective-2026.pdf`; 2 pages; 244,437 bytes; SHA-256 `96DA630CC42283C363229F62AE1648DAB35FA7835733CBF917B55F95EBD72CE9` | © PTCB. Primary objective and weight source; do not copy exam items. |
| [PTCB 2026 CPhT Knowledge Reference](https://ptcb.org/wp-content/uploads/2025/05/cpht-knowledge-reference.pdf) | `cph-t/ptcb-cpht-knowledge-reference-2026.pdf`; 8 pages; 214,432 bytes; SHA-256 `D1D12EE70D85F24AB0C360ED91D497470324AAFC74B900FF74FAACC453AC51D5` | © PTCB. Subtopic map and scope distinction; link and independently describe behavior. |
| [WisTech Open / Open RN, *Nursing Pharmacology 2e*](https://wtcs.pressbooks.pub/pharmacology2e/), 2023 | `cph-t/open-rn-nursing-pharmacology-2e.pdf`; 1,041 pages; 152,342,081 bytes; SHA-256 `BE411D845E4EFF514A21C1528DE2C25F029E68CF0CEA2D700D19C7C7337BD3BA`; [publisher PDF endpoint](https://wtcs.pressbooks.pub/pharmacology2e/open/download?type=print_pdf) | CC BY 4.0 except where noted. Background for drug classes, medication effects, and safety. It is a nursing book, not a PTCE-specific source or current drug label; verify medication facts against current FDA labeling and have clinical/pharmacy reviewers approve cards and questions. Do not copy its learning activities. |

For current medication and regulatory behavior, also use [FDA DailyMed-linked labels through the Open RN text](https://dailymed.nlm.nih.gov/dailymed/), [FDA DSCSA information](https://www.fda.gov/drugs/drug-supply-chain-integrity/drug-supply-chain-security-act-dscsa), and the [CDC Vaccine Storage and Handling Toolkit](https://www.cdc.gov/vaccines/hcp/storage-handling/index.html). Their current web pages can be linked for review even where a direct PDF download fails.

## Direct-PDF download exceptions

The first command-line attempts from the workspace sandbox returned DNS errors for all external hosts. Repeating with direct network access succeeded for the eight files above. These further publisher endpoints did not return a usable PDF, so no file was retained:

| Attempt | Outcome | Working fallback |
| --- | --- | --- |
| [University of Minnesota *Human Resource Management* PDF](https://open.lib.umn.edu/humanresourcemanagement/open/download?type=pdf) | HTTP 500 | The separately licensed 2012 Book Archive copy above covers general HR concepts. |
| [Rebus Press *Requirements Engineering* print PDF](https://press.rebus.community/requirementsengineering/open/download?type=print_pdf) | HTTP 500 | [Journal-hosted author PDF](https://jsep.info/index.php/jsep/article/download/18/12) saved above. |
| [OpenStax *Principles of Management* PDF](https://assets.openstax.org/oscms-prodcms/media/documents/PrinciplesofManagement-OP_mGBMvoU.pdf) | HTTP 403 | SHRM BASK plus the archived HR textbook. |
| [CDC Vaccine Storage and Handling Toolkit PDF](https://www.cdc.gov/vaccines/hcp/downloads/storage-handling-toolkit.pdf) | HTTP 403 | [CDC's current July 2026 web toolkit](https://www.cdc.gov/vaccines/hcp/storage-handling/index.html). |

## Source use before behavior-card production

1. Register each exam version and objective ID from the issuer outline before drafting a behavior card. Record source URL, retrieval date, edition/effective date, rights, and local SHA-256 where there is a PDF.
2. Convert source-supported operational rules into original, atomic cards: when it applies, the decision or behavior, important exceptions, and a citation to the issuer or primary authority. Mark uncertain, jurisdiction-dependent, or fast-changing claims for specialist review.
3. Record each approved card ID in the behavior-card registrar. Only then link original question IDs to an approved card and record them in the separate question registrar. Neither registrar should treat these PDFs as a question bank.
