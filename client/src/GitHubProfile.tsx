import React from 'react';
import {useLocation} from 'react-router-dom';
import TableProperties from './Components/TableProperties';
import { IUser } from './Redux/index';
type Props = {
    user: IUser
};
const GitHubProfile: React.FC<Props> = ({user}) => {

    return (
        <div className="GitHubProfile">
            <TableProperties data={user.user}/>
        </div>
    )
}

export default GitHubProfile;