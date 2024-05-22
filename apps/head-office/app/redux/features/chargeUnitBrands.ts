import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IChargeUnitBrandsProps } from "../types";

const initialState: IChargeUnitBrandsProps[] = [{
    id: 0,
    name: 'Model Seçiniz',
    isDeleted: false,
}];

export const chargeUnitBrands = createSlice({
    name: 'chargeUnitBrands',
    initialState,
    reducers: {
        setChargeUnitBrands: (state, action) => {
            return action.payload;
        },
    },
});

export const { setChargeUnitBrands } = chargeUnitBrands.actions;
export default chargeUnitBrands.reducer as Reducer<IChargeUnitBrandsProps[]>;
