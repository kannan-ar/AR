param containerAppsEnvName string
param location string
param workloadProfileName string

resource cappsEnv 'Microsoft.App/managedEnvironments@2022-06-01-preview' existing = {
  name: containerAppsEnvName
}

resource orderService 'Microsoft.App/containerApps@2022-11-01-preview' = {
  name: 'auth-service'
  location: location
  properties: {
    managedEnvironmentId: cappsEnv.id
    workloadProfileName: workloadProfileName
    template: {
      containers: [
        {
          name: 'password-service'
          image: 'ghcr.io/azure/reddog-retail-demo/reddog-retail-order-service:latest'
          probes: [
            {
              type: 'startup'
              httpGet: {
                path: '/probes/healthz'
                port: 80
              }
              failureThreshold: 6
              periodSeconds: 10
            }
          ]
        }
      ]
      scale: {
        minReplicas: 0
      }
    }
    configuration: {
      dapr: {
        enabled: true
        appId: 'password-service'
        appPort: 80
        appProtocol: 'http'
      }
      ingress: {
        external: false
        targetPort: 80
      }
    }
  }
}
