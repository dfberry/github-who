import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { logInit, trace } from '../shared/logging';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    logInit(context.log);

    trace('***dfberry');

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "test"
    };

};

export default httpTrigger;