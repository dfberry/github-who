import { Environment } from '../features/environment/environmentModel';

export const getUriForOauthLogin = (environment: Environment) =>{
    const uri =  `https://github.com/login/oauth/authorize?client_id=${environment.gitHubClientId}&redirect_uri=${environment.gitHubRedirectUri}&state=${environment.gitHubState}&allow_signup=true`;

    console.log(uri);

    return uri;
    
}

export const getCodeFromQueryString = (): string => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
        console.log(code);
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

        const uri = `${environment.apiBaseUri}/api/github/oauth/access_token?code=${encodeURIComponent(code)}`;

        console.log(uri);

        // Azure Function API
        const response: any = await fetch(uri, {
            method: "POST",
            headers: {
                "Accept": 'application/json',
                "content-type": "application/json",
            }
        });
        const responseJSON = await response.json();
        console.log(JSON.stringify(responseJSON));

        return responseJSON;
    } catch (err) {
        console.log(err);
        throw (err);
    }

}
/*

    GitHub auth has returned with a code in the query string.
    Exchange code for token from our own API. 

*/
export const requestToken = async (environment: Environment): Promise<any> => {

    const code: string = getCodeFromQueryString();

    // have code, need to get token
    try {
        if (code) {
            return await requestTokenFromApi(code, environment);
        } else {
            throw new Error('Client: Code not found');
        }
    } catch (err) {
        console.log("can't request token");
        console.log(err);
    }
}