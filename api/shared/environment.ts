type Environment = {
  isProduction: boolean;
  gitHubRedirectUri: string;
  gitHubClientId: string;
  gitHubState: string;
  azureApplicationInsightsInstrumentationKey: string;
};
export const getEnvironment = () => {
  // 'production' or anything else
  const isProduction: boolean =
    process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().includes('prod')
      ? true
      : false;
  console.log(`isProduction = ${isProduction.toString()}`);

  // empty redirect means SWA proxies to API
  const gitHubRedirectUri: string = isProduction
    ? ''
    : process.env.GITHUB_OAUTH_REDIRECT_URI || '';
  if (!gitHubRedirectUri) {
    throw new Error("State: expect GitHub redirect but didn't find one");
  }

  // Required
  const gitHubClientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!gitHubClientId) {
    throw new Error("State: expect GitHub client id but didn't find one");
  }

  // Required
  const gitHubClientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!gitHubClientSecret) {
    throw new Error("State: expect GitHub client secret but didn't find one");
  }

  // Required in production
  const azureApplicationInsightsInstrumentationKey =
    process.env.AZURE_APPLICATIONINSIGHTS_INSTRUMENTATION_KEY;

  return {
    isProduction,
    gitHubRedirectUri,
    gitHubClientId,
    gitHubClientSecret,
    azureApplicationInsightsInstrumentationKey
  };
};
