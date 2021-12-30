import { createSlice, } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Environment } from './environmentModel';


const initialState = (): Environment => {

    // 'production' or anything else
    const isProduction:boolean = (process.env.NODE_ENV && (process.env.NODE_ENV.toLowerCase().includes('prod')))
        ? true
        : false;
    console.log(`isProduction ${process.env.NODE_ENV.toString()}`);

    // empty redirect means SWA proxies to API
    // @ts-ignore
    const gitHubRedirectUri: string = process.env.REACT_APP_GITHUB_REDIRECT_URI?.toString();

    // Required
    const gitHubClientId = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID;

    // Required
    const gitHubState = process.env.REACT_APP_GITHUB_STATE;

    // Feature Flag
    const ffAzureFunctionHostKey = (process.env.REACT_APP_FF_FUNCTION_APP_KEY && process.env.REACT_APP_FF_FUNCTION_APP_KEY.toLowerCase()==='true') ? true : false;

    // Feature Flag: Required
    const azureFunctionHostKey = (process.env.REACT_APP_FUNCTION_APP_KEY) ? process.env.REACT_APP_FUNCTION_APP_KEY : "";

    if(ffAzureFunctionHostKey && (!azureFunctionHostKey || azureFunctionHostKey.length===0){
        throw new Error("State: expect function host key but didn't find one");
    }

    if(!isProduction && !gitHubRedirectUri){
        throw new Error("State: expect development redirect but didn't find one");
    }

    if(!gitHubClientId || !gitHubState){
        throw new Error("State: didn't find required GitHub app values");
    }

    /*

    TBD: why doesn't admin key work

    https://github.com/Azure/static-web-apps/issues/672

    if(!azureFunctionHostKey){
        throw new Error("State: expect Azure Function host key but didn't find one");
    }

    */

    return {
        isProduction,
        gitHubRedirectUri, 
        gitHubClientId,
        gitHubState,
        azureFunctionHostKey,
        ffAzureFunctionHostKey
    }

}

export const environmentSlice = createSlice({
    name: 'environment',
    initialState: initialState(),
    reducers: {}
});

export const selectEnvironment = (state: RootState) => state.environment;

export default environmentSlice.reducer;