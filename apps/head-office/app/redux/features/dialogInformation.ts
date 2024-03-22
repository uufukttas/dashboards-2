import { createSlice, Reducer } from '@reduxjs/toolkit';

export type IDialogInformationStateProps = {
    isVisible: boolean;
    actionType: string;
    data: number;
};

const initialState = {
    isVisible: false,
    actionType: '',
    data: 0,
} as IDialogInformationStateProps;

export const dialogInformation = createSlice({
    name: 'dialogInformation',
    initialState,
    reducers: {
        showDialog: (state, action) => {
            console.log('action', action)
            state.isVisible = true;
            state.actionType = action.payload.actionType;
            state.data = action.payload.data;
        },
        hideDialog: (state) => {
            state.isVisible = false;
        },
    },
});

export const { showDialog, hideDialog } = dialogInformation.actions;
export default dialogInformation.reducer as Reducer<IDialogInformationStateProps>;
