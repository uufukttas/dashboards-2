import { createSlice, Reducer } from '@reduxjs/toolkit';

const initialState: number = 0;

const activeTabIndex = createSlice({
    name: 'activeTabIndex',
    initialState,
    reducers: {
        setActiveTabIndex: (state, action) => action.payload,
    },
    
});

export const { setActiveTabIndex } = activeTabIndex.actions;
export default activeTabIndex.reducer as Reducer<number>;
