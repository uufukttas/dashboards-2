import { createSlice, Reducer } from "@reduxjs/toolkit";

export type ExpandedState = {
    isExpanded: boolean | null;
};

const initialState = {
    isExpanded: null,
} as ExpandedState;

export const expanded = createSlice({
    name: "expanded",
    initialState,
    reducers: {
        toggleExpanded: (state) => {
            if (state.isExpanded === null) {
                state.isExpanded = false;
            } else {
                state.isExpanded = !state.isExpanded;
            }
        },
    },
});

export const {
    toggleExpanded,
} = expanded.actions;
export const getExpandState = (state: { expand: ExpandedState }) => state.expand.isExpanded;
export default expanded.reducer as Reducer<ExpandedState>;