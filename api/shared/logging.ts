import * as appInsights from 'applicationinsights';
import { getEnvironment  } from './environment';

let setup = false;
let client = undefined;

export const logInit = () =>{
    const environment = getEnvironment();

    // Optional - so check if key is set
    if(!environment.azureApplicationInsightsInstrumentationKey || 
        environment.azureApplicationInsightsInstrumentationKey.length===0){
            throw new Error("can't find instrumentation key");
            return ; 
        }
  

    appInsights.setup(environment.azureApplicationInsightsInstrumentationKey).setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(false)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
    .start();

    // Set cloud role - hope this shows up in logs
    let cloudRole = "Production";
    if(!environment.isProduction){
        cloudRole = "Development"
    } 
    
    appInsights.defaultClient.context.tags[appInsights.defaultClient.context.keys.cloudRole] = "cloudRole";

    client = appInsights.defaultClient;
    setup = true;

    trace('app insights set up complete');
}

// `any` allows for object or string
export const trace = (message:any): void =>{

    if(!setup || !client){
        throw new Error("Application Insights trace: not configured correctly");
    }

    client.trackTrace({message: JSON.stringify(message)});

}