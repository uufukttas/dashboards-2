import { Reducer, createSlice } from '@reduxjs/toolkit';
import { IIsConnectorUpdatedProps } from '../types';

const initialState: IIsConnectorUpdatedProps = {
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
export default isConnectorUpdated.reducer as Reducer<IIsConnectorUpdatedProps>;
