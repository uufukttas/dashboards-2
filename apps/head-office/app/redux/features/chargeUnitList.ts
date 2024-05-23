import { createSlice, Reducer} from '@reduxjs/toolkit';
import { IChargeUnitListStateProps } from '../types';

const initialState: IChargeUnitListStateProps[] = [{
        accessType: '',
        chargePointId: 0,
        connectorNumber: 1,
        connectorId: 0,
        count: 1,
        deviceCode: '',
        externalAddress: '',
        hoStatus: '',
        internalAddress: '',
        investor: '',
        isFreePoint: false,
        lastHeartBeat: '',
        limitedUsage: false,
        modelId: 1,
        model: '',
        ocppVersion: '',
        sendRoaming: false,
        stationId: 0,
        status: '',
        location: '',
    },
];

const chargeUnitList = createSlice({
    name: 'chargeUnitList',
    initialState,
    reducers: {
        setChargeUnitList: (state, action) => {
            return action.payload;
        },
    },
});

export const { setChargeUnitList } = chargeUnitList.actions;
export default chargeUnitList.reducer as Reducer<IChargeUnitListStateProps[]>;
