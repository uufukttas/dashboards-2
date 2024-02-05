import { createSlice, Reducer } from "@reduxjs/toolkit";

export type ServicePointStatusState = {
    isOpen: boolean | null;
};

const initialState = {
    isOpen: null,
} as ServicePointStatusState;

export const visibility = createSlice({
    name: "servicePointStatus",
    initialState,
    reducers: {
        toggleVisibility: (state) => {
            if (state.isOpen === null) {
                state.isOpen = false;
            } else {
                state.isOpen = !state.isOpen;
            }
        },
    },
});

export const {
    toggleVisibility,
} = visibility.actions;
export const getModalStatus = (state: { status: ServicePointStatusState }) => state.status.isOpen;
export default visibility.reducer as Reducer<ServicePointStatusState>;