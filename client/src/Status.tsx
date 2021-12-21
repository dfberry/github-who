import React, {useEffect, useState } from 'react';
import TableProperties from "./Components/TableProperties";
import { requestStatusFromApi } from './Utilties/status';
type Props = {
    children?: React.ReactNode
};
const Status: React.FC<Props> = ({ children }) => {

    const [status, setStatus] = useState({});

    useEffect(() => {

        (async () => {
            const currentState = await requestStatusFromApi();
            setStatus(currentState);
          })()

    }, []);

    return (
        <div className="Status">
            <TableProperties name="Server Status" data={status}/>
        </div>
    )
}

export default Status;