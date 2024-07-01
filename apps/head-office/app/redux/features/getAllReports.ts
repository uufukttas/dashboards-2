import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IReportsDataStateProps } from '../types';

const initialState: IReportsDataStateProps = {
    reportsData: [],
    reportsCount: 0,
};

export const reportsData = createSlice({
    name: 'reportsData',
    initialState,
    reducers: {
        setReportsData: (state, action) => {
            state.reportsData = action.payload.data;
            state.reportsCount = action.payload.count;
        },
    },
});

export const { setReportsData } = reportsData.actions;
export default reportsData.reducer as Reducer<IReportsDataStateProps>;
