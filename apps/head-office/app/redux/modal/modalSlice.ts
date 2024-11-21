import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Modal {
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
