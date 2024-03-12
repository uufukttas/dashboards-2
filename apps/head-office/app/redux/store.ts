import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import sidebarExpandReducer from './features/isSidebarExpand';
import loadingReducer from './features/isLoadingVisible';
import selectedCityReducer from './features/setSelectedCity'
import updatedServicePointReducer from './features/selectedServicePoint'
import isModalVisibleReducer from './features/isModalVisible';
import isAlertVisibleReducer from './features/isAlertVisible';
import servicePointData from './features/servicePointData';
import servicePointInformation from './features/servicePointInformation';

export const store: EnhancedStore = configureStore({
  reducer: {
    sidebarExpandReducer,
    loadingReducer,
    selectedCityReducer,
    updatedServicePointReducer,
    isModalVisibleReducer,
    isAlertVisibleReducer,
    servicePointData,
    servicePointInformation,
  },
  devTools: process.env.NODE_ENV !== 'production',
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;