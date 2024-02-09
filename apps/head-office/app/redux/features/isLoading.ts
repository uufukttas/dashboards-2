import { createSlice, Reducer } from "@reduxjs/toolkit";

export type LoadingState = {
    isLoading: boolean;
};

const initialState = {
    isLoading: false,
} as LoadingState;

export const loading = createSlice({
    name: "loading",
    initialState,
    reducers: {
        toggleLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { toggleLoading } = loading.actions;
export const getExpandState = (state: { expand: LoadingState }) => state.expand.isLoading;
export default loading.reducer as Reducer<LoadingState>;