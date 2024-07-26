interface IChargeUnitDataProps {
    accessType: string;
    brandId: number;
    chargePointId: number;
    code: string;
    connectorCount: number;
    investor: number;
    isFreeUsage: boolean;
    isLimitedUsage: boolean;
    isRoaming: boolean;
    location: string;
    ocppVersion: number;
    serialNumber: string;
    status: string;
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
interface IUserDataRoleProps {
    id: number;
    isChecked: boolean;
    name: string;
    rid: null,
    stationFeatureType: number,
    stationFeatureValue: number,
};
export interface IAlertInformationStateProps {
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
};
export interface IChargeUnitBrandsProps {
    id: number;
    isDeleted: boolean;
    name: string;
};
export interface IChargePointDataStateProps {
    isChargePointDataUpdated: boolean;
};
export interface IChargeUnitDataStateProps {
    chargeUnitData: IChargeUnitDataProps;
};
export interface IChargeUnitListStateProps {
    accessType: string;
    chargePointId: number;
    connectorNumber: number;
    connectorId: number;
    count: number;
    deviceCode: string;
    externalAddress: string;
    hoStatus: string;
    internalAddress: string;
    investor: string;
    isFreePoint: boolean;
    lastHeartBeat: string;
    limitedUsage: boolean;
    modelId: number;
    model: string;
    ocppVersion: string;
    sendRoaming: boolean;
    stationId: number;
    status: string;
    location: string;
};
export interface IComissionDataStateProps {
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
export interface IConnectorPropertyStateProps {
    chargePointId: number;
    chargePointModelId: number;
    connectorId: number;
    connectorNumber: number;
};
export interface IConnectorsDataStateProps {
    RID: number;
    chargingStatus: null;
    chargingStatusMessage: null;
    cityName: string;
    code: string;
    companyID: number;
    companyName: string;
    connectorName: string;
    connectorNr: number;
    districtName: string;
    energyUsed: null;
    epdkSocketNumber: string;
    hoStatusStatusName: string;
    isAC: boolean;
    isActive: boolean;
    isFreePoint: string;
    kw: number;
    lastConnectionDate: string;
    meterStartDate: null
    modelID: number;
    modelName: string;
    stationChargePointID: number;
    stationConnectorAC: boolean;
    stationConnectorKW: number;
    stationID: number;
    stationName: string;
    status: number;
    statusName: string;
};
export interface IDialogInformationStateProps {
    isVisible: boolean;
    actionType: string;
    data: number;
};
export interface IEnergyPriceDetailsStateProps {
    createdDate: string,
    id: number,
    isActive: boolean,
    isDeleted: boolean,
    price: number,
    startDate: string,
    stationId: number
};
export interface IInvestorsProps {
    id: number;
    name: string;
};
export interface IIsComissionListUpdatedProps {
    isComissionListUpdated: boolean;
};
export interface IIsConnectorUpdatedProps {
    isConnectorUpdated: boolean;
};
export interface IIsEnergyPriceListUpdatedProps {
    isEnergyPriceListUpdated: boolean;
};
export interface IIsLoadingStateProps {
    isLoading: boolean;
};
export interface IIsModalVisibleStateProps {
    isModalVisible: boolean;
};
export interface IIsServicePointPermissionsUpdatedProps {
    isServicePointPermissionsUpdated: boolean;
};
export interface IIsServicePointDataUpdatedProps {
    isServicePointDataUpdated: boolean;
};
export interface IIsSidebarExpandStateProps {
    isSidebarExpanded: boolean | null;
};
export interface IIsUserListUpdatedProps {
    isUserListUpdated: boolean;
};
export interface IIsTariffListUpdatedProps {
    isTariffListUpdated: boolean;
};
export interface ILanguageStateProps {
    languages: IDropdownItemProps[];
};
export interface ILoginTokenProps {
    loginToken: string;
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
export interface IReportDataProps {
    trxId?: number,
    StationConnectorID?: number,
    StationConnectorConnectorNr?: number,
    StationChargePointCode?: string,
    MeterStartDate?: string,
    MeterFinishDate?: string,
    EnergyUsed?: number,
    StartDate?: string,
    FinishDate?: string,
    ChargeProcessElapsedTime?: number,
    UnitPrice?: number,
    PriceENRJ?: number,
    PriceSRV?: number,
    CommissionServicePointPrice?: null,
    CommissionResellerPrice?: null,
    TotalAmountWithOutKDV?: number,
    TotalAmount?: number,
    ChargingStatus?: number,
    ChargingStatusMessage?: string,
    StationID?: number,
    StationName?: string,
    ResellerCompanyID?: number,
    CompanyID?: number,
    StationChargePointConnectorTypeName?: string,
    ConsumerCompanyID?: number,
    BatteryPercentDesc?: string,
    BatteryBeginningPercent?: number,
    BatteryPercent?: number,
    EMail?: string,
    GSMNr?: string,
    NameSurname?: string
};
export interface IReportsDataStateProps {
    reportsData: IReportDataProps[];
    reportsCount: number;
};
export interface IResourceTextProps {
    [key: string]: string;
};
export interface ISearchPropertiesProps {
    searchedConditions: string[];
    searchedText: string;
};
export interface IServicePointDataStateProps {
    servicePointData: IServicePointDataProps;
};
export interface IServicePointInformationStateProps {
    servicePointInformation: IServicePointInformationProps;
};
export interface IServicePointPermissionsStateProps {
    servicePointPermissions: IPermissionsProps[];
};
export interface IStationFeatureListItemsProps {
    id: number;
    name: string;
    rid: null;
};
export interface ITariffDataProps {
    createDate: string
    id: number
    isActive: boolean
    minKW: number
    maxKW: number
    isDeleted: boolean
    name: string
    validityEndDate: string
    validityStartDate: string
    SaleUnitPrice: number
};
export interface IUserDataProps {
    roles: IUserDataRoleProps[];
    userId: number;
    name: string;
    surname: string;
    eMail: string;
    phoneNumber: string;
    userName: string;
};
export interface IUserProfileInfoProps {
    userId: string;
    name: string;
    surname: string;
    eMail: string;
    userName: string;
    phoneNumber: string;
    roles: string[];
};
export interface IUsersProps {
    userId: number;
    userName: string;
    roleNames: string;
    lastLoginDate: string | null;
};
