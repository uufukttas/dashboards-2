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
        toggleLoadingVisibility: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { toggleLoadingVisibility } = loading.actions;
export default loading.reducer as Reducer<LoadingState>;