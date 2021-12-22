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
    console.log(`redirect url ${process.env.REACT_APP_GITHUB_REDIRECT_URI}`);

    // Required
    const gitHubClientId = process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID;
    console.log(`githubClientId = ${process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID}`);

    // Required
    const gitHubState = process.env.REACT_APP_GITHUB_STATE;
    console.log(`gitHubState ${process.env.REACT_APP_GITHUB_STATE}`);

    if(!isProduction && !gitHubRedirectUri){
        throw new Error("State: expect development redirect but didn't find one");
    }

    if(!gitHubClientId || !gitHubState){
        throw new Error("State: didn't find required GitHub app values");
    }

    return {
        isProduction,
        gitHubRedirectUri, 
        gitHubClientId,
        gitHubState
    }

}

export const environmentSlice = createSlice({
    name: 'environment',
    initialState: initialState(),
    reducers: {}
});

export const selectEnvironment = (state: RootState) => state.environment;

export default environmentSlice.reducer;