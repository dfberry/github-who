export interface Environment {
    production: boolean,
    gitHubRedirectUri?: string // Production: empty string, Development: use .env file
}