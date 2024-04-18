import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IChargePointDataStateProps } from '../types';

const initialState: IChargePointDataStateProps = {
    isChargePointDataUpdated: false,
};

export const isChargePointDataUpdated = createSlice({
    name: 'isChargePointDataUpdateStatus',
    initialState,
    reducers: {
        toggleChargePointDataUpdated: (state, action) => {
            state.isChargePointDataUpdated = action.payload;
        },
    },
});

export const { toggleChargePointDataUpdated } = isChargePointDataUpdated.actions;
export default isChargePointDataUpdated.reducer as Reducer<IChargePointDataStateProps>;