import { createSlice, Reducer } from '@reduxjs/toolkit';

export type isDialogVisibleState = {
    isDialogVisible: boolean;
};

const initialState = {
    isDialogVisible: false,
} as isDialogVisibleState;

export const dialogVisibility = createSlice({
    name: 'dialogVisibleStatus',
    initialState,
    reducers: {
        toggleDialogVisibility: (state) => {
            state.isDialogVisible = !state.isDialogVisible;
        },
    },
});

export const { toggleDialogVisibility } = dialogVisibility.actions;
export const getDialogVisibility = (state: { dialogVisibleStatus: isDialogVisibleState }) => state.dialogVisibleStatus.isDialogVisible;
export default dialogVisibility.reducer as Reducer<isDialogVisibleState>;