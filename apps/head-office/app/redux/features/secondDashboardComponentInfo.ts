import { createSlice, Reducer } from "@reduxjs/toolkit";
import { ISecondDashboardComponentInfoProps } from "../types";

const initialState: ISecondDashboardComponentInfoProps = {
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

const secondDashboardComponentInfo = createSlice({
    name: 'secondDashboardComponentInfo',
    initialState,
    reducers: {
        setSecondDashboardComponentInfo: (state, action) => {
            state.componentInfo = action.payload;
        },
    },
});

export const { setSecondDashboardComponentInfo } = secondDashboardComponentInfo.actions;
export default secondDashboardComponentInfo.reducer as Reducer<ISecondDashboardComponentInfoProps>;
