import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import sidebarExpandReducer from "./features/isSidebarExpand";
import loadingReducer from './features/isLoading';
import modalStatusReducer from "./features/ServicePointCreateModal";
import selectedCityReducer from './features/setSelectedCity'
import updatedServicePointReducer from './features/selectedServicePoint'

export const store: EnhancedStore = configureStore({
  reducer: {
    counterReducer,
    sidebarExpandReducer,
    loadingReducer,
    modalStatusReducer,
    selectedCityReducer,
    updatedServicePointReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;