import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IUsersProps } from '../types';

interface UsersState {
    count: number;
    users: IUsersProps[];
};

const initialState: UsersState = {
    count: 0,
    users: [],
};

export const users = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload.users;
            state.count = action.payload.count;
        },
    },
});

export const { setUsers } = users.actions;
export default users.reducer as Reducer;
