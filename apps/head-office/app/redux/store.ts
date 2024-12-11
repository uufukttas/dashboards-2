import { combineReducers, configureStore, EnhancedStore } from '@reduxjs/toolkit';
import baseApi from '../api/baseApi';
import activeTabIndex from './features/activeTabIndex';
import alertInformation from './features/alertInformation';
import dialogInformation from './features/dialogInformation';
import getAllReports from './features/getAllReports';
import isLoadingVisible from './features/isLoadingVisible';
import isModalVisible from './features/isModalVisible';
import isSidebarExpand from './features/isSidebarExpand';
import languages from './features/languages';
import setLoginToken from './features/loginToken';
import searchedText from './features/searchProperties';
import modalReducer from './modal/modalSlice';

const reducers = combineReducers({
  activeTabIndex,
  alertInformation,
  dialogInformation,
  getAllReports,
  isLoadingVisible,
  isModalVisible,
  isSidebarExpand,
  languages,
  searchedText,
  setLoginToken,
  modal: modalReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store: EnhancedStore = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
