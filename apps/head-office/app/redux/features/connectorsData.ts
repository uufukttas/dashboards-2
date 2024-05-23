import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IConnectorPropertyStateProps } from '../types'

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
export default connectorsData.reducer as unknown as Reducer<IConnectorPropertyStateProps>;
