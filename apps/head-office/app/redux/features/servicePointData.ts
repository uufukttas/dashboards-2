import { createSlice, Reducer } from '@reduxjs/toolkit';

export type ServicePointDataStateProps = {
    servicePointData: {
        id: number;
        name: string;
        companyId: number;
        companyName: string;
        resellerCompanyId: number;
        resellerName: string;
        isActive: boolean;
        isDeleted: boolean;
    }
};

const initialState = {
    servicePointData: {
        id: 0,
        name: '',
        companyId: 0,
        companyName: '',
        resellerCompanyId: 0,
        resellerName: '',
        isActive: true,
        isDeleted: false,
    },
} as ServicePointDataStateProps;

export const servicePointData = createSlice({
    name: 'servicePointData',
    initialState,
    reducers: {
        setServicePointData: (state, action) => {
            state.servicePointData.id = action.payload.id;
            state.servicePointData.name = action.payload.name;
            state.servicePointData.companyId = action.payload.companyId;
            state.servicePointData.companyName = action.payload.companyName;
            state.servicePointData.resellerCompanyId = action.payload.resellerCompanyId;
            state.servicePointData.resellerName = action.payload.resellerName;
            state.servicePointData.isActive = action.payload.isActive;
            state.servicePointData.isDeleted = action.payload.isDeleted;
        },
    },
});

export const { setServicePointData } = servicePointData.actions;
export default servicePointData.reducer as Reducer<ServicePointDataStateProps>;
