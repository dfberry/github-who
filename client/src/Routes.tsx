import React from 'react';
import Container from 'react-bootstrap/Container';
import {
    Routes,
    Route,
    BrowserRouter as Router,
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet
} from "react-router-dom";
import Login from './Login';
import Home from './Home';
import NavigationBar from './Components/NavigationBar';
import AuthRedirect from './OauthAuthRedirect';
import GitHubProfile from './GitHubProfile';

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
                <Route path="/github-profile" element={<GitHubProfile />} />
            </Routes>
        </Router>)
}

export default AppRoutes;