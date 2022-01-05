import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { logInit, trace } from '../shared/logging';
import { userRepos } from '../shared/github';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {

        logInit(context.log);

        trace('*** Azure Function: api/github/repo');

        const githubToken =
            req.headers["Authorization"];

        if (!githubToken)
            throw new Error("Repos: token is required but wasn't found");

        const repos = await userRepos(githubToken);

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: {
                repos: repos
            }
        };
    } catch (err) {

        context.res = {
            status: 500 /* Defaults to 200 */,
            body: {
                error: {
                    message: err.message,
                    stack: err.stack
                }
            }
        };
    }

};

export default httpTrigger;