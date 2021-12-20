import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { logInit, trace } from '../shared/logging';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try{
        context.log('HTTP trigger function processed a request.');
        const name = (req.query.name || (req.body && req.body.name));
        const responseMessage = name
            ? "Hello, " + name + ". This HTTP triggered function executed successfully."
            : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
    
    
    
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseMessage
        };
    } catch (err){
        context.res = {
            status: 500, /* Defaults to 200 */
            body: JSON.stringify(err)
        }; 
    }
    

};

export default httpTrigger;