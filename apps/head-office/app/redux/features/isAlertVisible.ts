import { createSlice, Reducer } from '@reduxjs/toolkit';

export type isAlertVisibleState = {
  isAlertVisible: boolean;
};

const initialState = {
  isAlertVisible: false,
} as isAlertVisibleState;

export const alertVisibility = createSlice({
  name: 'alertVisibileStatus',
  initialState,
  reducers: {
    toggleAlertVisibility: (state, action) => {
      state.isAlertVisible = action.payload;
    },
  },
});

export const { toggleAlertVisibility } = alertVisibility.actions;
export default alertVisibility.reducer as Reducer<isAlertVisibleState>;