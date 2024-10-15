import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import accessTypeList from './features/accessTypeList';
import activeTabIndex from './features/activeTabIndex';
import alertInformation from './features/alertInformation';
import chargeUnitBrands from './features/chargeUnitBrands';
import chargeUnitData from './features/chargeUnitData';
import chargeUnitInvestors from './features/chargeUnitInvestors';
import chargeUnitList from './features/chargeUnitList';
import configs from './features/setConfig';
import comissionData from './features/comissionData';
import dialogInformation from './features/dialogInformation';
import energyPriceDetails from './features/energyPriceDetails';
import getAllReports from './features/getAllReports';
import isChargePointDataUpdated from './features/isChargePointDataUpdated';
import isComissionListUpdated from './features/isComissionListUpdated';
import isConnectorUpdated from './features/isConnectorUpdated';
import isEnergyPriceListUpdated from './features/isEnergyPriceListUpdated';
import isLoadingVisible from './features/isLoadingVisible';
import isModalVisible from './features/isModalVisible';
import isServicePointDataUpdated from './features/isServicePointDataUpdated';
import isServicePointPermissionsUpdated from './features/isServicePointPermissionsUpdated';
import isTariffListUpdated from './features/isTariffListUpdated';
import isSidebarExpand from './features/isSidebarExpand';
import isUserListUpdated from './features/isUserListUpdated';
import languages from './features/languages';
import permissionsData from './features/permissionsData';
import searchedText from './features/searchProperties';
import servicePoints from './features/servicePoints';
import servicePointData from './features/servicePointData';
import servicePointInformation from './features/servicePointInformation';
import servicePointPermissions from './features/servicePointPermissions';
import setCityInformation from './features/setCityInformation';
import setConnectorProperty from './features/connectorProperty';
import setConnectors from './features/connectorsData';
import setLoginToken from './features/loginToken';
import setVisibleModal from './features/setVisibleModal';
import statusList from './features/statusList';
import userData from './features/userData';
import userProfileInfo from './features/userProfileInfo';
import users from './features/users';
import tariffs from './features/tariffs';
import tariffData from './features/tariffData';

export const store: EnhancedStore = configureStore({
  reducer: {
    accessTypeList,
    activeTabIndex,
    alertInformation,
    chargeUnitBrands,
    chargeUnitData,
    chargeUnitInvestors,
    chargeUnitList,
    comissionData,
    configs,
    dialogInformation,
    energyPriceDetails,
    getAllReports,
    isChargePointDataUpdated,
    isComissionListUpdated,
    isConnectorUpdated,
    isEnergyPriceListUpdated,
    isModalVisible,
    isLoadingVisible,
    isServicePointDataUpdated,
    isServicePointPermissionsUpdated,
    isSidebarExpand,
    isTariffListUpdated,
    isUserListUpdated,
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
    tariffs,
    tariffData,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
