import { createSlice, Reducer } from "@reduxjs/toolkit";
import { IUserDataProps } from '../types';

const initialState: IUserDataProps = {
    roles: [],
    userId: 0,
    userName: '',
    email: '',
    phoneNumber: '',
    name: '',
    surname: '',
};

export const userData = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.roles = action.payload.roles;
            state.userId = action.payload.userId;
        },
    },
});

export const { setUserData } = userData.actions;
export default userData.reducer as Reducer<IUserDataProps>;
