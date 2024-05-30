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
export interface ITableBodyProps {
    attributeName: string;
    tableData: IServicePointInfoProps[] | IUserDataProps[];
    tableDataCount: number;
};
export interface ITableDataAttributeProps {
    [key: string]: string | number | undefined;
};
export interface ITableHeaderProps {
    attributeName: string;
    searchedText: string;
    setSearchedText: React.Dispatch<React.SetStateAction<string>>;
};
export interface ITableProps {
    attributeName: string;
    searchedText: string;
    tableData: IServicePointInfoProps[] | IUserDataProps[];
    tableDataCount: number;
    tableHeadData: string[];
    setSearchedText: React.Dispatch<React.SetStateAction<string>>;
};
export interface ITableRowProps {
    attributeName: string;
    tableRowData: IServicePointInfoProps | IUserDataProps;
    index: number;
};
