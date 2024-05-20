import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
export default isServicePointPermissionsUpdated.reducer;
