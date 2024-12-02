
export interface IConnectorStateProps {
  ac: boolean;
  id: number;
  kwh: number;
  stationChargePointBrandID: number;
  stationChargePointBrandName: string;
  stationChargePointConnectorTypeID: number;
  stationChargePointConnectorTypeName: string;
  stationChargePointModelID: number;
  stationChargePointModelName: string
};
export interface IConnectorRequestBody {
  ac: boolean;
  id: number;
  kwh: number;
  stationChargePointModelID: number;
  stationChargePointConnectorTypeID: number;
};
export interface IDeviceBrandDataProps {
  id: number;
  imageCdnUrl: string | null;
  name: string | null;
};
export interface IDeviceModelDataProps {
  brandId: number;
  id: number;
  imageCdnUrl: string;
  name: string;
};
export interface IDeviceResponsesProps {
  count: null | number;
  data: IDeviceBrandDataProps[];
  error: null | string;
  message: null | string;
  pagination: null | number;
  success: boolean;
};
export interface IHeaderProps {
  name: string;
  id: 0;
  imageCdnUrl: string;
};
export interface IMenuItemsProps {
  items: IDeviceBrandDataProps[] | IConnectorStateProps[];
};
