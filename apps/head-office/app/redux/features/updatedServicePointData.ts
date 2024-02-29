import { createSlice, Reducer } from "@reduxjs/toolkit";

export type UpdatedServicePointDataState = {
    updatedServicePointData: {
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
    updatedServicePointData: {
        id: 0,
        name: '',
        companyId: 0,
        companyName: '',
        resellerCompanyId: 0,
        resellerName: '',
        isActive: false,
        isDeleted: false,
    },
} as UpdatedServicePointDataState;

export const updatedServicePointData = createSlice({
    name: "updatedServicePointData",
    initialState,
    reducers: {
        setUpdatedServicePointData: (state, action) => {
            state.updatedServicePointData.id = action.payload.id;
            state.updatedServicePointData.name = action.payload.name;
            state.updatedServicePointData.companyId = action.payload.companyId;
            state.updatedServicePointData.companyName = action.payload.companyName;
            state.updatedServicePointData.resellerCompanyId = action.payload.resellerCompanyId;
            state.updatedServicePointData.resellerName = action.payload.resellerName;
            state.updatedServicePointData.isActive = action.payload.isActive;
            state.updatedServicePointData.isDeleted = action.payload.isDeleted;
        },
    },
});

export const { setUpdatedServicePointData } = updatedServicePointData.actions;
export const getUpdatedServicePointData = (state: { updatedServicePointData: UpdatedServicePointDataState }) => state.updatedServicePointData.updatedServicePointData;
export default updatedServicePointData.reducer as Reducer<UpdatedServicePointDataState>;
