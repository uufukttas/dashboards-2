import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import sidebarExpandReducer from "./features/isSidebarExpand";
import loadingReducer from './features/isLoading';
import selectedCityReducer from './features/setSelectedCity'
import updatedServicePointReducer from './features/selectedServicePoint'
import isModalVisibleReducer from "./features/isModalVisible";
import updatedServicePointData from "./features/updatedServicePointData";
import updatedServicePointInfoData from "./features/updatedServicePointInfoData";

export const store: EnhancedStore = configureStore({
  reducer: {
    counterReducer,
    sidebarExpandReducer,
    loadingReducer,
    selectedCityReducer,
    updatedServicePointReducer,
    isModalVisibleReducer,
    updatedServicePointData,
    updatedServicePointInfoData,
  },
  devTools: process.env.NODE_ENV !== "production",
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;