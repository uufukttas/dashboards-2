import { createSlice, Reducer } from '@reduxjs/toolkit';

export type ServicePointDataState = {
    isServicePointDataUpdated: boolean;
};

const initialState = {
    isServicePointDataUpdated: false,
} as ServicePointDataState;

export const servicePointDataUpdated = createSlice({
    name: 'isServicePointDataUpdateStatus',
    initialState,
    reducers: {
        toggleServicePointDataUpdated: (state, action) => {
            state.isServicePointDataUpdated = action.payload;
        },
    },
});

export const { toggleServicePointDataUpdated } = servicePointDataUpdated.actions;
export const getIsServicePointDataUpdatedStatus = (state: { isServicePointDataUpdateStatus: ServicePointDataState }) => state.isServicePointDataUpdateStatus.isServicePointDataUpdated;
export default servicePointDataUpdated.reducer as Reducer<ServicePointDataState>;