/*

1. OauthAuthRedirect - first step - get code - redirect to GitHub to get token
2. OauthTokenRedirect - second step - returned token

*/

import React, { useState } from 'react';
import { requestToken } from "./Utilties/github";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffectAsync } from './Utilties/reactHelpers';
import { Loading } from './Components/Loading';

import { IUser } from './Redux/index';

type Props = {
    children?: React.ReactNode,
    saveUser: (user: IUser | any) => void
};
const AuthRedirect: React.FC<Props> = ({ children, saveUser }) => {

    const [status, setStatus] = useState<boolean>(false);
    const [token, setToken] = useState<object>({});
    const [user, setUser] = useState<IUser | {}>();
    const [error, setError] = useState<string>("");
    
    const navigate = useNavigate();

    useEffectAsync(async () => {
        await getToken();
    }, []);

    const addUser = (user: IUser) => {
        saveUser(user)
      }

    const getToken = async () => {
        requestToken()
            .then((result) => {               
                if (result && result.user && result.token) {

                    // Success - have user and token
                    addUser({
                        token: result.token,
                        user: result.user,
                        isAuthenticated: true,
                        error: ""
                    });
                    

                    navigate('/github/my/profile');
                } else if (!result.token) {

                    addUser({
                        token: {},
                        user: {},
                        isAuthenticated: false,
                        error: "Token not returned"
                    });

                    navigate('/login');
                } else {

                    addUser({
                        token: {},
                        user: {},
                        isAuthenticated: false,
                        error: "User not returned"
                    });
                }
            }).catch((err) => {
                navigate('/login');
            });
    }

    return (
        <Loading/>
    )
}

export default AuthRedirect;