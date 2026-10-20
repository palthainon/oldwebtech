---
card_id: pl300-anomaly-sensitivity
certification_id: pl-300
exam_version: "2026-04-20"
objective_ids: ["Visualize and analyze the data > Identify patterns and trends > Detect outliers and anomalies"]
status: verified
reviewed_on: 2026-10-19
---

## Behavior

For a supported line chart with anomaly detection configured, increase sensitivity to flag smaller deviations. Decrease sensitivity to make detection more selective.

## Defaults or baseline

The visual must contain time-series data. Legends, multiple values, and secondary values are unsupported. At least four points are required.

## Gotchas

Higher sensitivity does not mean fewer minor deviations are marked. It makes detection more responsive to deviations.

## Verify

Read the Microsoft sections below. No live Power BI report was tested.

## Applies to

PL-300 skills effective April 20, 2026: Visualize and analyze the data > Identify patterns and trends > Detect outliers and anomalies. No question assigned.

## Evidence

```yaml
evidence:
  - claim: "Increasing sensitivity marks smaller deviations; decreasing it makes detection more selective."
    source: "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-anomaly-detection"
    locator: "Format anomalies"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
  - claim: "Detection requires a time-series line chart with at least four points and no legend, multiple values, or secondary values."
    source: "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-anomaly-detection"
    locator: "Considerations and limitations, first three bullets"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
  - claim: "The April 20, 2026 guide includes this objective."
    source: "https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-300"
    locator: "Skills measured as of April 20, 2026 > Visualize and analyze the data > Identify patterns and trends > Detect outliers and anomalies"
    source_version: "Microsoft Learn live documentation"
    checked_on: "2026-10-19"
```
