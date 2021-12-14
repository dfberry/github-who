import React from 'react';
import AppButton from './Components/Button'
import {useLocation} from 'react-router-dom';
import {getUriForOauthLogin} from './Utilties/github'

type Props = {
    children?: React.ReactNode
};
const Login: React.FC<Props> = ({ children }) => {

    const { state } = useLocation();

    return (
        <div className="Login">
            <div>{ state && state?.error }</div>
            <AppButton name="GitHub App Login" url={getUriForOauthLogin()}></AppButton>
        </div>
        
    )
}

export default Login;