import fetch from 'cross-fetch';
import { getEnvironment  } from './environment';
import { trace } from './logging';


export const requestUser = async (token: string): Promise<any> => {
  try {

    if(!token) throw new Error("Required token is empty");

    const response = await fetch(`https://api.github.com/user`, {
      headers: {
        "Authorization": `token ${token}`,
        "Accept": 'application/json',
        "Content-Type": "application/json",     
      }
    });

  if (response.status >= 400) {
    trace(`GitHub Request User: fetch returned state ${response.status}`);
    throw new Error("Bad response from server");
  }

  const userObj = await response.json();
  return userObj;
} catch (err) {
  trace(`GitHub Request User: fetch returned state ${err}`);
  throw err;
}

}
export const requestToken = async (code: string): Promise<any> => {
  try {

    const environment = getEnvironment(); 

    const body = {
      "client_id": environment.gitHubClientId,
      "client_secret": environment.gitHubClientSecret,
      "redirect_uri": environment.gitHubRedirectUri,
      "code": code
    };

    trace(`GitHub Request Token: body ${body}`);

    // Request to exchange code for an access token
    const response = await fetch(`https://github.com/login/oauth/access_token`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });

    if (response.status >= 400) {
      trace(`GitHub Request Token: response.status ${response.status}`);
      throw new Error("Bad response from server");
    }

    const tokenObj = await response.json();

    return tokenObj;
  } catch (err) {
    trace(`GitHub Request Token: err ${err}`);
    throw err;
  }

}
export const requestTokenFromGitHub = async (code: string): Promise<any> => {
  try {

    const tokenObj = await requestToken(code);

    // Request to return data of a user that has been authenticated
    const userObj = await requestUser(tokenObj.access_token);

    const response = {
      token: tokenObj,
      user: userObj
    }

    trace(`GitHub requestTokenFromGitHub: response ${response}`);

    return response;

  } catch (err) {
    trace(`GitHub requestTokenFromGitHub: err ${err}`);
    throw (err);
  }

}