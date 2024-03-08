import { createSlice, Reducer } from "@reduxjs/toolkit";

export type SelectedCityState = {
    cityId: string;
};

const initialState = {
    cityId: '01',
} as SelectedCityState;

export const selectedCity = createSlice({
    name: "selectedCity",
    initialState,
    reducers: {
        setSelectedCity: (state, action) => {
            state.cityId = action.payload;
        },
    },
});

export const { setSelectedCity } = selectedCity.actions;
export default selectedCity.reducer as Reducer<SelectedCityState>;