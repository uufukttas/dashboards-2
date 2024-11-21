import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modals: [],
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    pushModal: (state, action) => {
      state.modals.push(action.payload);
    },
    removeModalByName: (state, action) => {
      state.modals = state.modals.filter((modal) => modal.name !== action.payload);
    },
    clearModals: (state) => {
      state.modals = [];
    },
  },
});

export const { pushModal, removeModalByName, clearModals } = modalSlice.actions;
export default modalSlice.reducer;
