import { Reducer, createSlice } from '@reduxjs/toolkit';
import { IIsServicePointPermissionsUpdatedProps } from '../types';

const initialState: IIsServicePointPermissionsUpdatedProps = {
    isServicePointPermissionsUpdated: false,
};

export const isServicePointPermissionsUpdated = createSlice({
    name: 'isServicePointPermissionsUpdated',
    initialState,
    reducers: {
        toggleServicePointPermissionsUpdated: (state, action) => {
            state.isServicePointPermissionsUpdated = action.payload;
        },
    },
});

export const { toggleServicePointPermissionsUpdated } = isServicePointPermissionsUpdated.actions;
export default isServicePointPermissionsUpdated.reducer as Reducer<IIsServicePointPermissionsUpdatedProps>;
