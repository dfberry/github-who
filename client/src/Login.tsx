import React from 'react';
import AppButton from './Components/Button'

type Props = {
    children?: React.ReactNode
};
const Login: React.FC<Props> = ({ children }) => {
    return (
        <div className="Login">
            <AppButton name="GitHub App Login" url="https://github.com/login/oauth/authorize?client_id=Iv1.bd95bb0b5f68f682&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth-redirect&state=123&allow_signup=true"></AppButton>
            <p></p>
            <AppButton name="GitHub App Oauth" url="https://github.com/login/oauth/authorize?client_id=e259ec77ebab7eb99287&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth-redirect&state=123&allow_signup=true"></AppButton>
        </div>
    )
}

export default Login;