import { createSlice, Reducer } from '@reduxjs/toolkit';

export type ChargePointDataState = {
    isChargePointDataUpdated: boolean;
};

const initialState = {
    isChargePointDataUpdated: false,
} as ChargePointDataState;

export const chargePointDataUpdated = createSlice({
    name: 'isChargePointDataUpdateStatus',
    initialState,
    reducers: {
        toggleChargePointDataUpdated: (state, action) => {
            state.isChargePointDataUpdated = action.payload;
        },
    },
});

export const { toggleChargePointDataUpdated } = chargePointDataUpdated.actions;
export default chargePointDataUpdated.reducer as Reducer<ChargePointDataState>;