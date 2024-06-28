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
    RID?: number;
    trxNo?: number;
    station?: string;
    unitCode?: string;
    socketNo?: string;
    socketType?: string;
    startTime?: string;
    chargeDuration?: string;
    endTime?: string;
    unitPrice?: string;
    kWh?: string;
    batteryPercentage?: string;
    priceCalculationTime?: string;
    totalAmount?: string;
    totalAmountWithVAT?: string;
    electricityAmount?: string;
    servicePrice?: string;
    servicePointCommission?: string;
    resellerCommission?: string;
    bankOrderNo?: number;
    paidAmount?: string;
    preChargeAmount?: string;
    plate?: string;
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
    tableHeadData: string[];
};
export interface ITableProps {
    attributeName: string;
    buttonText: string;
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
