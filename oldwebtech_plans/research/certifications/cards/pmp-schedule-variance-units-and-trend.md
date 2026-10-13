---
card_id: pmp-schedule-variance-units-and-trend
certification_id: pmp
exam_version: "2026-07"
objective_ids: ["Process Task 8"]
status: verified
reviewed_on: 2026-10-12
---

## Behavior

- When schedule performance is reported with earned value, interpret schedule variance (SV = earned value minus planned value) as a comparison of completed-work value with planned-work value at the status point. Use it to identify a schedule performance signal and examine its trend; if the decision requires elapsed time, use a time-based schedule measure.

## Gotchas

- A negative SV signals that earned progress is below planned progress, but the amount is in value units, not days late. Also, cumulative SV tends toward zero when all planned work is complete, even if completion occurred later than planned. Treating SV as a time delay or as proof that the project finished on time can lead to the wrong corrective decision.

## Verify

- Given EV and PV at successive status dates, calculate SV and explain what its sign and trend indicate about completed-work value versus planned-work value. Then identify why SV alone cannot state the number of days late or confirm on-time completion.

## Applies to

- PMP Process Task 8 (plan and manage schedule). No questions linked yet.

## Evidence

```yaml
evidence:
  - claim: "The July 2026 PMP Process Task 8 includes creating and baselining a project schedule, executing a schedule management plan, and analyzing schedule variation."
    source: "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf?rev=eb2fb918d0f94ccebb8bc1587021f60c"
    locator: "July 2026 Examination Content Outline, PDF page 10, Domain II Process, Task 8, Plan and manage schedule"
    source_version: "2026-07"
    checked_on: 2026-10-12
  - claim: "Under earned value management, schedule variance is EV minus PV; it compares actual progress with planned progress and is expressed in monetary or other value units rather than time units."
    source: "https://www.pmi.org/learning/library/practical-calculation-schedule-variance-7028"
    locator: "Warburton and Kanabar, 'The practical calculation of schedule variance in terms of schedule' (PMI Global Congress 2008), abstract and section 'From EV to TV'"
    source_version: "2008-10-19"
    checked_on: 2026-10-12
  - claim: "At project completion, cumulative EV approaches PV, so cumulative SV tends toward zero; therefore SV alone does not show whether completion occurred late."
    source: "https://www.pmi.org/learning/library/practical-calculation-schedule-variance-7028"
    locator: "Warburton and Kanabar, 'The practical calculation of schedule variance in terms of schedule' (PMI Global Congress 2008), section 'From EV to TV', paragraph beginning 'The assumption that the parameters are independent of time'"
    source_version: "2008-10-19"
    checked_on: 2026-10-12
  - claim: "Reviewing variance and performance-index trends over time helps evaluate project performance and whether corrective actions have changed performance."
    source: "https://www.pmi.org/learning/library/practical-calculation-schedule-variance-7028"
    locator: "Warburton and Kanabar, 'The practical calculation of schedule variance in terms of schedule' (PMI Global Congress 2008), section 'CPI and SPI,' paragraph beginning 'Graphs of the variances and performance indices over time'"
    source_version: "2008-10-19"
    checked_on: 2026-10-12
```

Evidence limit: The ECO establishes the July 2026 exam objective. The cited PMI congress paper is a 2008 technical treatment of earned-value schedule variance, not a current exam guide; this card uses it only for the unit and trend interpretation. It does not prescribe a universal variance threshold or corrective action.
