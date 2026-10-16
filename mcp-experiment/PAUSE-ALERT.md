# Public access alert

`oldwebmcp-public-access-paused`, the public access alert rule, checks Azure Resource Graph every five minutes. It sends email when the app has no public ingress or the app is not visible. The check does not depend on cost guard telemetry.

`oldwebmcp-pause-notifications`, the email action group, sends alerts to the email address from the operator's authenticated Azure account. The address is a secure deployment parameter. Do not commit the address or a parameter file.

The alert is stateful. It sends one notification per incident. Azure resolves the alert after its healthy evaluation period. A later pause can trigger a new alert. Resource Graph updates, rule processing, and email delivery can add delay. The rule checks ingress configuration. It does not check tool results or certificate validity. A query failure can prevent notification.

## Response

1. Check the latest **MCP cost guard and lifecycle** workflow in GitHub Actions.
2. Verify current monthly spend with the cost guard.
3. Keep public access paused if spend is at least $20 or spend cannot be verified.
4. Restore public access only with user authorization and verified spend below $20. Check the custom domain certificate binding after restoration.

The alert does not restore access. The $25 monthly target and the February 15, 2027 pilot end remain unchanged.

## Deployment and cost

Deploy `infra/pause-alert.bicep` after the app and workspace exist. Use a private temporary JSON parameter file with `notificationEmail`. Delete the file after deployment.

```powershell
az deployment group create --resource-group rg-oldweb-mcp-experiment --template-file mcp-experiment/infra/pause-alert.bicep --parameters @<private-parameter-file>
```

`oldwebmcp-pause-monitor`, the alert query identity, has Reader access to the app. It has Log Analytics Reader access to the workspace. It has no write access.

The East US 2 five-minute log alert rate was $1.50 per month on October 16, 2026. Notification charges can also apply. Include these charges in the $25 target. See the [Azure Monitor prices](https://azure.microsoft.com/en-us/pricing/details/monitor/). Delete the alert rule at final pilot retirement to stop its fixed charge.

See the [deployment verification report](reports/PAUSE-ALERT-2026-10-16.md).
