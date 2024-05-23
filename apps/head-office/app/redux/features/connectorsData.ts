import { createSlice } from '@reduxjs/toolkit';

const connectorsData = createSlice({
  name: 'connectorsData',
  initialState: {
    connectors: [],
  },
  reducers: {
    setConnectors(state, action) {
      state.connectors = action.payload;
    },
  },
});

export const { setConnectors } = connectorsData.actions;
export default connectorsData.reducer;
