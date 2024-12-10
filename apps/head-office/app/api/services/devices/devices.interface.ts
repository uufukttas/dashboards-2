export interface IAddDeviceBrandRequestProps {
  name: string;
  imageCdnUrl: string;
};
export interface IBrandModelDataProps {
  brandId: number;
  id: number;
  imageCdnUrl: string | null;
  name: string;
};
export interface IDeviceBrandDataProps {
  id: number;
  imageCdnUrl: string | null;
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
