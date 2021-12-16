import { log } from './log';

declare var process : {
    env: {
        REACT_APP_GITHUB_OAUTH_CLIENT_ID: string,
        REACT_APP_GITHUB_OAUTH_CLIENT_SECRET: string,
        REACT_APP_GITHUB_REDIRECT_URI:string,
        REACT_APP_GITHUB_STATE: string
    }
  }

const clientId: string = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID;
const redirectUri = process.env.REACT_APP_GITHUB_REDIRECT_URI;
const state = process.env.REACT_APP_GITHUB_STATE;

export const getUriForOauthLogin = () =>{
    return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&allow_signup=true`    
}

export const getCodeFromQueryString = (): string => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
        log("verbose", code);
        return code;
    } else {
        return "";
    }
}
export const requestTokenFromApi = async (code: string): Promise<any> => {
    try {

        if(!clientId || !code || !state || !redirectUri){
            throw new Error("Required parameters are missing");
        }

        // Azure Function API
        const response: any = await fetch(`/api/github/oauth/access_token?client_id=${encodeURIComponent(clientId)}&code=${encodeURIComponent(code)}&redirect_uri=${encodeURIComponent(encodeURIComponent(redirectUri))}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            }
        });
        const { token, user } = await response.json();
        log("verbose", token);
        log("verbose", user);
        return { token, user };
    } catch (err:any) {
        log("error", err);
        throw (err);
    }

}
export const requestUserReposFromApi = async (token: string): Promise<any> => {
    try {

        if(!token){
            throw new Error("Required parameters are missing");
        }
        
        // Azure Function API
        const response: any = await fetch(`http://localhost:7071/api/github/user/repositories`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const { status, repos } = await response.json();
        log("verbose", status);
        log("verbose", repos);
        return { status, repos };
    } catch (err:any) {
        log("error", err);
        throw (err);
    }

}
/*

    GitHub auth has returned with a code in the query string.
    Exchange code for token from our own API. 

*/
export const requestToken = async (): Promise<any> => {

    const code: string = getCodeFromQueryString();

    // have code, need to get token
    try {
        if (code) {
            log("verbose", code);
            return await requestTokenFromApi(code);
        } else {
            throw new Error('Client: Code not found');
        }
    } catch (err:any ) {
        log("error", err);
        throw err;
    }
}