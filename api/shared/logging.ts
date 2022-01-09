import * as appInsights from 'applicationinsights';
let client = undefined;
let contextLog = undefined;
let logPrefix = undefined;

export const logInit = (logKey: string, log, messagePrefix?: string) => {

  // Optional - so check if key is set
  if (
    !logKey ||
    logKey.length === 0
  ) {
    throw new Error("can't find instrumentation key");
  }

  if(messagePrefix){
    logPrefix=messagePrefix;
  }

  appInsights
    .setup(logKey)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(false)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
    .start();

  client = appInsights.defaultClient;

  client.trackTrace({
    message: `${logPrefix}:App Insights ready to use`
  });

  if(log) {
    contextLog = log;
  }

  return logMessage;
};
export const logMessage = (message: string):void=> {
  if(contextLog){
    contextLog(`${logPrefix}:${message}`);
  }
  if (client){
    client.trackTrace({
      message: `${logPrefix}:${message}`
    });
  }
}

