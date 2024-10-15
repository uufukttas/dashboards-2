import { createSlice, Reducer } from "@reduxjs/toolkit";
import { IDashboardDataProps } from "../types";

const initialState: IDashboardDataProps = {
    description: '',
    success: false,
    result: [],
};

export const dashboardData = createSlice({
    name: 'dashboardData',
    initialState,
    reducers: {
        setDashboardData: (state, action) => {
            return action.payload;
        },
    }
});

export const { setDashboardData } = dashboardData.actions;
export default dashboardData.reducer as Reducer<IDashboardDataProps>;
