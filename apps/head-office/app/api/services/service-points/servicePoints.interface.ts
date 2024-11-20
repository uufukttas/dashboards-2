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
}
