import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { requestTokenFromGitHub } from '../shared/github';
import { logInit, trace } from '../shared/logging';


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
        
    context.log('APILOG: api/github/oauth/access_token');
    const code = (req.query.code || (req.body && req.body.code));

    let responseMessage = await requestTokenFromGitHub(code);
    context.res = {
        status: 200,
        body: responseMessage
    };
};

export default httpTrigger;