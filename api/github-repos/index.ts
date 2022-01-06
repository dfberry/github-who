import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { logInit, trace } from '../shared/logging';
import { userRepos } from '../shared/github';
import { responseFactory, FunctionResponse } from '../shared/response';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<FunctionResponse> {

    try {

        logInit(context.log);
        trace('*** Azure Function: api/github/repo');

        const githubToken =
            req.headers?.Authorization?.replace('token ','').trim() || "";

        if (!githubToken){
            return responseFactory({error: 'token is required but wasn\'t found'}, 400);
        }

        const repos = await userRepos(githubToken);
        return responseFactory(repos);

    } catch (err) {

        if(process.env.NODE_ENV){
            return responseFactory({error: err.message}, 500);
        } else {
            return responseFactory({error: err},500);
        }
    }

};

export default httpTrigger;