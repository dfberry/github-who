import { logInit } from './logging';
import { Logger } from '@azure/functions';

export type Environment = {
  isProduction: boolean;
  environmentType: EnvironmentType,
  testEnvironment: EnvironmentTest,
  appSettings: AppSettings
};

export type EnvironmentType = 'Production' | 'Test' | 'Development';
export type EnvironmentTest = {
  storageSettings: EnvironmentStorage,
  gitHubPersonalAccessToken: string,
  localTestFilesDirectory: string
}
export type EnvironmentStorage = {
  azureStorageConnectionString: string,
  azureStorageContainerName: string,
}
export type AppSettings = {
  gitHubRedirectUri: string;
  gitHubClientId: string;
  azureApplicationInsightsInstrumentationKey: string;
  log: (string) => void
}

export const getEnvironment = (log=undefined):Environment => {

  let environmentType: EnvironmentType;
  let isProduction: boolean;
  let testEnvironment: EnvironmentTest;

  // Prod, test, or dev
  if(process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().includes('prod')){
    environmentType='Production';
    isProduction=true;
  } else if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase().includes('test')) {
    environmentType='Test';
    isProduction=false;
    testEnvironment = getTestEnvironment();
  } else {
    environmentType='Development';
    isProduction=false;
    testEnvironment = getTestEnvironment();
  }

  const appSettings = getAppSettings(environmentType, log);

  let environment: Environment = {
    appSettings,
    testEnvironment,
    environmentType,
    isProduction
  };
  
  return environment;

};
const getAppSettings = (environmentType: EnvironmentType, log: Logger):AppSettings =>{
  // empty redirect means SWA proxies to API
  const gitHubRedirectUri: string = (environmentType=='Production')
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

  // Required in production
  const azureApplicationInsightsInstrumentationKey =
    process.env.APPINSIGHTS_INSTRUMENTATIONKEY;

  // Optional
  const logMessagePrefix = process.env.LOG_MESSAGE_PREFIX;

  const appLog = getLogEnvironment(azureApplicationInsightsInstrumentationKey, log, logMessagePrefix);

  return {
    gitHubRedirectUri,
    gitHubClientId,
    azureApplicationInsightsInstrumentationKey,
    log: appLog
  };
}
const getTestEnvironment = ():EnvironmentTest =>{

  // Required
  const azureStorageConnectionString = process.env.TEST_STORAGE_CONNECTIONSTRING;
  if (!azureStorageConnectionString) {
    throw new Error("State: expect azureStorageConnectionString but didn't find one");
  }

  // Required
  const azureStorageContainerName = process.env.TEST_STORAGE_CONTAINER;
  if (!azureStorageContainerName) {
    throw new Error("State: expect azureStorageContainerName but didn't find one");
  }

  // Required
  const gitHubPersonalAccessToken = process.env.GITHUB_TEST_PERSON_ACCESS_TOKEN;
  if (!gitHubPersonalAccessToken) {
    throw new Error("State: expect gitHubPersonalAccessToken but didn't find one");
  }

  // Required
  const localTestFilesDirectory = process.env.TEST_LOCAL_FILES;
  if (!localTestFilesDirectory) {
    throw new Error("State: expect localTestFilesDirectory but didn't find one");
  }

  const storageSettings:EnvironmentStorage = {
    azureStorageConnectionString,
    azureStorageContainerName
  };

  return {
    storageSettings,
    gitHubPersonalAccessToken,
    localTestFilesDirectory
  };
}
const getLogEnvironment = (logKey, log, messagePrefix?:string) =>{

  const logMessage = logInit(logKey, log, messagePrefix);
  
  return logMessage;
}
