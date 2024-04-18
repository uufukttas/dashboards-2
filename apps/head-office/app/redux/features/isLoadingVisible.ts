import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IIsLoadingStateProps } from '../types';

const initialState: IIsLoadingStateProps = {
    isLoading: false,
};

export const isLoadingVisible = createSlice({
    name: 'isLoadingVisible',
    initialState,
    reducers: {
        toggleLoadingVisibility: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { toggleLoadingVisibility } = isLoadingVisible.actions;
export default isLoadingVisible.reducer as Reducer<IIsLoadingStateProps>;