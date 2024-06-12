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
export interface IChargeUnitsProps {
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
export interface IDeleteResonseProps {
    data: IDeleteResponseDataProps
    status: number;
};
export interface ICompanyRequestProps {
    id: number;
    name: string;
    rid: null;
};
export interface IFormDataProps {
    [key: string]: boolean | number | string | string[] | IFeatureProps[];
};
export interface IGetAllServicePointPayloadProps {
    address?: string;
    city?: string;
    district?: string;
    name?: string;
    pageNumber?: number;
    phoneNumber?: string;
    userCount?: number;
};
export interface IResellerRequestProps {
    id: number;
    name: string;
    rid: null;
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