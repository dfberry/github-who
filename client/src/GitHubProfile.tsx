import React from 'react';
import {useLocation} from 'react-router-dom';
import TableProperties from './Components/TableProperties';

type Props = {
    user?: React.ReactNode,
    token?: React.ReactNode,
    state?: React.ReactNode
};
const GitHubProfile: React.FC<Props> = (props) => {

    // TBD: switch to getting state from redux
    const { state } = useLocation();

    return (
        <div className="GitHubProfile">
            <TableProperties data={state.user}/>
        </div>
    )
}

export default GitHubProfile;