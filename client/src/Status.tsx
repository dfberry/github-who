import React, {useEffect, useState } from 'react';
import { requestStatusFromApi } from './Utilties/status';
import { useAppSelector } from './Redux/hooks';
import {
    selectEnvironment,
} from './features/environment/environmentSlice';
import { DetailsListNameValuePairs } from "./Components/DetailsListNameValuePairs";


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
            <DetailsListNameValuePairs name="Server Status" data={status}/>
        </div>
    )
}

export default Status;