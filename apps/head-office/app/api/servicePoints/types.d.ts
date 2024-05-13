interface IDeleteResponseDataProps {
    data: boolean;
    message: string;
    success: boolean;
};
interface IGetServicePointDataProps {
    companyId: number;
    companyName: string;
    id: number;
    isActive: boolean;
    isDeleted: boolean;
    name: string;
    resellerCompanyId: number;
    resellerName: string;
};
interface IGetServicePointInformationProps {
    address: string;
    addressDetail: string;
    cityId: number;
    districtId: number;
    id: number;
    lat: number;
    lon: number;
    phone1: string;
    phone2: string;
    stationId: number;
};
interface IGetServicePointsDataProps {
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
interface IGetServicePointsProps {
    data: IGetServicePointsDataProps[];
    success: boolean;
    count: number;
};
export interface IDeleteResonseProps {
    data: IDeleteResponseDataProps
    status: number;
};
export interface IServicePointDataResponseProps {
    data: IGetServicePointDataProps[];
    error?: string;
    success: boolean;
};
export interface IServicePointInformationResponseProps {
    data: IGetServicePointInformationProps[];
    error?: string;
    success: boolean;
};
export interface IGetServicePointsResponseProps {
    data: IGetServicePointsProps;
    status?: number;
};