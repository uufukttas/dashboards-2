interface IChargeUnitDataProps {
    code: string;
    brandId: number;
    connectorCount: number;
    ocppVersion: number;
    isFreeUsage: boolean;
    isLimitedUsage: boolean;
    investor: number;
    status: string;
    accessType: string;
    location: string;
    chargePointId: number;
};
interface IPermissionsProps {
    id: number;
    phoneNumber: string;
};
interface IServicePointDataProps {
    isDeleted: boolean;
    address: string;
    cityId: number;
    companyId: number;
    companyName: string;
    districtId: number;
    id: number;
    isActive: boolean;
    latitude: number;
    longitude: number;
    name: string;
    phone: string;
    resellerCompanyId: number;
    resellerName: string;
};
interface IServicePointInformationProps {
    id: number;
    name: string;
    type: string;
    lon: number;
    lat: number;
    phone1: string;
    phone2: string;
    address: string;
    addressDetail: string;
    cityId: number;
    districtId: number;
    opportunities: string[];
    freePark: boolean;
    paymentMethods: string[];
};
export interface IChargeUnitBrandsProps {
    id: number;
    isDeleted: boolean;
    name: string;
};
export interface IStationFeatureListItemsProps {
    id: number;
    name: string;
    rid: null;
};
export interface IAlertInformationStateProps {
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
};

export type IChargePointDataStateProps = {
    isChargePointDataUpdated: boolean;
};

export type IChargeUnitDataStateProps = {
    chargeUnitData: IChargeUnitDataProps;
};

export type IDialogInformationStateProps = {
    isVisible: boolean;
    actionType: string;
    data: number;
};
export type IIsConnectorUpdatedProps = {
    isConnectorUpdated: boolean;
};

export type IIsLoadingStateProps = {
    isLoading: boolean;
};

export type IIsModalVisibleStateProps = {
    isModalVisible: boolean;
};
export type IIsServicePointPermissionsUpdatedProps = {
    isServicePointPermissionsUpdated: boolean;
};
export type IIsServicePointDataUpdatedProps = {
    isServicePointDataUpdated: boolean;
};

export type IIsSidebarExpandStateProps = {
    isSidebarExpanded: boolean | null;
};

export type IServicePointDataStateProps = {
    servicePointData: IServicePointDataProps;
};

export type IServicePointInformationStateProps = {
    servicePointInformation: IServicePointInformationProps;
};
export type IServicePointPermissionsStateProps = {
    servicePointPermissions: IPermissionsProps[];
};
export interface IUserDataProps {
    roles: string[];
    userId: number;
};