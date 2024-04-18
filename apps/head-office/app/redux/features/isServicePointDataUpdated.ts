import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IIsServicePointDataUpdatedProps} from '../types';

const initialState: IIsServicePointDataUpdatedProps = {
    isServicePointDataUpdated: false,
};

export const isServicePointDataUpdate = createSlice({
    name: 'isServicePointDataUpdate',
    initialState,
    reducers: {
        toggleServicePointDataUpdated: (state, action) => {
            state.isServicePointDataUpdated = action.payload;
        },
    },
});

export const { toggleServicePointDataUpdated } = isServicePointDataUpdate.actions;
export default isServicePointDataUpdate.reducer as Reducer<IIsServicePointDataUpdatedProps>;