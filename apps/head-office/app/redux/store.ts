import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import alertInformation from './features/alertInformation';
import chargeUnitData from './features/chargeUnitData';
import dialogInformation from './features/dialogInformation';
import isChargePointDataUpdated from './features/isChargePointDataUpdated';
import isLoadingVisible from './features/isLoadingVisible';
import isModalVisible from './features/isModalVisible';
import isServicePointDataUpdated from './features/isServicePointDataUpdated';
import servicePointData from './features/servicePointData';
import servicePointInformation from './features/servicePointInformation';
import isSidebarExpand from './features/isSidebarExpand';

export const store: EnhancedStore = configureStore({
  reducer: {
    alertInformation,
    chargeUnitData,
    dialogInformation,
    isChargePointDataUpdated,
    isModalVisible,
    isServicePointDataUpdated,
    isLoadingVisible,
    servicePointData,
    servicePointInformation,
    isSidebarExpand,
  },
  devTools: process.env.NODE_ENV !== 'production',
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
