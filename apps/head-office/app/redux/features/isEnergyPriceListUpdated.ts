import { Reducer, createSlice } from '@reduxjs/toolkit';
import type { IIsEnergyPriceListUpdatedProps} from '../types';

const initialState: IIsEnergyPriceListUpdatedProps = {
    isEnergyPriceListUpdated: false,
};

export const isEnergyPriceListUpdated = createSlice({
    name: 'isEnergyPriceListUpdated',
    initialState,
    reducers: {
        toggleEnergyPriceListUpdate: (state, action) => {
            state.isEnergyPriceListUpdated = action.payload;
        },
    },
});

export const { toggleEnergyPriceListUpdate } = isEnergyPriceListUpdated.actions;
export default isEnergyPriceListUpdated.reducer as Reducer<IIsEnergyPriceListUpdatedProps>;
