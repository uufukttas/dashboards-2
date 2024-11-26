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
  id: null | number;
  isChecked?: boolean;
  name: string;
  rid: number | null;
  stationFeatureType: number;
  stationFeatureValue: number;
}
export interface IFormDataProps {
  [key: string]: boolean | number | string | string[] | IFeatureProps[];
}
export interface IGetServicePointsProps {
  count: number;
  data: IGetServicePointsDataProps[];
  success: boolean;
}
export interface IModalFirstPageInputsProps {
  form: UseFormReturn<IFormDataProps>;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}
export interface IModalFourthPageInputsProps {
  form: UseFormReturn<IFormDataProps>;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}
export interface IModalSecondPageInputsProps {
  form: UseFormReturn<IFormDataProps>;
  activePage: number;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
}
export interface IModalThirdPageInputsProps {
  form: UseFormReturn<IFormDataProps>;
  activePage: number;
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
  address: string;
  cityId: string;
  companyId: number;
  companyName: string;
  districtId: string;
  isActive: boolean;
  isDeleted: boolean;
  latitude: number;
  longitude: number;
  id: number;
  name: string;
  phone: string;
  resellerCompanyId: number;
  resellerName: string;
}
