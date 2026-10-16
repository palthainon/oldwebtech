targetScope = 'resourceGroup'

param location string = 'eastus2'
param appName string = 'oldweb-mcp'
param workspaceName string = 'oldwebmcp-logs'
param enabled bool = true
@secure()
param notificationEmail string

resource app 'Microsoft.App/containerApps@2024-03-01' existing = {
  name: appName
}
resource workspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' existing = {
  name: workspaceName
}
resource identity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: 'oldwebmcp-pause-monitor'
  location: location
}
resource appReader 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(app.id, identity.id, 'pause-reader')
  scope: app
  properties: {
    principalId: identity.properties.principalId
    principalType: 'ServicePrincipal'
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'acdd72a7-3385-48ef-bd42-f606fba81ae7')
  }
}
resource logReader 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(workspace.id, identity.id, 'pause-log-reader')
  scope: workspace
  properties: {
    principalId: identity.properties.principalId
    principalType: 'ServicePrincipal'
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '73c42c96-874c-492b-b04d-ab87d138a893')
  }
}
resource notifications 'Microsoft.Insights/actionGroups@2023-01-01' = {
  name: 'oldwebmcp-pause-notifications'
  location: 'global'
  properties: {
    enabled: true
    groupShortName: 'OldWebMCP'
    armRoleReceivers: []
    emailReceivers: [
      {
        name: 'pilot-owner'
        emailAddress: notificationEmail
        useCommonAlertSchema: true
      }
    ]
  }
}
resource pauseAlert 'Microsoft.Insights/scheduledQueryRules@2023-12-01' = {
  name: 'oldwebmcp-public-access-paused'
  location: location
  kind: 'LogAlert'
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: { '${identity.id}': {} }
  }
  properties: {
    displayName: 'OldWeb MCP public access is paused'
    description: 'Public ingress for all three OldWeb MCP servers is disabled or the app is not visible. Check the cost guard before restoring access. The monthly pause threshold is $20. This alert does not restore access.'
    enabled: enabled
    severity: 1
    evaluationFrequency: 'PT5M'
    windowSize: 'PT5M'
    scopes: [workspace.id]
    autoMitigate: false
    muteActionsDuration: 'PT12H'
    criteria: {
      allOf: [
        {
          query: 'arg("").Resources | where id =~ "${app.id}" | summarize visible=count(), publicEnabled=countif(tobool(properties.configuration.ingress.external) == true) | where visible != 1 or publicEnabled != 1 | project TimeGenerated=now(), visible, publicEnabled'
          timeAggregation: 'Count'
          operator: 'GreaterThan'
          threshold: 0
          failingPeriods: { numberOfEvaluationPeriods: 1, minFailingPeriodsToAlert: 1 }
        }
      ]
    }
    actions: {
      actionGroups: [notifications.id]
      customProperties: {
        app: appName
        runbook: 'https://github.com/palthainon/oldwebtech/blob/main/mcp-experiment/PAUSE-ALERT.md'
        budget: 'Pause at $20 monthly or if spend cannot be verified.'
      }
    }
  }
  dependsOn: [appReader, logReader]
}
output alertId string = pauseAlert.id
output actionGroupId string = notifications.id
output identityId string = identity.id
