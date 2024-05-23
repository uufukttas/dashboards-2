import { Reducer, createSlice } from "@reduxjs/toolkit";
import type { IConnectorPropertyStateProps } from "../types";

const connectorProperty = createSlice({
  name: "connectorProperty",
  initialState: {
    connectorProperty: [],
  },
  reducers: {
    setConnectorProperty(state, action) {
      state.connectorProperty = action.payload;
    },
  },
});

export const { setConnectorProperty } = connectorProperty.actions;
export default connectorProperty.reducer as unknown as Reducer<IConnectorPropertyStateProps[]>
