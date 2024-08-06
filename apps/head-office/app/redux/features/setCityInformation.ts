import { Reducer, createSlice } from '@reduxjs/toolkit';
import type { ICityInformationProps } from '../types';

const initialState: ICityInformationProps = {
    cities: [],
    districts: [],
};

export const cityInformation = createSlice({
    name: 'cityInformation',
    initialState,
    reducers: {
        setCities: (state, action) => {
            state.cities = action.payload
        },
        setDistricts: (state, action) => {
            state.districts = action.payload
        },
    },
});

export const { setCities, setDistricts } = cityInformation.actions;
export default cityInformation.reducer as Reducer;
