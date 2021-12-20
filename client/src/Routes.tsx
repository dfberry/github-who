import React from 'react';
import {
    Routes,
    Route,
    BrowserRouter as Router
} from "react-router-dom";
import Login from './Login';
import Home from './Home';
import NavigationBar from './Components/NavigationBar';
import AuthRedirect from './OauthAuthRedirect';
import { User } from './features/user/User';
import Status from './Status';

type Props = {
    children?: React.ReactNode
};
const AppRoutes: React.FC<Props> = ({ children }) => {
    return (
        
        <Router>
            <NavigationBar></NavigationBar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth-redirect" element={<AuthRedirect />} />
                <Route path="/github-profile" element={<User />} />
                <Route path="/status" element={<Status />} />
            </Routes>
        </Router>)
}

export default AppRoutes;