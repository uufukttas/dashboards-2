import { createSlice, Reducer } from '@reduxjs/toolkit';
import { ILoginTokenProps } from '../types';

const initialState: ILoginTokenProps = {
    loginToken: '',
};

const loginToken = createSlice({
    name: 'loginToken',
    initialState,
    reducers: {
        setLoginToken: (state, action) => {
            return action.payload;
        },
    },
});

export const { setLoginToken } = loginToken.actions;
export default loginToken.reducer as Reducer<ILoginTokenProps>;
