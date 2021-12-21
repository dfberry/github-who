import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import fetch from 'cross-fetch';
//import { getEnvironment  } from '../shared/environment';
import * as appInsights from 'applicationinsights';

appInsights.setup(process.env.AZURE_APPLICATIONINSIGHTS_INSTRUMENTATION_KEY).setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(false)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
    .start();



const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  try {



    context.log('APILOG: api/github/oauth/access_token');
    const code = (req.query.code || (req.body && req.body.code));

    if (!code) throw new Error("Token: code is required but wasn't found");

    //const environment = getEnvironment(); 
    const gitHubBody = {
      "client_id": process.env.GITHUB_OAUTH_CLIENT_ID,
      "client_secret": process.env.GITHUB_OAUTH_CLIENT_SECRET,
      "redirect_uri": process.env.GITHUB_OAUTH_REDIRECT_URI,
      "code": code
    }

    if (!process.env.GITHUB_OAUTH_CLIENT_ID) throw new Error("Token: process.env.GITHUB_OAUTH_CLIENT_ID is required but wasn't found");
    if (!process.env.GITHUB_OAUTH_CLIENT_SECRET) throw new Error("Token: process.env.GITHUB_OAUTH_CLIENT_SECRET is required but wasn't found");
    if (!process.env.GITHUB_OAUTH_REDIRECT_URI) throw new Error("Token: process.env.GITHUB_OAUTH_REDIRECT_URI is required but wasn't found");

    // Request to exchange code for an access token
    const responseToken = await fetch(`https://github.com/login/oauth/access_token`, {
      method: "POST",
      body: JSON.stringify(gitHubBody),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    const tokenObj = await responseToken.json();


    const responseUser = await fetch(`https://api.github.com/user`, {
      headers: {
        "Authorization": `token ${tokenObj.access_token}`,
        "Accept": 'application/json',
        "Content-Type": "application/json",
      }
    });
    const userObj = await responseUser.json();


    context.res = {
      status: 200,
      body: { token: tokenObj, user: userObj },
      headers: {
        "Content-Type": "application/json",
      }
    };
  } catch (err) {

    if (err.message.includes('Token:')) {
      context.res = {
        status: 404,
        body: { error: err.message, stack: err.stack, code: err.code },
        headers: {
          "Content-Type": "application/json",
        }
      };
    } else {
      context.res = {
        status: 500,
        body: { error: "API: " + err.message, stack: err.stack, code: err.code },
        headers: {
          "Content-Type": "application/json",
        }
      };
    }
  }
};

export default httpTrigger;