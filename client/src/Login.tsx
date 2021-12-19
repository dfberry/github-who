import React from 'react';
import AppButton from './Components/Button'
import {getUriForOauthLogin} from './Utilties/github'

type Props = {
    children?: React.ReactNode
};
const Login: React.FC<Props> = ({ children }) => {

    return (
        <div className="Login">
            <AppButton name="GitHub App Login" url={getUriForOauthLogin()}></AppButton>
        </div>
        
    )
}

export default Login;