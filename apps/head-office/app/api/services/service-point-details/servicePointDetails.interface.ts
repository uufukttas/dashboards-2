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
export interface IStationImageAddRequestProps {
  formData: FormData;
}

interface IFeatureTypeModelProps {
  featureType: number;
}

export interface IStationSelectedValuesRequestProps {
  featureTypeModel: IFeatureTypeModelProps[];
  stationId: number;
}

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

export interface IChargeUnitProps {
  accessType: string;
  brandName: string;
  chargePointId: number;
  createdDate: string;
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
  location: string;
  modelId: number;
  model: string;
  ocppVersion: string;
  sendRoaming: boolean;
  stationId: number;
  status: number;
  serialNumber: string;
  statusName: string;
}

export interface IConnectorProps {
  chargingStatus: number;
  chargingStatusMessage: string;
  connectorNr: number;
  energyUsed: number;
  epdkSocketNumber: string;
  isActive: boolean;
  meterStartDate: string;
  modelId: number;
  RID: number;
  stationChargePointID: number;
  stationConnectorAC: boolean;
  stationConnectorKW: number;
  stationConnectorName: string;
  status: number;
  statusName: string;
  tariffId: number;
  tariffName: string;
  tariffSaleUnitPrice: number;
}

export interface IEnergyPricesDataProps {
  createDate: string;
  id: number;
  isActive: boolean;
  isDeleted: boolean;
  price: number;
  startDate: string;
  stationId: number;
}

export interface IEnergyPriceRequestProps {
  stationId: number;
  price: number;
  startDate: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IComissionDataProps {
  ForInvestor: number;
  ID: number;
  IsActive: boolean;
  LocationRelatedID: null | number;
  LocationType: null | number;
  LocationTypeName: string;
  OwnerID: number;
  OwnerName: string;
  OwnerType: number;
  OwnerTypeName: string;
  RID: number;
  Rate: number;
  TariffSubFractionTypeID: number;
  TariffSubFractionTypeName: string;
}

export interface IServicePointPermissionProps {
  name: string;
  surName: string;
  userId: number;
  userName: string;
}
