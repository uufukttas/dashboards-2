import { createSlice, Reducer } from '@reduxjs/toolkit';

export type SelectedCityState = {
    cityId: number;
};

const initialState = {
    cityId: 1,
} as SelectedCityState;

export const selectedCity = createSlice({
    name: 'selectedCity',
    initialState,
    reducers: {
        setSelectedCity: (state, action) => {
            state.cityId = action.payload;
        },
    },
});

export const { setSelectedCity } = selectedCity.actions;
export default selectedCity.reducer as Reducer<SelectedCityState>;