export interface Environment {
    isProduction: boolean,
    gitHubRedirectUri: string, 
    gitHubClientId: string,
    gitHubState: string,
    azureFunctionHostKey: string,
    ffAzureFunctionHostKey: boolean
}