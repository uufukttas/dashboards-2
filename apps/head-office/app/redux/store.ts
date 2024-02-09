import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import sidebarExpandReducer from "./features/isSidebarExpand";
import loadingReducer from './features/isLoading';
import modalStatusReducer from "./features/ServicePointCreateModal";

export const store: EnhancedStore = configureStore({
  reducer: {
    counterReducer,
    sidebarExpandReducer,
    loadingReducer,
    modalStatusReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;