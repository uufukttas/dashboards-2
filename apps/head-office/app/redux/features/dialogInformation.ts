import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IDialogInformationStateProps } from '../types';

const initialState: IDialogInformationStateProps = {
    isVisible: false,
    actionType: '',
    data: 0,
    success: async () => {},
    cancel: () => {},
};

export const dialogInformation = createSlice({
    name: 'dialogInformation',
    initialState,
    reducers: {
        hideDialog: (state) => {
            state.isVisible = false;
        },
        showDialog: (state, action) => {
            state.isVisible = true;
            state.actionType = action.payload.actionType;
            state.data = action.payload.data;
            state.success = action.payload.success;
            state.cancel = action.payload.cancel;
        },
    },
});

export const { showDialog, hideDialog } = dialogInformation.actions;
export default dialogInformation.reducer as Reducer<IDialogInformationStateProps>;
