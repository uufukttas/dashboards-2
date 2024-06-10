import { createSlice, Reducer } from '@reduxjs/toolkit';
import type { IUserProfileInfoProps } from '../types';

const initialState: IUserProfileInfoProps = {
    userId: '',
    name: '',
    surname: '',
    eMail: '',
    userName: '',
    phoneNumber: '',
    role: [],
};

const userProfileInfoSlice = createSlice({
    name: 'userProfileInfo',
    initialState,
    reducers: {
        setUserProfileInfo: (state, action) => {
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.eMail = action.payload.eMail;
            state.userName = action.payload.userName;
            state.phoneNumber = action.payload.phoneNumber;
            state.role = action.payload.role;
        },
    },
});

export const { setUserProfileInfo } = userProfileInfoSlice.actions;
export default userProfileInfoSlice.reducer as Reducer<IUserProfileInfoProps>;
