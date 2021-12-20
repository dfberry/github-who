import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { requestTokenFromGitHub } from '../shared/github';
import { logInit, trace } from '../shared/logging';


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {

        
        context.log('APILOG: api/github/oauth/access_token');
        //logInit(context.log);

        //trace('api/github/oauth/access_token app insights init');
        const code = (req.query.code || (req.body && req.body.code));

        let responseMessage = null;
        let responseStatus = 404;

        if (!code) {
            throw new Error("Required parameter code was not found");
        } else {
            try {
                responseMessage = await requestTokenFromGitHub(code);
                responseStatus = 200;
                context.res = {
                    status: 404,
                    body: responseMessage
                };
            } catch (err) {
                throw err;
            }
        }

    } catch (err) {

        const returnError = {
            error: JSON.stringify(err)
        }

        //trace(`api/github/oauth/access_token ${JSON.stringify(err)}`);
        context.log(`APILOG:  api/github/oauth/access_token ${JSON.stringify(err)}`);
        context.res = {
            status: 404,
            body: returnError
        };
    }
};

export default httpTrigger;