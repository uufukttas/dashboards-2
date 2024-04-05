import { createSlice, Reducer } from '@reduxjs/toolkit';

export type ChargeUnitDataStateProps = {
    chargeUnitData: {
        code: string;
        brandId: number;
        connectorCount: number;
        ocppVersion: number;
        isFreeUsage: boolean;
        isLimitedUsage: boolean;
        investor: number;
        status: string;
        accessType: string;
        location: string;
        chargePointId: number;
    }
};

const initialState = {
    chargeUnitData: {
        code: '',
        brandId: 1,
        connectorCount: 1,
        ocppVersion: 1600,
        isFreeUsage: false,
        isLimitedUsage: false,
        investor: 1,
        status: '1',
        accessType: '1',
        location: '',
        chargePointId: 0,
    },
} as ChargeUnitDataStateProps;

export const chargeUnitData = createSlice({
    name: 'chargeUnitData',
    initialState,
    reducers: {
        setChargeUnitData: (state, action) => {
            state.chargeUnitData.code = action.payload.code;
            state.chargeUnitData.brandId = action.payload.brandId;
            state.chargeUnitData.connectorCount = action.payload.connectorCount;
            state.chargeUnitData.ocppVersion = action.payload.ocppVersion;
            state.chargeUnitData.isFreeUsage = action.payload.isFreeUsage;
            state.chargeUnitData.isLimitedUsage = action.payload.isLimitedUsage;
            state.chargeUnitData.investor = action.payload.investor;
            state.chargeUnitData.status = action.payload.status;
            state.chargeUnitData.accessType = action.payload.accessType;
            state.chargeUnitData.location = action.payload.location;
            state.chargeUnitData.chargePointId = action.payload.chargePointId;
        },
    },
});

export const { setChargeUnitData } = chargeUnitData.actions;
export default chargeUnitData.reducer as Reducer<ChargeUnitDataStateProps>;
