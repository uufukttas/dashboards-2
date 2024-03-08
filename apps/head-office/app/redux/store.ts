import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import sidebarExpandReducer from "./features/isSidebarExpand";
import loadingReducer from './features/isLoadingVisible';
import selectedCityReducer from './features/setSelectedCity'
import updatedServicePointReducer from './features/selectedServicePoint'
import isModalVisibleReducer from "./features/isModalVisible";
import updatedServicePointData from "./features/updatedServicePointData";
import updatedServicePointInfoData from "./features/updatedServicePointInfoData";
import isAlertVisibleReducer from "./features/isAlertVisible";

export const store: EnhancedStore = configureStore({
  reducer: {
    sidebarExpandReducer,
    loadingReducer,
    selectedCityReducer,
    updatedServicePointReducer,
    isModalVisibleReducer,
    updatedServicePointData,
    updatedServicePointInfoData,
    isAlertVisibleReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;