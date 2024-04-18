import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IIsModalVisibleState } from '../types';

const initialState: IIsModalVisibleState = {
    isModalVisible: false,
};

export const isModalVisibility = createSlice({
    name: 'isModalVisibility',
    initialState,
    reducers: {
        toggleModalVisibility: (state) => {
            state.isModalVisible = !state.isModalVisible;
        },
    },
});

export const { toggleModalVisibility } = isModalVisibility.actions;
export default isModalVisibility.reducer as Reducer<IIsModalVisibleState>;