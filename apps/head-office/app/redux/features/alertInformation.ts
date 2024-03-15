import { createSlice, Reducer } from '@reduxjs/toolkit';

interface IAlertInformationStateProps {
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
};

const initialState: IAlertInformationStateProps = {
    isVisible: false,
    message: '',
    type: 'info',
};

export const alertInformation = createSlice({
    name: 'alertInformation',
    initialState,
    reducers: {
        showAlert: (state, action) => {
            state.isVisible = true;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        hideAlert: (state) => {
            state.isVisible = false;
        },
    },
});

export const { showAlert, hideAlert } = alertInformation.actions;
export default alertInformation.reducer as Reducer<IAlertInformationStateProps>;
