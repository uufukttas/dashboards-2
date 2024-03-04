import { createSlice, Reducer } from "@reduxjs/toolkit";

export type UpdatedServicePointInfoDataState = {
    updatedServicePointInfoData: {
        id: number;
        name: string;
        type: string;
        longitude: number;
        latitude: number;
        phone: string[];
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
        phone: [],
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
        setUpdatedServicePointInfoData: (state, action) => {
            state.updatedServicePointInfoData.address = action.payload.Address;
            state.updatedServicePointInfoData.city = action.payload.CityID;
            state.updatedServicePointInfoData.district = action.payload.DistrictID;
            state.updatedServicePointInfoData.freePark = action.payload.freePark;
            state.updatedServicePointInfoData.id = action.payload.ID;
            state.updatedServicePointInfoData.latitude = action.payload.Lat;
            state.updatedServicePointInfoData.longitude = action.payload.Lon;
            state.updatedServicePointInfoData.name = action.payload.name;
            state.updatedServicePointInfoData.opportunities = action.payload.opportunities;
            state.updatedServicePointInfoData.paymentMethods = action.payload.paymentMethods;
            state.updatedServicePointInfoData.phone = [action.payload.Phone1 + ',' + action.payload.Phone2];
            state.updatedServicePointInfoData.type = action.payload.type;
        },
    },
});

export const { setUpdatedServicePointInfoData } = updatedServicePointInfoData.actions;
export const getUpdatedServicePointInfoData = (state: { updatedServicePointInfoData: UpdatedServicePointInfoDataState }) => state.updatedServicePointInfoData.updatedServicePointInfoData;
export default updatedServicePointInfoData.reducer as Reducer<UpdatedServicePointInfoDataState>;
