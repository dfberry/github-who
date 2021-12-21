import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { logInit, trace } from '../shared/logging';

import * as appInsights from 'applicationinsights';

appInsights.setup(process.env.AZURE_APPLICATIONINSIGHTS_INSTRUMENTATION_KEY).setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(false)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
    .start();

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try{
        context.log('/api/status');
        
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: process.env
        };
    } catch (err){

        const returnError = {
            "error": JSON.stringify(err)
        }

        context.res = {
            status: 500, /* Defaults to 200 */
            body: returnError
        }; 
    }
    

};

export default httpTrigger;