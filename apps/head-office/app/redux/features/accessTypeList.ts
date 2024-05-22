import { createSlice, Reducer } from "@reduxjs/toolkit";
import { IAccessTypeListStateProps } from "../types";

const initialState: IAccessTypeListStateProps[] = [{
    id: 0,
    name: 'Birini Seciniz',
    rid: null,
}];

export const accessTypeList = createSlice({
    name: 'accessTypeList',
    initialState,
    reducers: {
        setAccessTypeList: (state, action) => {
            return action.payload;
        },
    }
});

export const { setAccessTypeList } = accessTypeList.actions;
export default accessTypeList.reducer as Reducer<IAccessTypeListStateProps[]>;
