import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IServicePointPermissionsStateProps } from '../types';

interface ServicePointPermissionsState {
    servicePointPermissions: IServicePointPermissionsStateProps[];
};

const initialState: ServicePointPermissionsState = {
    servicePointPermissions: [],
};

export const servicePointPermissions = createSlice({
    name: 'servicePointPermissions',
    initialState,
    reducers: {
        setServicePointPermissions: (state, action) => {
            state.servicePointPermissions = action.payload.data;
        },
    },
});

export const { setServicePointPermissions } = servicePointPermissions.actions;
export default servicePointPermissions.reducer as Reducer;
