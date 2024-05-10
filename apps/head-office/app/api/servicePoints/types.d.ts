interface IDeleteResponseDataProps {
    data: boolean;
    message: string;
    success: boolean;
};
interface IGetServicePointsDataProps {
    isDeleted: boolean;
    address: string;
    cityId:number;
    companyId:number;
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
export interface IGetServicePointsResponseProps {
    data: IGetServicePointsProps;
    status?: number;
};