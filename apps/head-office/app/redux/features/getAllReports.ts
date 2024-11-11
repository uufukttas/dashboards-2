import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IReportsDataStateProps } from '../types';

const initialState: IReportsDataStateProps = {
    reportsData: [],
    reportsCount: 0,
    usersData: [],
    usersCount: 0,
};

export const reportsData = createSlice({
    name: 'reportsData',
    initialState,
    reducers: {
        setReportsData: (state, action) => {
            state.reportsData = action.payload.data;
            state.reportsCount = action.payload.count;
        },
        setUsersData: (state, action) => {
            state.usersData = action.payload.data;
            state.usersCount = action.payload.count;
        }
    },
});

export const { setReportsData, setUsersData } = reportsData.actions;
export default reportsData.reducer as Reducer<IReportsDataStateProps>;
