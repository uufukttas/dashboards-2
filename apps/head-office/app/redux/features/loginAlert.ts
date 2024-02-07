import { createSlice, Reducer } from "@reduxjs/toolkit";

export type LoginAlertState = {
    isFailed: boolean | null;
};

const initialState = {
    isFailed: false,
} as LoginAlertState;

export const loginAlert = createSlice({
    name: "loginAlert",
    initialState,
    reducers: {
        changeLoginAlertState: (state, action) => {
            state.isFailed = action.payload;
        },
    },
});

export const {
    changeLoginAlertState,
} = loginAlert.actions;
export const getLoginAlertState = (state: { loginAlert: LoginAlertState }) => state.loginAlert.isFailed;
export default loginAlert.reducer as Reducer<LoginAlertState>;
