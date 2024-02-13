import { createSlice, Reducer } from "@reduxjs/toolkit";

export type SelectedCityState = {
    city: string;
};

const initialState = {
    city: '01',
} as SelectedCityState;

export const selectedCity = createSlice({
    name: "city",
    initialState,
    reducers: {
        setSelectedCity: (state, action) => {
            state.city = action.payload;
        },
    },
});

export const { setSelectedCity } = selectedCity.actions;
export const getSelectedCity = (state: SelectedCityState) => state.city;
export default selectedCity.reducer as Reducer<SelectedCityState>;