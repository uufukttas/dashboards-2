import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IIsModalVisibleStateProps } from '../types';

const initialState: IIsModalVisibleStateProps = {
    isModalVisible: false,
};

export const isModalVisibility = createSlice({
    name: 'isModalVisibility',
    initialState,
    reducers: {
        toggleModalVisibility: (state, action) => {
            state.isModalVisible = action.payload;
        },
    },
});

export const { toggleModalVisibility } = isModalVisibility.actions;
export default isModalVisibility.reducer as Reducer<IIsModalVisibleStateProps>;