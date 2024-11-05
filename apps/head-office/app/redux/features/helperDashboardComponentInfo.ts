import { createSlice, Reducer } from "@reduxjs/toolkit";
import { IHelperDashboardComponentInfoProps } from "../types";

const initialState: IHelperDashboardComponentInfoProps = {
    componentInfo: [{
        iconName: '',
        mobileLayout: '',
        pageCode: '',
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

const helperDashboardComponentInfo = createSlice({
    name: 'helperDashboardComponentInfo',
    initialState,
    reducers: {
        setHelperDashboardComponentInfo: (state, action) => {
            state.componentInfo = action.payload;
        },
    },
});

export const { setHelperDashboardComponentInfo } = helperDashboardComponentInfo.actions;
export default helperDashboardComponentInfo.reducer as Reducer<IHelperDashboardComponentInfoProps>;
