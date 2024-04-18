import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IIsSidebarExpandStateProps } from '../types';

const initialState: IIsSidebarExpandStateProps = {
    isSidebarExpanded: null,
};

export const isSidebarExpand = createSlice({
    name: 'isSidebarExpand',
    initialState,
    reducers: {
        toggleSidebarExpanded: (state) => {
            if (state.isSidebarExpanded === null) {
                state.isSidebarExpanded = true;
            } else {
                state.isSidebarExpanded = !state.isSidebarExpanded;
            }
        },
    },
});

export const { toggleSidebarExpanded } = isSidebarExpand.actions;
export default isSidebarExpand.reducer as Reducer<IIsSidebarExpandStateProps>;