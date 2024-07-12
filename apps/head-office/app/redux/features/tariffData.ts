import { createSlice, Reducer } from "@reduxjs/toolkit";
import { ITariffDataProps } from '../types';

const initialState: ITariffDataProps = {
    createDate: '',
    id: 0,
    isActive: false,
    isDeleted: false,
    name: '',
    minKW: 0,
    maxKW: 0,
    validityEndDate: '',
    validityStartDate: '',
    SaleUnitPrice: 0,
};

export const tariffData = createSlice({
    name: 'tariffData',
    initialState,
    reducers: {
        setTariffData: (state, action) => {
            state.createDate = action.payload.createDate;
            state.id = action.payload.id;
            state.isActive = action.payload.isActive;
            state.name = action.payload.name;
            state.isDeleted = action.payload.isDeleted;
            state.validityEndDate = action.payload.validityEndDate;
            state.validityStartDate = action.payload.validityStartDate;
            state.SaleUnitPrice = action.payload.SaleUnitPrice;
        },
    },
});

export const { setTariffData } = tariffData.actions;
export default tariffData.reducer as Reducer<ITariffDataProps>;
