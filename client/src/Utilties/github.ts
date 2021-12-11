import { Octokit } from "octokit";

const clientId: string = process.env["REACT_APP_GITHUB_OAUTH_CLIENT_ID"] || "";
const clientSecret: string = process.env["REACT_APP_GITHUB_OAUTH_CLIENT_SECRET"] || "";

export const getCodeFromQueryString = (): string=>{
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      return code;
    } else {
        throw new Error("can't get GitHub Oauth code");
    }
}
export const getTokenFromQueryString = ():string =>{
    const token = new URL(window.location.href).searchParams.get("token");
    if (token) {
      return token;
    } else {
        throw new Error("can't get GitHub Oauth token");
    }
}
export const requestTokenFromGitHub = async(code:string ):Promise<any>=>{
    // Azure Function API
    const response = await fetch("api/github/oauth/token", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ 
            client_id: clientId,
            client_secret: clientSecret,
            code, 
            redirect_uri:"http://localhost:3000/auth-redirect" }),
      });
      const { token } = await response.json();
      return token;
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