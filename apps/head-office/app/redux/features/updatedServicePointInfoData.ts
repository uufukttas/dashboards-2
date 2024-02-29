import { createSlice, Reducer } from "@reduxjs/toolkit";

export type UpdatedServicePointInfoDataState = {
    updatedServicePointData: {
        id: number;
        name: string;
        type: string;
        longitude: number;
        latitude: number;
        phone: string;
        address: string;
        city: number;
        district: number;
        opportunities: string;
        freePark: string;
        paymentMethods: string
    };
};

const initialState = {
    updatedServicePointData: {
        id: 0,
        name: '',
        type: '',
        longitude: 0,
        latitude: 0,
        phone: '',
        address: '',
        city: 0,
        district: 0,
        opportunities: '',
        freePark: '',
        paymentMethods: ''
    },
} as UpdatedServicePointInfoDataState;

export const updatedServicePointInfoData = createSlice({
    name: "updatedServicePointInfoData",
    initialState,
    reducers: {
        setUpdatedServicePoint: (state, action) => {
            state.updatedServicePointData = action.payload;
        },
    },
});

export const { setUpdatedServicePoint } = updatedServicePointInfoData.actions;
export const getUpdatedServicePointInfoData = (state: { updatedServicePointInfoData: UpdatedServicePointInfoDataState }) => state.updatedServicePointInfoData.updatedServicePointData;
export default updatedServicePointInfoData.reducer as Reducer<UpdatedServicePointInfoDataState>;
