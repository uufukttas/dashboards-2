import { createSlice, Reducer } from '@reduxjs/toolkit';
import { ITariffDataProps } from '../types';

interface TariffState {
    count: number;
    tariffs: ITariffDataProps[];
};

const initialState: TariffState = {
    count: 0,
    tariffs: [],
};

export const tariffs = createSlice({
    name: 'tariffs',
    initialState,
    reducers: {
        setTariffs: (state, action) => {
            state.tariffs = action.payload.tariffs;
            state.count = action.payload.count;
        },
    },
});

export const { setTariffs } = tariffs.actions;
export default tariffs.reducer as Reducer;
