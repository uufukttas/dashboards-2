import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IChargeUnitDataStateProps } from '../types';

const initialState: IChargeUnitDataStateProps = {
    chargeUnitData: {
        code: '',
        brandId: 3,
        connectorCount: 1,
        ocppVersion: 1600,
        isFreeUsage: false,
        isLimitedUsage: false,
        isRoaming: false,
        investor: 1,
        serialNumber: '',
        status: '1',
        accessType: '1',
        location: '',
        chargePointId: 0,
    },
};

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
            state.chargeUnitData.isRoaming = action.payload.isRoaming;
            state.chargeUnitData.investor = action.payload.investor;
            state.chargeUnitData.serialNumber = action.payload.serialNumber;
            state.chargeUnitData.status = action.payload.status;
            state.chargeUnitData.accessType = action.payload.accessType;
            state.chargeUnitData.location = action.payload.location;
            state.chargeUnitData.chargePointId = action.payload.chargePointId;
        },
    },
});

export const { setChargeUnitData } = chargeUnitData.actions;
export default chargeUnitData.reducer as Reducer<IChargeUnitDataStateProps>;
