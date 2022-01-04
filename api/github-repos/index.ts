import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { logInit, trace } from '../shared/logging';
import { getEnvironment } from '../shared/environment';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {

        logInit(context.log);

        trace('***dfberry');

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "test"
        };
    } catch (err) {

        context.res = {
            status: 500 /* Defaults to 200 */,
            body: {
                error:{
                    message: err.message, 
                    stack: err.stack
                }
            }
        }; 
    }

};

export default httpTrigger;