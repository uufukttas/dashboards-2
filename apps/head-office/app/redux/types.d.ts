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
export type IComissionDataStateProps = {
    ForInvestor: number;
    ID: number;
    IsActive: boolean;
    LocationRelatedID: null;
    LocationType: null;
    LocationTypeName: string;
    OwnerID: number;
    OwnerName: string;
    OwnerType: number;
    OwnerTypeName: string;
    RID: number;
    Rate: number;
    TariffSubFractionTypeID: number;
    TariffSubFractionTypeName: string;
};
export type IDialogInformationStateProps = {
    isVisible: boolean;
    actionType: string;
    data: number;
};
export type IEnergyPriceDetailsStateProps = {
    createdDate: string,
    id: number,
    isActive: boolean,
    isDeleted: boolean,
    price: number,
    startDate: string,
    stationId: number
};
export type IInvestorsProps = {
    id: number;
    name: string;
};
export type IIsConnectorUpdatedProps = {
    isConnectorUpdated: boolean;
};
export type IIsEnergyPriceListUpdatedProps = {
    isEnergyPriceListUpdated: boolean;
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
export interface IPermissionsStateProps {
    phoneNumber: string;
    userName?: string;
    password?: string;
    newPassword?: string;
    eMail?: string;
    ipAddress?: string;
    roles?: string[];
    userId?: number;
    stationId: number;
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