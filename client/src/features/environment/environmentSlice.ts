import { createSlice, } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Environment } from './environmentModel';


const initialState = (): Environment => {

    // 'production' or anything else
    const isProduction:boolean = (process.env.NODE_ENV && (process.env.NODE_ENV.toLowerCase().includes('prod')))
        ? true
        : false;
    console.log(`isProduction ${isProduction.toString()}`);

    // empty redirect means SWA proxies to API
    const gitHubRedirectUri: string = (isProduction) 
        ? ""
        : (process.env.REACT_APP_GITHUB_REDIRECT_URI) || "";
    console.log(gitHubRedirectUri);

    // Required
    const gitHubClientId = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID;
    console.log(gitHubClientId);

    // Required
    const gitHubState = process.env.REACT_APP_GITHUB_STATE;
    console.log(gitHubState);

    // Required
    const apiBaseUri = process.env.REACT_API_BASE_URL;
    console.log(apiBaseUri);

    if(!isProduction && !gitHubRedirectUri){
        throw new Error("State: expect development redirect but didn't find one");
    }

    if(!gitHubClientId || !gitHubState){
        throw new Error("State: didn't find required GitHub app values");
    }

    if(!apiBaseUri){
        throw new Error("State: didn't find required API base uri");      
    }

    return {
        isProduction,
        gitHubRedirectUri, 
        gitHubClientId,
        gitHubState,
        apiBaseUri
    }

}

export const environmentSlice = createSlice({
    name: 'environment',
    initialState: initialState(),
    reducers: {}
});

export const selectEnvironment = (state: RootState) => state.environment;

export default environmentSlice.reducer;