import { Environment } from '../features/environment/environmentModel';

export const getUriForOauthLogin = (environment: Environment) =>{
    const uri =  `https://github.com/login/oauth/authorize?client_id=${environment.gitHubClientId}&redirect_uri=${environment.gitHubRedirectUri}&state=${environment.gitHubState}&allow_signup=true`;

    return uri;
    
}

export const getGitHubCodeFromQueryString = (): string => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
        return code;
    } else {
        return "";
    }
}
export const requestTokenFromApi = async (code: string, environment: Environment): Promise<any> => {
    try {

        if(!code){
            throw new Error("Required parameters are missing");
        }

        const uri = `/api/github/oauth/access_token?githubcode=${encodeURIComponent(code)}&code=${encodeURIComponent(environment.azureFunctionHostKey)}`;

        // Azure Function API
        const response: any = await fetch(uri, {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "content-type": "application/json",
            }
        });
        const responseJSON = await response.json();

        return responseJSON;
    } catch (err) {
        throw (err);
    }

}
/*

    GitHub auth has returned with a code in the query string.
    Exchange code for token from our own API. 

*/
export const requestToken = async (environment: Environment): Promise<any> => {

    const code: string = getGitHubCodeFromQueryString();

    // have code, need to get token
    try {
        if (code) {
            return await requestTokenFromApi(code, environment);
        } else {
            throw new Error('Client: Code not found');
        }
    } catch (err) {
        throw new Error(JSON.stringify(err));
    }
}