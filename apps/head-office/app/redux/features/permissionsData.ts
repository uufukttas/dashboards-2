import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IPermissionsStateProps } from '../types';

const initialState: IPermissionsStateProps[] = [{
    userName: "",
    password: "",
    newPassword: "",
    eMail: "",
    phoneNumber: "",
    roles: [
        ""
    ],
    ipAddress: "",
    userId: 0,
    stationId: 0
}];

const permissionData = createSlice({
    name: 'permissionData',
    initialState,
    reducers: {
        setPermissionData: (state, action) => {
            return action.payload;
        },
    },
});

export const { setPermissionData } = permissionData.actions;
export default permissionData.reducer as Reducer<IPermissionsStateProps[]>;
