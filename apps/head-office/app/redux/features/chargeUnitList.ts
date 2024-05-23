import { createSlice, Reducer} from '@reduxjs/toolkit';
import { IChargeUnitListStateProps } from '../types';

const initialState: IChargeUnitListStateProps[] = [];

const chargeUnitList = createSlice({
    name: 'chargeUnitList',
    initialState,
    reducers: {
        setChargeUnitList: (state, action) => {
            return action.payload;
        },
    },
});

export const { setChargeUnitList } = chargeUnitList.actions;
export default chargeUnitList.reducer as Reducer<IChargeUnitListStateProps[]>;
