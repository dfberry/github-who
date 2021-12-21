import React from 'react';
import AppButton from './Components/Button'
import {getUriForOauthLogin} from './Utilties/github'
import { useAppSelector } from './app/hooks';
import {
    selectEnvironment,
  } from './features/environment/environmentSlice';


type Props = {
    children?: React.ReactNode,
    error: string
};
const Login: React.FC<Props> = ({ children, error }) => {

    const environment = useAppSelector(selectEnvironment);

    return (
        <div className="Login">
            <AppButton name="GitHub App Login" url={getUriForOauthLogin(environment)}></AppButton>
        </div>
        
    )
}

export default Login;