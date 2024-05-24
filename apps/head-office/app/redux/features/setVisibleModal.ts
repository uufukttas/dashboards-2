import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit';

interface FeatureState {
    addChargeUnit: boolean;
    addComission: boolean;
    addConnector: boolean;
    addEnergyPrice: boolean;
    addPermission: boolean;
    addServicePointImage: boolean;
};

const initialState: FeatureState = {
    addChargeUnit: false,
    addComission: false,
    addConnector: false,
    addEnergyPrice: false,
    addPermission: false,
    addServicePointImage: false,
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
    },
});

export const {
    setAddChargeUnit,
    setAddComission,
    setAddConnector,
    setAddEnergyPrice,
    setAddPermission,
    setAddServicePointImage,
} = featureSlice.actions;

export default featureSlice.reducer as Reducer<FeatureState>;
