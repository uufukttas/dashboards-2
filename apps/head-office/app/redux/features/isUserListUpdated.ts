import { Reducer, createSlice } from '@reduxjs/toolkit';
import { IIsUserListUpdatedProps } from '../types';

const initialState: IIsUserListUpdatedProps = {
    isUserListUpdated: false,
};

export const isUserListUpdated = createSlice({
    name: 'isUserListUpdated',
    initialState,
    reducers: {
        toggleUserListUpdate: (state, action) => {
            state.isUserListUpdated = action.payload;
        },
    },
});

export const { toggleUserListUpdate } = isUserListUpdated.actions;
export default isUserListUpdated.reducer as Reducer<IIsUserListUpdatedProps>;
