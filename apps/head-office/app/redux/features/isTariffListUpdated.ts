import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IIsTariffListUpdatedProps} from '../types';

const initialState: IIsTariffListUpdatedProps = {
    isTariffListUpdated: false,
};

export const isTariffListUpdated = createSlice({
    name: 'isTariffListUpdated',
    initialState,
    reducers: {
        toggleTariffListUpdated: (state, action) => {
            state.isTariffListUpdated = action.payload;
        },
    },
});

export const { toggleTariffListUpdated } = isTariffListUpdated.actions;
export default isTariffListUpdated.reducer as Reducer<IIsTariffListUpdatedProps>;
