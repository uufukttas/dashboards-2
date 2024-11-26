import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';

export interface Modal {
  name: string;
  component: React.ReactNode;
}

interface ModalState {
  modals: Modal[];
}

const initialState: ModalState = {
  modals: [],
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    pushModal: (
      state,
      action: PayloadAction<{
        name: string;
        component: React.ReactNode;
      }>,
    ) => {
      if (state.modals.find((modal) => modal.name === action.payload.name)) return;

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
export default modalSlice.reducer as Reducer;
