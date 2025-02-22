# *nix only
export RG="rg-ar"
export LOCATION="southindia"
export SUB_ID="8eda8c03-f2ab-46ee-bfa1-ad931d726b1f"

# Follow Azure CLI prompts to authenticate to your subscription of choice
az login
az account set --subscription $SUB_ID

# Create resource group
az group create -n $RG -l $LOCATION

# Deploy all infrastructure and reddog apps
az deployment group create -n ar -g $RG -f ./deploy/bicep/main.bicep

# Show outputs for bicep deployment
az deployment group show -n ar -g $RG -o json --query properties.outputs.urls.value