import { createSlice, Reducer } from "@reduxjs/toolkit";
import { IStationFeatureListItemsProps } from "../types";

const initialState: IStationFeatureListItemsProps[] = [{
    id: 0,
    name: 'Birini Seciniz',
    rid: null,
}];

export const statusList = createSlice({
    name: 'statusList',
    initialState,
    reducers: {
        setStatusList: (state, action) => {
            return action.payload;
        },
    }
});

export const { setStatusList } = statusList.actions;
export default statusList.reducer as Reducer<IStationFeatureListItemsProps[]>;
