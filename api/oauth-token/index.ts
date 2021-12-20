import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { requestTokenFromGitHub } from '../shared/github';
import { logInit, trace } from '../shared/logging';


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {

        logInit();

        trace('api/github/oauth/access_token');
        const code = (req.query.code || (req.body && req.body.code));

        let responseMessage = null;
        let responseStatus = 404;

        if (!code) {
            responseMessage = "Required parameter code was not found";
        } else {
            try {
                responseMessage = await requestTokenFromGitHub(code);
                responseStatus = 200;
            } catch (err) {
                responseMessage = err;
                responseStatus = 500;
            }
        }
        context.res = {
            status: responseStatus,
            body: responseMessage
        };
    } catch (err) {
        trace(`api/github/oauth/access_token ${JSON.stringify(err)}`);
        context.log(`api/github/oauth/access_token ${JSON.stringify(err)}`);
        context.res = {
            status: 500,
            body: `${JSON.stringify(err)}`
        };
    }
};

export default httpTrigger;