import { createSlice, Reducer } from "@reduxjs/toolkit";

export type UpdatedServicePoint = {
    updatedServicePoint: string;
};

const initialState = {
    updatedServicePoint: '01',
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