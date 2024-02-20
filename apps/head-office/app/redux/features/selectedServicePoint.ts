import { createSlice, Reducer } from "@reduxjs/toolkit";

interface ISelectedServicePoint {
    name: string;
    title: string;
    phoneNumbers: string[];
    address: string;
    city: number;
    district: number;
    paymentMethods: string[];
    freePark: boolean;
    opportunities: string[];
    longitude: number;
    latitude: number;
};

export type UpdatedServicePoint = {
    updatedServicePoint: ISelectedServicePoint;
};

const initialState = {
    updatedServicePoint: {},
} as UpdatedServicePoint;

export const updatedServicePoint = createSlice({
    name: "updatedServicePoint",
    initialState,
    reducers: {
        setUpdatedServicePoint: (state, action) => {
            state.updatedServicePoint = action.payload;
        },
    },
});

export const { setUpdatedServicePoint } = updatedServicePoint.actions;
export const getUpdatedServicePointInfo = (state: UpdatedServicePoint) => state.updatedServicePoint;
export default updatedServicePoint.reducer as Reducer<UpdatedServicePoint>;