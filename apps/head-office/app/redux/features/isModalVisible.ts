import { createSlice, Reducer } from "@reduxjs/toolkit";

export type isModalVisibleState = {
    isModalVisible: boolean;
};

const initialState = {
    isModalVisible: false,
} as isModalVisibleState;

export const modalVisibility = createSlice({
    name: "modalVisibleStatus",
    initialState,
    reducers: {
        toggleModalVisibility: (state) => {
            state.isModalVisible = !state.isModalVisible;
        },
    },
});

export const { toggleModalVisibility } = modalVisibility.actions;
export const getModalVisibility = (state: { modalVisibleStatus: isModalVisibleState }) => state.modalVisibleStatus.isModalVisible;
export default modalVisibility.reducer as Reducer<isModalVisibleState>;