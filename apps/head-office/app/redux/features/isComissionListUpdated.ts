import { Reducer, createSlice } from '@reduxjs/toolkit';
import type { IIsComissionListUpdatedProps} from '../types';

const initialState: IIsComissionListUpdatedProps = {
    isComissionListUpdated: false,
};

export const isComissionListUpdated = createSlice({
    name: 'isComissionListUpdated',
    initialState,
    reducers: {
        toggleComissionListUpdate: (state, action) => {
            state.isComissionListUpdated = action.payload;
        },
    },
});

export const { toggleComissionListUpdate } = isComissionListUpdated.actions;
export default isComissionListUpdated.reducer as Reducer<IIsComissionListUpdatedProps>;
