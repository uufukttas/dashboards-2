import { createSlice } from "@reduxjs/toolkit";

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
export default connectorProperty.reducer;