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
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import Login from './Login';
import Home from './Home';
import NavigationBar from './Components/NavigationBar';
import AuthRedirect from './OauthAuthRedirect';
import GitHubProfile from './GitHubProfile';
import { IUser, UserState, addUser } from './Redux/index';
type Props = {
    children?: React.ReactNode
};
const AppRoutes: React.FC<Props> = ({ children }) => {


    const user: IUser = useSelector(
        (state: UserState) => state.user,
        shallowEqual
    )

    const dispatch: Dispatch<any> = useDispatch()

    const saveUser = React.useCallback(
        (article: IUser) => dispatch(addUser(user)),
        [dispatch]
    )

    return (

        <Router>
            <NavigationBar></NavigationBar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login error={user.error}/>} />
                <Route path="/auth-redirect" element={<AuthRedirect saveUser={saveUser} />} />
                <Route path="/github/my/profile" element={<GitHubProfile user={user}/>} />
                <Route path="/github/my/repos" element={<GitHubProfile user={user}/>} />
            </Routes>
        </Router>)
}

export default AppRoutes;