param location string = resourceGroup().location
param uniqueSeed string = '${subscription().subscriptionId}-${resourceGroup().name}'
param uniqueSuffix string = 'reddog-${uniqueString(uniqueSeed)}'
param containerAppsEnvName string = 'cae-${uniqueSuffix}'
param logAnalyticsWorkspaceName string = 'log-${uniqueSuffix}'
param appInsightsName string = 'appi-${uniqueSuffix}'
param workloadProfileName string = ''
param workloadProfileType string = ''
param vnetSubnetId string = ''
param vnetInternal bool = false

module containerAppsEnvModule 'modules/capps-env.bicep' = {
  name: '${deployment().name}--containerAppsEnv'
  params: {
    location: location
    vnetSubnetId: vnetSubnetId
    vnetInternal: vnetInternal
    workloadProfileName: workloadProfileName
    workloadProfileType: workloadProfileType
    containerAppsEnvName: containerAppsEnvName
    logAnalyticsWorkspaceName: logAnalyticsWorkspaceName
    appInsightsName: appInsightsName
  }
}

module orderServiceModule 'modules/container-apps/password-service.bicep' = {
  name: '${deployment().name}--auth-service'
  dependsOn: []
  params: {
    location: location
    containerAppsEnvName: containerAppsEnvModule.outputs.name
    workloadProfileName: workloadProfileName
  }
}

output urls array = [
  'UI: https://reddog.${containerAppsEnvModule.outputs.defaultDomain}'
]
