import fetch from 'cross-fetch';

export const requestUser = async (token: string): Promise<any> => {
  try {
    if (!token || token.length<3) throw new Error('Required token is empty');

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
export const requestToken = async (environment: any, code: string): Promise<any> => {

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
export const requestTokenFromGitHub = async (environment: any, code: string): Promise<any> => {
  const tokenObj = await requestToken(environment, code);

  // Request to return data of a user that has been authenticated
  //const userObj = await requestUser(tokenObj.access_token);

  //const response = {
  //  token: tokenObj,
  //  user: userObj
  //}

  //trace(`GitHub requestTokenFromGitHub: response ${JSON.stringify(response)}`);

  return tokenObj;
};

export const userRepos = async (
  gitHubToken: string,
  sort:string = 'full_name', 
  page:number=1, 
  pageLength:number=100, 
  //since?:string // format = YYYY-MM-DDTHH:MM:SSZ
  ):Promise<any> =>{

    if (!gitHubToken){
      throw new Error('Required token is empty');
    } 

    const options = {
      visibility:'all',
      affiliation:'owner,collaborator,organization_member',
      type:'all',
      sort:sort,
      page:page,
      per_page:pageLength
    };

    const esc = encodeURIComponent;

    const queryString = Object.keys(options).map(k => `${esc(k)}=${esc(options[k])}`).join('&')

    /*

curl --header "Authorization: token <PAT>" \
     https://api.github.com/user/repos —verbose

    */

    const response = await fetch(`https://api.github.com/user/repos?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${gitHubToken}`,
      }
    });  

    const reposObj = await response.json();
    return reposObj;

}
