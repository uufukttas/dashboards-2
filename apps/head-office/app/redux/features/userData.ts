import { createSlice, Reducer } from "@reduxjs/toolkit";
import { IUserDataProps } from '../types';

const initialState: IUserDataProps = {
    roles: ['Guest'],
    userId: 0,
};

export const userData = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.roles = action.payload.roles;
            state.userId = action.payload.userId;
        },
    },
});

export const { setUserData } = userData.actions;
export default userData.reducer as Reducer<IUserDataProps>;
