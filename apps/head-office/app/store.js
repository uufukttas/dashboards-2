"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counters/counterSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});

export default store;