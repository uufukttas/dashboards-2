export interface IServicePointDetailResponseProps {
  success: true;
  pagination: null;
  message: null;
  data: [];
  error: null;
  count: null;
}
export interface IServicePoinDetailsInfo {
  address: string;
  addressDetail: string;
  id: number;
  phone1: string;
  phone2: string;
  cityId: number;
  districtId: number;
  lat: number;
  lon: number;
  stationId: number;
}
export interface IDeleteComissionRequestProps {
  rid: number;
  stationId: number;
  isDelete: number;
}
export interface IDeleteEnergyPriceRequestProps {
  Id: number;
}
export interface IDeleteServicePointPermissionRequestProps {
  userId: number;
}
export interface IGetChargePointConnetorsRequestProps {
  stationChargePointId: number;
}
export interface IGetChargeUnitsRequestProps {
  stationId: number;
  PageNumber: number;
  PageSize: number;
}
export interface IGetServicePointDataRequestProps {
  id: number;
}

export interface IStationIdRequestProps {
  stationId: number;
}

interface IFeatureTypeModelProps {
  featureType: number;
}

export interface IStationSelectedValuesRequestProps {
  featureTypeModel: IFeatureTypeModelProps[];
  stationId: number;
};

export interface IStationFeatureRequestProps {
  stationFeatureType: number;
}
export interface IStationFeatureProps {
  StationFeatureType: number;
  StationFeatureValue: string;
}
export interface IServicePointsDetailResponseProps {
  name: string;
  id: number;
  companyId: number;
  resellerName: string;
  resellerCompanyId: number;
  companyName: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IFeatureItemProps {
  rid: number;
  name: string;
}