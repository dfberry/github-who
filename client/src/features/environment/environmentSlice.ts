import { createSlice, } from '@reduxjs/toolkit';
import { RootState } from '../../Redux/store';
import { Environment } from './environmentModel';


export const initialState = (): Environment => {

    // 'production' or anything else
    const isProduction:boolean = (process.env.NODE_ENV && (process.env.NODE_ENV.toLowerCase().includes('prod')))
        ? true
        : false;
    console.log(`isProduction ${process.env.NODE_ENV.toString()}`);
    console.log(process.env.REACT_APP_GITHUB_ACTION);

    // empty redirect means SWA proxies to API
    // @ts-ignore
    const gitHubRedirectUri: string = process.env.REACT_APP_GITHUB_REDIRECT_URI?.toString();

    // Required
    const gitHubClientId = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID;

    // Required
    const gitHubState = process.env.REACT_APP_GITHUB_STATE;

    // Feature Flag
    const ffAzureFunctionHostKey = (process.env.REACT_APP_FF_FUNCTION_APP_KEY && process.env.REACT_APP_FF_FUNCTION_APP_KEY.toLowerCase()==='true') ? true : false;

    // Feature Flag value: Required
    const azureFunctionHostKey = (process.env.REACT_APP_FUNCTION_APP_KEY) ? process.env.REACT_APP_FUNCTION_APP_KEY : "";

    if(ffAzureFunctionHostKey && (!azureFunctionHostKey || azureFunctionHostKey.length===0)){
        throw new Error("State: expect function host key but not find one");
    }

    if(!isProduction && !gitHubRedirectUri){
        throw new Error("State: expect development redirect but not find one");
    }

    if(!gitHubClientId || !gitHubState){
        throw new Error("State: not find required GitHub app values");
    }

    /*

    TBD: why doesn't admin key work

    https://github.com/Azure/static-web-apps/issues/672

    if(!azureFunctionHostKey){
        throw new Error("State: expect Azure Function host key but didn't find one");
    }

    */

    const envVar = {
        isProduction,
        gitHubRedirectUri, 
        gitHubClientId,
        gitHubState,
        azureFunctionHostKey,
        ffAzureFunctionHostKey
    };

    console.log(`REACT_APP_GITHUB_ACTION=${process.env.REACT_APP_GITHUB_ACTION}`);
    console.log(`REACT_APP_PRINT_ENV_VAR=${process.env.REACT_APP_PRINT_ENV_VAR}`);
    console.log(`REACT_APP_GIT_SHA=${process.env.REACT_APP_GIT_SHA}`);

    if(process.env.REACT_APP_PRINT_ENV_VAR?.toLowerCase()==='true'){
        console.log(JSON.stringify(envVar))
    }

    return envVar;
}

export const environmentSlice = createSlice({
    name: 'environment',
    initialState: initialState(),
    reducers: {}
});

export const selectEnvironment = (state: RootState) => state.environment;

export default environmentSlice.reducer;