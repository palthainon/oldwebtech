# Pause alert verification — October 16, 2026

The independent public access alert is deployed. It checks every five minutes because the weekly review did not detect the earlier pause soon enough. See the [alert runbook](../PAUSE-ALERT.md) for operation, limits, recipient handling, and cost.

Deployment `oldweb-mcp-pause-alert-20261016` succeeded. The deployed rule is enabled. The app retains public ingress and serving revision `oldweb-mcp--extended20261010`. No public pause was used for this test.

Validation:

- The Bicep template compiled. The CI workflow now compiles this template.
- The live Resource Graph query returned one visible app with public ingress enabled.
- Synthetic query results passed four predicate cases: public access produces no alert; private ingress, missing ingress, and a missing app produce an alert.
- Azure completed one action-group test notification request. The filtered response reported `state: Complete`. Per-receiver status was unavailable in the selected response fields. Inbox receipt was not verified.
- A real pause and recovery notification were not tested. The live query ran with the operator identity. Automatic evaluation with the alert identity was not independently verified.

The deployment adds one alert rule, one action group, one identity, and two scoped reader assignments. It does not change tools, the runtime image, the $20 pause threshold, or the rule to pause when spend cannot be verified. The synthetic worker remains absent.

The user then requested a limit of two pause emails per day. Azure readback confirmed 12-hour action suppression, stateless operation, and unchanged five-minute checks. This prevents automatic recovery emails from adding notifications. The configured recipient remained unchanged. No additional test email was sent. The 12-hour interval has not elapsed under an actual pause test. See the [Azure rule parameter reference](https://learn.microsoft.com/en-us/azure/templates/microsoft.insights/2023-12-01/scheduledqueryrules) for `muteActionsDuration`.

The user then requested hourly checks. Azure readback confirmed a one-hour evaluation interval and a one-hour query window. The rule remains enabled with 12-hour action suppression. Detection can take up to one hour before processing and delivery delays.
