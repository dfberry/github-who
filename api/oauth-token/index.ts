import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import fetch from 'cross-fetch';
import { getEnvironment  } from '../shared/environment';


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
        
    context.log('APILOG: api/github/oauth/access_token');
    const code = (req.query.code || (req.body && req.body.code));

    const environment = getEnvironment(); 

    const body = {
      "client_id": environment.gitHubClientId,
      "client_secret": environment.gitHubClientSecret,
      "redirect_uri": environment.gitHubRedirectUri,
      "code": code
    };

    // Request to exchange code for an access token
    const responseToken = await fetch(`https://github.com/login/oauth/access_token`, {
      method: "POST",
      body: JSON.stringify(body),
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
        body: {token: tokenObj, user: userObj}
    };
};

export default httpTrigger;