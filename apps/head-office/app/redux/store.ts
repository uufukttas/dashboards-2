import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import alertInformation from './features/alertInformation';
import chargeUnitData from './features/chargeUnitData';
import dialogInformation from './features/dialogInformation';
import isChargePointDataUpdated from './features/isChargePointDataUpdated';
import isModalVisible from './features/isModalVisible';
import isServicePointDataUpdated from './features/isServicePointDataUpdated';
import loadingReducer from './features/isLoadingVisible';
import servicePointData from './features/servicePointData';
import servicePointInformation from './features/servicePointInformation';
import sidebarExpandReducer from './features/isSidebarExpand';

export const store: EnhancedStore = configureStore({
  reducer: {
    alertInformation,
    chargeUnitData,
    dialogInformation,
    isChargePointDataUpdated,
    isModalVisible,
    isServicePointDataUpdated,
    loadingReducer,
    servicePointData,
    servicePointInformation,
    sidebarExpandReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
