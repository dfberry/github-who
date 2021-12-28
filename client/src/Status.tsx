import React, {useEffect, useState } from 'react';
import { requestStatusFromApi } from './Utilties/status';
import { useAppSelector } from './app/hooks';
import {
    selectEnvironment,
} from './features/environment/environmentSlice';
import { DetailsListBasic } from "./Components/DetailsListBasic";


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
            <DetailsListBasic name="Server Status" data={status}/>
        </div>
    )
}

export default Status;