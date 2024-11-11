import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IIsSidebarExpandStateProps } from '../types';

const initialState: IIsSidebarExpandStateProps = {
    isSidebarExpanded: false,
};

export const isSidebarExpand = createSlice({
    name: 'isSidebarExpand',
    initialState,
    reducers: {
        toggleSidebarExpanded: (state, action) => {
            state.isSidebarExpanded = action.payload;   
        },
    },
});

export const { toggleSidebarExpanded } = isSidebarExpand.actions;
export default isSidebarExpand.reducer as Reducer<IIsSidebarExpandStateProps>;