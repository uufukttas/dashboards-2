export interface IDropdownItemProps {
    id: null | number;
    isChecked?: boolean;
    name: string;
    rid: number | null;
    stationFeatureType: number;
    stationFeatureValue: number;
};
export interface IUserDataProps {
    id: number;
    lastLoginDate: string | null;
    roleNames: string;
    userId: number;
    userName: string;
};
export interface IServicePointInfoProps {
    address: string;
    addressDetail?: string | null | undefined;
    cityId: number;
    districtId: number;
    email?: string;
    freePark?: string | null | undefined;
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    opportunities?: string[] | null | undefined;
    paymentMethods?: string[] | null | undefined;
    phone?: string | null | undefined;
    type?: string | null | undefined;
    status?: string;
};
export interface ITableActionsProps {
    servicePointId?: number;
    userId?: number;
};
export interface ITableBodyPlaceholderProps {
    address?: string;
    addressDetail?: string | null | undefined;
    cityId?: number;
    districtId?: number;
    email?: string;
    freePark?: string | null | undefined;
    id: number;
    lastLoginDate?: string | null;
    latitude?: number;
    longitude?: number;
    name?: string;
    opportunities?: string[] | null | undefined;
    paymentMethods?: string[] | null | undefined;
    phone?: string | null | undefined;
    phoneNumber?: string;
    roleNames?: string;
    status?: string;
    type?: string | null | undefined;
    userId?: number;
    userName?: string;
    surName?: string;
    tariffName?: string;
    saleUnitPrice? : number;
    createDate?: string;
    validityBeginDate?: string;
    validityEndDate?: string;
    trxId?: number,
    StationConnectorID?: number,
    stationConnectorConnectorNr?: number,
    stationChargePointCode?: string,
    MeterStartDate?: string,
    MeterFinishDate?: string,
    EnergyUsed?: number,
    startDate?: string,
    finishDate?: string,
    chargeProcessElapsedTime?: number,
    unitPrice?: number,
    PriceENRJ?: number,
    PriceSRV?: number,
    commissionServicePointPrice?: null,
    commissionResellerPrice?: null,
    totalAmountWithOutKDV?: number,
    totalAmount?: number,
    ChargingStatus?: number,
    ChargingStatusMessage?: string,
    StationID?: number,
    stationName?: string,
    ResellerCompanyID?: number,
    CompanyID?: number,
    stationChargePointConnectorTypeName?: string,
    ConsumerCompanyID?: number,
    BatteryPercentDesc?: string,
    batteryBeginningPercent?: number,
    batteryPercent?: number,
    EMail?: string,
    GSMNr?: string,
    NameSurname?: string
    socketNo?: number;
    kWh?: number;
    priceCalculationTime?: number;
    electricityAmount?: number;
    servicePrice?: number;
    bankOrderNo?: string;
    paidAmount?: number;
    preChargeAmount?: number;
    plate?: number;
    brand?: string;
    model?: string;
};
export interface ITableBodyProps {
    attributeName: string;
    roleStyles?: IRolesStyleProps;
    tableData: IServicePointInfoProps[] | IUserDataProps[];
    tableDataCount: number;
    tablePlaceholderInitialValue: ITableBodyPlaceholderProps;
};
export interface ITableDataAttributeProps {
    [key: string]: string | number | undefined | null;
};
export interface ITableHeaderProps {
    buttonText: string;
    filteredDropdownItems: IDropdownItemProps[];
};
export interface ITableHeadProps {
    attributeName: string;
    tableHeadData: string[];
};
export interface ITableProps {
    attributeName: string;
    buttonText: string;
    className?: string;
    filteredDropdownItems: IDropdownItemProps[];
    roleStyles?: IRolesStyleProps;
    tableData: IServicePointInfoProps[] | IUserDataProps[];
    tableDataCount: number;
    tableHeadData: string[];
    tablePlaceholderInitialValue: ITableBodyPlaceholderProps;
};
export interface ITableRowDeleteProps {
    attributeName: string;
    tableCellDataId: number;
};
export interface ITableRowDetailProps {
    tableCellData: ITableBodyPlaceholderProps;
};
export interface ITableRowEditProps {
    attributeName: string;
    tableCellData: ITableBodyPlaceholderProps;
};
export interface ITableRowProps {
    attributeName: string;
    roleStyles?: IRolesStyleProps;
    tableRowData: ITableBodyPlaceholderProps;
};
