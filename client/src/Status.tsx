import React, {useEffect, useState } from 'react';
import TableProperties from "./Components/TableProperties";
import { requestStatusFromApi } from './Utilties/status';
import { useAppSelector } from './Redux/hooks';
import {
    selectEnvironment,
} from './features/environment/environmentSlice';
  


type Props = {
    children?: React.ReactNode
};
const Status: React.FC<Props> = ({ children }) => {

    const [status, setStatus] = useState({});
    const environment = useAppSelector(selectEnvironment);

    useEffect(() => {

        (async () => {
            const currentState = await requestStatusFromApi(environment);
            setStatus(currentState);
          })()

    }, [environment]);

    return (
        <div className="Status">
            <TableProperties name="Server Status" data={status}/>
        </div>
    )
}

export default Status;