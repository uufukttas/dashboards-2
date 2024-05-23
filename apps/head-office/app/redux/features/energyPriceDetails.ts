import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';
import { IEnergyPriceDetailsStateProps } from '../types';

const initialState: IEnergyPriceDetailsStateProps[] = [{
    createdDate: "",
    id: 0,
    isActive: true,
    isDeleted: false,
    price: 0,
    startDate: "",
    stationId: 0,
}];

const energyPriceDetails = createSlice({
    name: 'energyPriceDetails',
    initialState,
    reducers: {
        setEnergyPriceDetails: (state, action: PayloadAction<IEnergyPriceDetailsStateProps[]>) => {
            return action.payload;
        },
    },
});

export const { setEnergyPriceDetails } = energyPriceDetails.actions;
export default energyPriceDetails.reducer as Reducer<IEnergyPriceDetailsStateProps[]>;
