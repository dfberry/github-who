import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { logInit, trace } from '../shared/logging';

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