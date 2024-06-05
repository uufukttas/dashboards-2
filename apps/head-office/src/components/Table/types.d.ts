export interface IDropdownItemProps {
    id: null | number;
    isChecked?: boolean;
    name: string;
    rid: number | null;
    stationFeatureType: number;
    stationFeatureValue: number;
};
export interface IUserDataProps {
    lastLoginDate: string | null;
    roleNames: string;
    userId: number;
    userName: string;
    id?: number | null | undefined;
};
export interface IRolesStyleProps {
    [key: string]: ITableDataAttributeProps
};
export interface IServicePointInfoProps {
    address: string;
    addressDetail?: string | null | undefined;
    cityId: number;
    districtId: number;
    freePark?: string | null | undefined;
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    opportunities?: string[] | null | undefined;
    paymentMethods?: string[] | null | undefined;
    phone?: string | null | undefined;
    type?: string | null | undefined;
    email?: string;
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
    freePark?: string | null | undefined;
    id?: number | null;
    latitude?: number;
    longitude?: number;
    name?: string;
    opportunities?: string[] | null | undefined;
    paymentMethods?: string[] | null | undefined;
    phone?: string | null | undefined;
    type?: string | null | undefined;
    email?: string;
    status?: string;
    lastLoginDate?: string | null;
    roleNames?: string;
    userId?: number;
    userName?: string;
};
export interface ITableBodyProps {
    attributeName: string;
    tableData: IServicePointInfoProps[] | IUserDataProps[];
    tableDataCount: number;
    tablePlaceholderInitialValue?: ITableBodyPlaceholderProps;
};
export interface ITableDataAttributeProps {
    [key: string]: string | number | undefined;
};
export interface ITableHeaderProps {
    attributeName: string;
    filteredDropdownItems: IDropdownItemProps[];
};
export interface ITableHeadProps {
    tableHeadData: string[];
};
export interface ITableProps {
    attributeName: string;
    filteredDropdownItems: IDropdownItemProps[];
    tableData: IServicePointInfoProps[] | IUserDataProps[];
    tableDataCount: number;
    tableHeadData: string[];
    tablePlaceholderInitialValue?: ITableBodyPlaceholderProps;
};
export interface ITableRowDeleteProps {
    tableCellDataId: number | null | undefined;
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
    tableRowData: ITableBodyPlaceholderProps;
    index?: number;
};
