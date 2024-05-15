interface IUserDataProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string[];
    status: string;
    address?: string;
    cityId?: number;
    districtId?: number;
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
    role?: string[];
    status?: string;
};

export interface ITableProps {
    searchedText: string;
    tableData: IServicePointInfoProps[] | IUserDataProps[];
    tableDataCount: number;
    tableHeadData: string[];
    setSearchedText: React.Dispatch<React.SetStateAction<string>>;
};

export interface ITableHeaderProps {
    searchedText: string;
    setSearchedText: React.Dispatch<React.SetStateAction<string>>;
};