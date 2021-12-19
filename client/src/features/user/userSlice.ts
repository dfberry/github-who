import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { GitHubUser } from './userModel';


export const initialState: GitHubUser = {
    user: undefined,
    token: undefined,
    status: 'unauthenticated',
    error: undefined
};

const addUser = (state: any, action: PayloadAction<GitHubUser>) =>{
    if (action.payload.token && action.payload.user) {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'authenticated';
    } else {
        state.status = action.payload.status;
        state.error = action.payload.error;
        
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        add: addUser
    }
});

export const { add } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;