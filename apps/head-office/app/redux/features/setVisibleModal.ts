import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';

interface FeatureState {
    addChargeUnit: boolean;
    addComission: boolean;
    addConnector: boolean;
    addEnergyPrice: boolean;
    addPermission: boolean;
    addServicePointImage: boolean;
    manageStation: {
        isVisible: boolean;
        unitCode?: string;
        connectorNumber?: number;
    };
};

const initialState: FeatureState = {
    addChargeUnit: false,
    addComission: false,
    addConnector: false,
    addEnergyPrice: false,
    addPermission: false,
    addServicePointImage: false,
    manageStation: {
        isVisible: true,
        unitCode: '',
        connectorNumber: 1,
    },
};

const featureSlice = createSlice({
    name: 'feature',
    initialState,
    reducers: {
        setAddChargeUnit(state, action: PayloadAction<boolean>) {
            state.addChargeUnit = action.payload;
        },
        setAddComission(state, action: PayloadAction<boolean>) {
            state.addComission = action.payload;
        },
        setAddConnector(state, action: PayloadAction<boolean>) {
            state.addConnector = action.payload;
        },
        setAddEnergyPrice(state, action: PayloadAction<boolean>) {
            state.addEnergyPrice = action.payload;
        },
        setAddPermission(state, action: PayloadAction<boolean>) {
            state.addPermission = action.payload;
        },
        setAddServicePointImage(state, action: PayloadAction<boolean>) {
            state.addServicePointImage = action.payload;
        },
        setManageStation(state, action: PayloadAction<{ isVisible: boolean; unitCode: string; connectorNumber: number }>) {
            state.manageStation.isVisible = action.payload.isVisible;
            state.manageStation.unitCode = action.payload.unitCode;
            state.manageStation.connectorNumber = action.payload.connectorNumber;
        },
    },
});

export const {
    setAddChargeUnit,
    setAddComission,
    setAddConnector,
    setAddEnergyPrice,
    setAddPermission,
    setAddServicePointImage,
    setManageStation,
} = featureSlice.actions;

export default featureSlice.reducer as Reducer<FeatureState>;
