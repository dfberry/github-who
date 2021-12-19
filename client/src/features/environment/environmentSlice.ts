import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Environment} from './environmentModel';


export const initialState: Environment = {
    production: (process.env.NODE_ENV && (process.env.NODE_ENV.toLowerCase().includes('prod')))
};

export const environmentSlice = createSlice({
    name: 'environment',
    initialState,
    reducers: {}
});

export const selectEnvironment = (state: RootState) => state.environment;

export default environmentSlice.reducer;