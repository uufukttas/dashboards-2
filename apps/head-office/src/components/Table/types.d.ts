interface IUserDataProps {
    id: number;
    userName: string;
    email: string;
    phone: string;
    roleNames: string;
    lastLoginDate: string;
    address?: string;
    cityId?: number;
    districtId?: number;
    name?: string;
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
    roleNames: string;
    status?: string;
    lastLoginDate?: string;
    userName?: string;
};

export interface ITableActionsProps {
    tableCellData: IServicePointInfoProps | IUserDataProps;
};

export interface ITableBodyProps {
    attributeName: string;
    tableData: IServicePointInfoProps[] | IUserDataProps[];
    tableDataCount: number;
};

export interface ITableHeaderProps {
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
