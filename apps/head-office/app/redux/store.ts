import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import expandedReducer from "./features/isExpanded";
import modalStatusReducer from "./features/ServicePointCreateModal";
import loginAlertReducer from "./features/loginAlert";

export const store: EnhancedStore = configureStore({
  reducer: {
    counterReducer,
    expandedReducer,
    modalStatusReducer,
    loginAlertReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;