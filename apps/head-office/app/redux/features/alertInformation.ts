import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IAlertInformationStateProps } from '../types';

const initialState: IAlertInformationStateProps = {
  isVisible: false,
  message: '',
  type: 'info',
};

export const alertInformation = createSlice({
  name: 'alertInformation',
  initialState,
  reducers: {
    hideAlert: (state) => {
      state.isVisible = false;
    },
    showAlert: (state, action) => {
      state.isVisible = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

export const { showAlert, hideAlert } = alertInformation.actions;
export default alertInformation.reducer as Reducer<IAlertInformationStateProps>;
