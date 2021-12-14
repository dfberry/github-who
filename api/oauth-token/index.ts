import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import {requestTokenFromGitHub} from '../shared/github';
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('api/github/oauth/access_token');
    const code = (req.query.code || (req.body && req.body.code));
    
    let responseMessage = null;
    let responseStatus = 404;

    if(!code) {
        responseMessage = "Required parameter code was not found";
    } else {
        try{
            responseMessage = await requestTokenFromGitHub(code);
            responseStatus = 200;
        } catch(err){
            responseMessage = err;
            responseStatus = 500;
        }  
    }
    context.res = {
        status: responseStatus,
        body: responseMessage
    };

};

export default httpTrigger;