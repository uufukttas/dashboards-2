import { createSlice, Reducer } from "@reduxjs/toolkit";

export type SidebarExpandState = {
    isSidebarExpanded: boolean | null;
};

const initialState = {
    isSidebarExpanded: null,
} as SidebarExpandState;

export const sidebarExpand = createSlice({
    name: "sidebarExpand",
    initialState,
    reducers: {
        toggleExpanded: (state) => {
            if (state.isSidebarExpanded === null) {
                state.isSidebarExpanded = true;
            } else {
                state.isSidebarExpanded = !state.isSidebarExpanded;
            }
        },
    },
});

export const {
    toggleExpanded,
} = sidebarExpand.actions;
export const getExpandState = (state: { expand: SidebarExpandState }) => state.expand.isSidebarExpanded;
export default sidebarExpand.reducer as Reducer<SidebarExpandState>;