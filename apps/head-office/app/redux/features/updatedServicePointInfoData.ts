import { createSlice, Reducer } from '@reduxjs/toolkit';

export type UpdatedServicePointInfoDataState = {
    updatedServicePointInfoData: {
        id: number;
        name: string;
        type: string;
        longitude: number;
        latitude: number;
        phone1: string;
        phone2: string;
        address: string;
        cityId: number;
        districtId: number;
        opportunities: string[];
        freePark: boolean;
        paymentMethods: string;
    };
};

const initialState = {
    updatedServicePointInfoData: {
        id: 0,
        name: '',
        type: '',
        longitude: 0,
        latitude: 0,
        phone1: '',
        phone2: '',
        address: '',
        cityId: 0,
        districtId: 0,
        opportunities: [],
        freePark: false,
        paymentMethods: '1',
    },
} as UpdatedServicePointInfoDataState;

export const updatedServicePointInfoData = createSlice({
    name: 'updatedServicePointInfoData',
    initialState,
    reducers: {
        setUpdatedServicePointInfoData: (state, action) => {
            console.log('action', action)
            state.updatedServicePointInfoData.address = action.payload.address;
            state.updatedServicePointInfoData.cityId = action.payload.cityId;
            state.updatedServicePointInfoData.districtId = action.payload.districtId;
            state.updatedServicePointInfoData.freePark = action.payload.freePark;
            state.updatedServicePointInfoData.id = action.payload.id;
            state.updatedServicePointInfoData.latitude = action.payload.lat;
            state.updatedServicePointInfoData.longitude = action.payload.lon;
            state.updatedServicePointInfoData.name = action.payload.name;
            state.updatedServicePointInfoData.opportunities = action.payload.opportunities;
            state.updatedServicePointInfoData.paymentMethods = action.payload.paymentMethods;
            state.updatedServicePointInfoData.phone1 = action.payload.phone1;
            state.updatedServicePointInfoData.phone2 = action.payload.phone2;
            state.updatedServicePointInfoData.type = action.payload.type;
        },
    },
});

export const { setUpdatedServicePointInfoData } = updatedServicePointInfoData.actions;
export default updatedServicePointInfoData.reducer as Reducer<UpdatedServicePointInfoDataState>;
