import { createSlice, Reducer } from "@reduxjs/toolkit";
import { IInvestorsProps } from "../types";

const initialState: IInvestorsProps[] = [{
    id: 0,
    name: 'Yatırımcı Seçiniz',
}];

const chargeUnitInvestorsSlice = createSlice({
    name: 'chargeUnitInvestors',
    initialState,
    reducers: {
        setChargeUnitInvestors: (state, action) => {
            return action.payload;
        },
    },
});

export const { setChargeUnitInvestors } = chargeUnitInvestorsSlice.actions;
export default chargeUnitInvestorsSlice.reducer as Reducer<IInvestorsProps[]>;
