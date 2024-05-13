import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IServicePointDataProps } from '../types';

interface ServicePointState {
    count: number;
    servicePoints: IServicePointDataProps[];
};

const initialState: ServicePointState = {
    count: 0,
    servicePoints: [],
};

export const servicePoints = createSlice({
    name: 'servicePoints',
    initialState,
    reducers: {
        setServicePoints: (state, action) => {
            state.servicePoints = action.payload.data;
            state.count = action.payload.count;
        },
    },
});

export const { setServicePoints } = servicePoints.actions;
export default servicePoints.reducer as Reducer;
