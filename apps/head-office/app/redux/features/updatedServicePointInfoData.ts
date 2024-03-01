import { createSlice, Reducer } from "@reduxjs/toolkit";

export type UpdatedServicePointInfoDataState = {
    updatedServicePointInfoData: {
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
    updatedServicePointInfoData: {
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
        setUpdatedServicePointInfo: (state, action) => {
            state.updatedServicePointInfoData.address = action.payload.address;
            state.updatedServicePointInfoData.city = action.payload.city;
            state.updatedServicePointInfoData.district = action.payload.district;
            state.updatedServicePointInfoData.freePark = action.payload.freePark;
            state.updatedServicePointInfoData.id = action.payload.id;
            state.updatedServicePointInfoData.latitude = action.payload.latitude;
            state.updatedServicePointInfoData.longitude = action.payload.longitude;
            state.updatedServicePointInfoData.name = action.payload.name;
            state.updatedServicePointInfoData.opportunities = action.payload.opportunities;
            state.updatedServicePointInfoData.paymentMethods = action.payload.paymentMethods;
            state.updatedServicePointInfoData.phone = action.payload.phone;
            state.updatedServicePointInfoData.type = action.payload.type;
        },
    },
});

export const { setUpdatedServicePointInfo } = updatedServicePointInfoData.actions;
export const getUpdatedServicePointInfoData = (state: { updatedServicePointInfoData: UpdatedServicePointInfoDataState }) => state.updatedServicePointInfoData.updatedServicePointInfoData;
export default updatedServicePointInfoData.reducer as Reducer<UpdatedServicePointInfoDataState>;
