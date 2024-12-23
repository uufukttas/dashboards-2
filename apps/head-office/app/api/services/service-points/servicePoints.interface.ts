import { StationFeatureType } from 'apps/head-office/src/enums/stationFeature.enums';

export interface IGetAllServicePointsRequestBody {
  address?: string;
  city?: string;
  district?: string;
  name?: string;
  pageNumber?: number;
  phoneNumber?: string;
  userCount?: number;
}

export interface ServicePoint {
  isDeleted?: boolean;
  address?: string;
  cityId?: number;
  companyId?: number;
  companyName?: string;
  districtId?: number;
  id?: number;
  isActive?: boolean;
  latitude?: number;
  longitude?: number;
  name?: string;
  phone1?: string;
  phone2?: string;
  resslerId?: number;
  resellerName?: string;
  lat?: number;
  lon?: number;
  addressDetail?: string;
}

export interface IDeleteServicePointRequestBody {
  id: number;
}

export interface IAddStationRequestBody {
  name: string;
  resellerCompanyId: number;
  companyId: number;
  isActive: boolean;
}

export interface IAddStationResponse {
  id: number;
}

export interface IAddStationInfoRequestBody {
  stationId: number;
  address?: string;
  addressDetail?: string;
  cityId?: number;
  districtId?: number;
  lat?: string;
  lon?: string;
  phone1?: string;
  phone2?: string;
  id?: number;
}

export interface IUpdateStationRequestBody {
  companyId: number;
  id: number;
  isActive: boolean;
  name: string;
  resellerCompanyId: number;
}

export interface IUpdateStationResponse {
  "success": true,
  "pagination": null,
  message: string;
  data: null;
  error: null;
  count: null;
}

export interface IUpdateStationInfoRequestBody {
  address?: string;
  addressDetail?: string;
  cityId?: number;
  districtId?: number;
  Id: number;
  lat?: string;
  lon?: string;
  phone1?: string;
  phone2?: string;
}

export interface IDeleteChargePointRequestBody {
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
}

export interface IGetServicePointData {
  companyId: number;
  companyName: string;
  id: number;
  isActive: boolean;
  isDeleted: boolean;
  name: string;
  resellerCompanyId: number;
  resellerName: string;
}

export interface CompanyResponse {
  id: number;
  name: string;
  rid: null;
}

export interface StationFeature {
  isDeleted: boolean;
  rid: number;
  stationFeatureType: StationFeatureType;
  stationFeatureValue: string;
  stationId: number;
}
