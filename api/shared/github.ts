import fetch from 'cross-fetch';
import { getEnvironment } from './environment';
import { trace } from './logging';

export const requestUser = async (token: string): Promise<any> => {
  try {
    if (!token) throw new Error('Required token is empty');

    const response = await fetch(`https://api.github.com/user`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (response.status >= 400) {
      //trace(`GitHub Request User: fetch returned state ${JSON.stringify(response.status)}`);
      throw new Error('Bad response from server');
    }

    const userObj = await response.json();
    return userObj;
  } catch (err) {
    //trace(`GitHub Request User: fetch returned state ${JSON.stringify(err)}`);
    throw err;
  }
};
export const requestToken = async (code: string): Promise<any> => {
  const environment = getEnvironment();

  const body = {
    client_id: environment.gitHubClientId,
    client_secret: environment.gitHubClientSecret,
    redirect_uri: environment.gitHubRedirectUri,
    code: code
  };

  // Request to exchange code for an access token
  const response = await fetch(`https://github.com/login/oauth/access_token`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });
};
export const requestTokenFromGitHub = async (code: string): Promise<any> => {
  const tokenObj = await requestToken(code);

  // Request to return data of a user that has been authenticated
  //const userObj = await requestUser(tokenObj.access_token);

  //const response = {
  //  token: tokenObj,
  //  user: userObj
  //}

  //trace(`GitHub requestTokenFromGitHub: response ${JSON.stringify(response)}`);

  return tokenObj;
};
