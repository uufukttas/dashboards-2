import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import accessTypeList from './features/accessTypeList';
import alertInformation from './features/alertInformation';
import chargeUnitBrands from './features/chargeUnitBrands';
import chargeUnitData from './features/chargeUnitData';
import chargeUnitInvestors from './features/chargeUnitInvestors';
import comissionData from './features/comissionData';
import dialogInformation from './features/dialogInformation';
import isChargePointDataUpdated from './features/isChargePointDataUpdated';
import isConnectorUpdated from './features/isConnectorUpdated';
import isLoadingVisible from './features/isLoadingVisible';
import isModalVisible from './features/isModalVisible';
import isServicePointDataUpdated from './features/isServicePointDataUpdated';
import isServicePointPermissionsUpdated from './features/isServicePointPermissionsUpdated';
import isSidebarExpand from './features/isSidebarExpand';
import permissionsData from './features/permissionsData';
import servicePoints from './features/servicePoints';
import servicePointData from './features/servicePointData';
import servicePointInformation from './features/servicePointInformation';
import servicePointPermissions from './features/servicePointPermissions';
import statusList from './features/statusList';

export const store: EnhancedStore = configureStore({
  reducer: {
    accessTypeList,
    alertInformation,
    chargeUnitBrands,
    chargeUnitData,
    chargeUnitInvestors,
    comissionData,
    dialogInformation,
    isChargePointDataUpdated,
    isConnectorUpdated,
    isModalVisible,
    isLoadingVisible,
    isServicePointDataUpdated,
    isServicePointPermissionsUpdated,
    isSidebarExpand,
    permissionsData,
    servicePoints,
    servicePointData,
    servicePointInformation,
    servicePointPermissions,
    statusList,
  },
  devTools: process.env.NODE_ENV !== 'production',
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
