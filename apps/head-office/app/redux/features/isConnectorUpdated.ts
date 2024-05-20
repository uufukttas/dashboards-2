import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isConnectorUpdated: false,
};

export const isConnectorUpdated = createSlice({
    name: 'isConnectorUpdated',
    initialState,
    reducers: {
        toggleConnectorUpdated: (state, action) => {
            state.isConnectorUpdated = action.payload;
        },
    },
});

export const { toggleConnectorUpdated } = isConnectorUpdated.actions;
export default isConnectorUpdated.reducer;
