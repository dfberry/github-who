/*

1. OauthAuthRedirect - first step - get code - redirect to GitHub to get token
2. OauthTokenRedirect - second step - returned token

*/
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import {getGitHubToken, getGithubUser} from "./Utilties/github";
type Props = {
    children?: React.ReactNode
};
const AuthRedirect: React.FC<Props> = ({ children }) => {

    const [status, setStatus] = useState(false);

    useEffect(() => {
        getGitHubToken().then(token =>{
            console.log("GitHub code redirected to get token")
            console.log(token);
        }).catch(()=>{
            console.log("can't get token");
        })
      }, []); // Only re-run the effect if param changes

    return (
        <>
            <Container className="AuthRedirect">
                { status ? "completed" : "waiting" }
            </Container>
        </>
    )
}

export default AuthRedirect;