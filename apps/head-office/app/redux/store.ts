import { combineReducers, configureStore, EnhancedStore } from '@reduxjs/toolkit';
import baseApi from '../api/baseApi';
import accessTypeList from './features/accessTypeList';
import activeTabIndex from './features/activeTabIndex';
import alertInformation from './features/alertInformation';
import chargeUnitBrands from './features/chargeUnitBrands';
import chargeUnitData from './features/chargeUnitData';
import chargeUnitInvestors from './features/chargeUnitInvestors';
import chargeUnitList from './features/chargeUnitList';
import comissionData from './features/comissionData';
import setConnectorProperty from './features/connectorProperty';
import setConnectors from './features/connectorsData';
import dashboardComponentInfo from './features/dashboardComponentInfo';
import dialogInformation from './features/dialogInformation';
import energyPriceDetails from './features/energyPriceDetails';
import getAllReports from './features/getAllReports';
import helperDashboardComponentInfo from './features/helperDashboardComponentInfo';
import isChargePointDataUpdated from './features/isChargePointDataUpdated';
import isComissionListUpdated from './features/isComissionListUpdated';
import isConnectorUpdated from './features/isConnectorUpdated';
import isEnergyPriceListUpdated from './features/isEnergyPriceListUpdated';
import isLoadingVisible from './features/isLoadingVisible';
import isModalVisible from './features/isModalVisible';
import isServicePointDataUpdated from './features/isServicePointDataUpdated';
import isServicePointPermissionsUpdated from './features/isServicePointPermissionsUpdated';
import isSidebarExpand from './features/isSidebarExpand';
import languages from './features/languages';
import setLoginToken from './features/loginToken';
import permissionsData from './features/permissionsData';
import searchedText from './features/searchProperties';
import servicePointData from './features/servicePointData';
import servicePointInformation from './features/servicePointInformation';
import servicePointPermissions from './features/servicePointPermissions';
import servicePoints from './features/servicePoints';
import setCityInformation from './features/setCityInformation';
import configs from './features/setConfig';
import setVisibleModal from './features/setVisibleModal';
import statusList from './features/statusList';
import userData from './features/userData';
import userProfileInfo from './features/userProfileInfo';
import users from './features/users';
import modalReducer from './modal/modalSlice';

const reducers = combineReducers({
  accessTypeList,
  activeTabIndex,
  alertInformation,
  chargeUnitBrands,
  chargeUnitData,
  chargeUnitInvestors,
  chargeUnitList,
  comissionData,
  configs,
  dashboardComponentInfo,
  dialogInformation,
  energyPriceDetails,
  getAllReports,
  helperDashboardComponentInfo,
  isChargePointDataUpdated,
  isComissionListUpdated,
  isConnectorUpdated,
  isEnergyPriceListUpdated,
  isLoadingVisible,
  isModalVisible,
  isServicePointDataUpdated,
  isServicePointPermissionsUpdated,
  isSidebarExpand,
  languages,
  permissionsData,
  searchedText,
  servicePoints,
  servicePointData,
  servicePointInformation,
  servicePointPermissions,
  setCityInformation,
  setConnectorProperty,
  setConnectors,
  setLoginToken,
  setVisibleModal,
  statusList,
  userData,
  userProfileInfo,
  users,
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
