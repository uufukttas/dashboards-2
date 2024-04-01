import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import alertInformationReducer from './features/alertInformation';
import dialogInformation from './features/dialogInformation';
import isChargePointDataUpdated from './features/isChargePointDataUpdated';
import isModalVisibleReducer from './features/isModalVisible';
import isServicePointDataUpdatedReducer from './features/isServicePointDataUpdated';
import loadingReducer from './features/isLoadingVisible';
import servicePointData from './features/servicePointData';
import servicePointInformation from './features/servicePointInformation';
import sidebarExpandReducer from './features/isSidebarExpand';

export const store: EnhancedStore = configureStore({
  reducer: {
    alertInformationReducer,
    dialogInformation,
    isChargePointDataUpdated,
    isModalVisibleReducer,
    isServicePointDataUpdatedReducer,
    loadingReducer,
    servicePointData,
    servicePointInformation,
    sidebarExpandReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
