import { Octokit } from "octokit";

const clientId: string = process.env["REACT_APP_GITHUB_OAUTH_CLIENT_ID"] || "";
const clientSecret: string = process.env["REACT_APP_GITHUB_OAUTH_CLIENT_SECRET"] || "";
const redirectUri = "http://localhost:3000/auth-redirect";

export const getCodeFromQueryString = (): string=>{
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      return code;
    } else {
        return "";
    }
}
export const getTokenFromQueryString = ():string =>{
    const token = new URL(window.location.href).searchParams.get("token");
    if (token) {
      return token;
    } else {
        return "";
    }
}
export const requestTokenFromGitHub = async(code:string ):Promise<any>=>{
    try{
    // Azure Function API
    const response:any = await fetch(`/github/oauth/access_token?client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}&code=${encodeURIComponent(code)}&redirect_uri=${encodeURIComponent(encodeURIComponent(redirectUri))}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        }
      });
      const { token } = await response.json();
      return token;
    }catch(err){
        console.log(err);
        throw(err);
    }

}
export const getGitHubToken = async():Promise<string>=>{

    const code:string = getCodeFromQueryString();
    const token:string = getTokenFromQueryString();

    if(token){
        // all done with authentication
        return token;
    } else if (code){
        // have code, need to get token
        try{
            await requestTokenFromGitHub(code);
        }catch(err){
            console.log("can't request token");
        }
        
    } else {
        // not sure how this happens
    }



    return token;
}

export const getGithubUser = async(token:string)=>{

  const octokit = new Octokit({ auth: token });

  return (await octokit.request("GET /user")).data;
}