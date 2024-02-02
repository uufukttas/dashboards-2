import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import expandedReducer from "./features/isExpanded";

export const store: EnhancedStore = configureStore({
  reducer: {
    counterReducer,
    expandedReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;