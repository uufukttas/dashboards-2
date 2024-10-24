import { createSlice, Reducer } from "@reduxjs/toolkit";
import { IDashboardComponentInfoProps } from "../types";

const initialState: IDashboardComponentInfoProps = {
    componentInfo: [{
        iconName: '',
        mobileLayout: '',
        pageCode: 'maindashboard',
        pageId: 0,
        pageName: '',
        position: '',
        tabletLayout: '',
        widgetCode: '',
        widgetDescription: '',
        widgetId: 0,
        widgetType: '',
    }]
};

const dashboardComponentInfo = createSlice({
    name: 'dashboardComponentInfo',
    initialState,
    reducers: {
        setDashboardComponentInfo: (state, action) => {
            state.componentInfo = action.payload;
        },
    },
});

export const { setDashboardComponentInfo } = dashboardComponentInfo.actions;
export default dashboardComponentInfo.reducer as Reducer<IDashboardComponentInfoProps>;
