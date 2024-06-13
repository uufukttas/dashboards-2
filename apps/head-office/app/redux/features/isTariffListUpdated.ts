import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IIsTariffListUpdatedProps} from '../types';

const initialState: IIsTariffListUpdatedProps = {
    isTariffListUpdated: false,
};

export const isTariffListUpdated = createSlice({
    name: 'isTariffListUpdated',
    initialState,
    reducers: {
        toggletariffListUpdated: (state, action) => {
            state.isTariffListUpdated = action.payload;
        },
    },
});

export const { toggletariffListUpdated } = isTariffListUpdated.actions;
export default isTariffListUpdated.reducer as Reducer<IIsTariffListUpdatedProps>;
