/*

1. OauthAuthRedirect - first step - get code - redirect to GitHub to get token
2. OauthTokenRedirect - second step - returned token

*/
import React, { useState } from 'react';
import { requestToken } from "./Utilties/github";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffectAsync } from './Utilties/reactHelpers';
import { Loading } from './Components/Loading';



type Props = {
    children?: React.ReactNode
};
const AuthRedirect: React.FC<Props> = ({ children }) => {

    const [status, setStatus] = useState<boolean>(false);
    const [token, setToken] = useState<object>({});
    const [user, setUser] = useState<object>({ name: "" });
    const [error, setError] = useState<string>("");
    
    const navigate = useNavigate();

    useEffectAsync(async () => {
        await getToken();
    }, []);

    const getToken = async () => {
        requestToken()
            .then((result) => {               
                if (result && result.user && result.token) {
                    navigate('/github-profile', { state: {user: result.user, token: result.token} });
                } else if (!result.token) {
                    navigate('/login', { state: {error: "Token not returned" }});
                } else {
                    //(!result.user){
                    navigate('/login', { state: {error: "User not returned" }});
                }
            }).catch((err) => {
                navigate('/login', { state: {error: err.message }});
            });
    }

    return (
        <Loading/>
    )
}

export default AuthRedirect;