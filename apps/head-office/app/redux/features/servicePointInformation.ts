import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IServicePointInformationStateProps } from '../types';

const initialState: IServicePointInformationStateProps = {
    servicePointInformation: {
        id: 0,
        name: '',
        type: '',
        lon: 0,
        lat: 0,
        phone1: '',
        phone2: '',
        address: '',
        addressDetail: '',
        cityId: 0,
        districtId: 0,
        opportunities: [],
        freePark: false,
        paymentMethods: [],
    },
};

export const servicePointInformation = createSlice({
    name: 'servicePointInformation',
    initialState,
    reducers: {
        setServicePointInformation: (state, action) => {
            state.servicePointInformation.address = action.payload.address;
            state.servicePointInformation.addressDetail = action.payload.addressDetail;
            state.servicePointInformation.cityId = action.payload.cityId;
            state.servicePointInformation.districtId = action.payload.districtId;
            state.servicePointInformation.freePark = action.payload.freePark;
            state.servicePointInformation.id = action.payload.id;
            state.servicePointInformation.lat = action.payload.lat;
            state.servicePointInformation.lon = action.payload.lon;
            state.servicePointInformation.name = action.payload.name;
            state.servicePointInformation.opportunities = action.payload.opportunities;
            state.servicePointInformation.paymentMethods = action.payload.paymentMethods;
            state.servicePointInformation.phone1 = action.payload.phone1;
            state.servicePointInformation.phone2 = action.payload.phone2;
            state.servicePointInformation.type = action.payload.type;
        },
    },
});

export const { setServicePointInformation } = servicePointInformation.actions;
export default servicePointInformation.reducer as Reducer<IServicePointInformationStateProps
>;
