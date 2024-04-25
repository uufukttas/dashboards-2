import { createSlice, Reducer } from '@reduxjs/toolkit';

interface ServicePointState {
    servicePoints: any[];  // Assuming service points are strings
}

const initialState: ServicePointState = {
    servicePoints: [],
};

export const servicePoints = createSlice({
    name: 'servicePoints',
    initialState,
    reducers: {
        setServicePoints: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.servicePoints = action.payload;
            } else {
                console.error('Payload must be an array', action.payload);  // Show error in console if not array
            }
        },
    },
});

export const { setServicePoints } = servicePoints.actions;
export default servicePoints.reducer as Reducer;
