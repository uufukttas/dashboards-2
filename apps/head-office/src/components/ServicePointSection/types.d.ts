export interface ICitiesProps {
  id: null;
  rid: number;
  plateCode: number;
  name: string;
}
export interface ICompanyProps {
  id: number;
  name: string;
  rid: null;
}
export interface IFeatureProps {
  stationId?: number;
  rid: number;
  stationFeatureType?: number;
  stationFeatureValue?: string;
  isDeleted?: boolean;
}
export interface IFormDataProps {
  [key: string]: boolean | number | string | string[] | IFeatureProps[];
}
export interface IGetServicePointsProps {
  count: number;
  data: IGetServicePointsDataProps[];
  success: boolean;
}
export interface IServicePointModalPageProps {
  activePage: number;
  form: UseFormReturn<IFormDataProps>;
  modalName?: string;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}
export interface IPaginationProps {
  currentPage: number;
  totalCounts: number;
  setCurrentPage: (currentPage: number) => void;
}
export interface IPaginationItemProps {
  children: React.ReactNode;
  isActive: boolean;
  isDisabled: boolean;
  pageNumber: number;
  onClick: () => void;
}
export interface IPayloadProps {
  address?: string;
  cityName?: string;
  districtName?: string;
  name?: string;
  pageNumber?: number;
  phone?: string;
  userCount?: number;
}
export interface IResponseDataProps {
  data: boolean;
  message: string;
  success: boolean;
}
export interface IRowDataProps {
  address: string;
  cityId: string;
  districtId: string;
  id: number;
  name: string;
  phone: string;
}
export interface ISelectedColumnProps {
  field: string;
  header: string;
  isRemovable: boolean;
}
export interface IServicePoint {
  id: number;
  name: string;
  cityId: number;
  districtId: number;
  address: string;
  phoneNumber: string;
}
export interface IServicePointData {
  address?: string;
  addressDetail?: string;
  city?: string;
  cityId?: number;
  companyId?: number;
  companyName?: string;
  district?: string;
  districtId?: number;
  id?: number;
  isActive?: boolean;
  isDeleted?: boolean;
  lat?: number;
  lng?: number;
  name?: string;
  phone1?: string;
  phone2?: string;
  resellerId?: number;
  resellerName?: string;
}

export interface IBaseTableColumn {
  accessor: string;
  align?: 'left' | 'right' | 'center';
  bodyTemplate?: (rowData: IRowDataProps) => JSX.Element;
  className?: string;
  field: string;
  header: string,
  id: string;
  isRemovable: boolean;
  style?: Record<string, unknown>;
  type: 'string' | 'number' | 'date' | 'boolean' | 'custom';
};

export interface IServicePointModalFormProps {
  modalName: string;
  stationId?: number;
}

export interface IServicePointModalFormData {
  address: string;
  'address-detail': string;
  'city-id': number;
  'company-id': number;
  'district-id': number;
  'free-park-count': number | null;
  id: number | undefined;
  lat: number;
  lng: number;
  name: string;
  'payment-methods': IFeatureProps[];
  phone1: string;
  phone2: string;
  opportunities: IFeatureProps[];
  'reseller-company-id': number;
}

interface ILocation {
  lat: number;
  lng: number;
}

export interface IMapProps {
  onSelectLocation: (location: ILocation) => void;
  cityId: number;
  districtId: number;
  lat: number;
  lng: number;
}

export interface IFeatureConfigData {
  stationId: number;
  stationFeatureType: number;
  stationFeatureValue: number;
  isDeleted: boolean;
}

export interface IChargePointFeatureProps {
  id: number;
  stationChargePointFeatureType: number;
  stationChargePointFeatureTypeValue: string;
}
