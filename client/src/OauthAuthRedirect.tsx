/*

1. OauthAuthRedirect - first step - get code - redirect to GitHub to get token
2. OauthTokenRedirect - second step - returned token

*/
import React, { useState } from 'react';
import { requestToken } from "./Utilties/github";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffectAsync } from './Utilties/reactHelpers';
import { Loading } from './Components/Loading';
import { useAppSelector, useAppDispatch } from './app/hooks';
import {
    add
  } from './features/user/userSlice';


type Props = {
    children?: React.ReactNode
};
const AuthRedirect: React.FC<Props> = ({ children }) => {

    const [status, setStatus] = useState<boolean>(false);
    const [token, setToken] = useState<object>({});
    const [user, setUser] = useState<object>({ name: "" });
    const [error, setError] = useState<string>("");
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffectAsync(async () => {
        await getToken();
    }, []);

    const getToken = async () => {
        requestToken()
            .then((result) => {               
                if (result && result.user && result.token) {
                    dispatch(add({user:result.user, token:result.token, status: 'authenticated', error: undefined}));
                    navigate('/github-profile');
                } else if (!result.token) {
                    dispatch(add({user: undefined, token: undefined, status: 'failed', error: "Authentication: token not found"}));
                    navigate('/login');
                } else if (!result.user){
                    dispatch(add({user: undefined, token: undefined, status: 'failed', error: "Authentication: user not found"}));
                    navigate('/login');
                } else {
                    dispatch(add({user: undefined, token: undefined, status: 'failed', error: "Authentication: unknown error"}));
                    navigate('/login');                 
                }
            }).catch((err) => {
                dispatch(add({user: undefined, token: undefined, status: 'failed', error: `Authentication: catch ${JSON.stringify(err)}`}));
                navigate('/login');
            });
    }

    return (
        <Loading/>
    )
}

export default AuthRedirect;