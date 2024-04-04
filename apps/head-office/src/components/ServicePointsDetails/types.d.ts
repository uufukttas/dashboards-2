interface IConnectorProps {
  connectorName: string;
  connectorNr: number;
  id: number;
  isAC: boolean;
  kw: number;
  stationChargePointId: number;
};
interface IConnectorStateProps {
  [key: number]: IConnectorProps[];
}
interface IConvertedStructure {
  stationID: number;
  dayOfTheWeek: number;
  openingTime: string;
  closingTime: string;
  isClosed: boolean;
  isDeleted: boolean;
};
interface IResponse {
  "RID": number,
  "DayOfTheWeek": number,
  "IsClosed": boolean,
  "OpeningTime": string,
  "ClosingTime": string,
  "IsDeleted": boolean
};
interface IResponseItem {
  day: number;
  hour: number;
};
interface IServicePointsDetailsBodyProps {
  activeIndex: number;
  chargeUnits: IChargeUnitsProps[];
  connectorCount: number;
  connectors: IConnectorStateProps[];
  setAddChargeUnit: Dispatch<SetStateAction<boolean>>;
  setAddConnector: Dispatch<SetStateAction<boolean>>;
  slug: string;
};
export interface IAccessTypeProps {
  id: number;
  name: string;
  rid: null;
};
export interface IBrandsProps {
  id: number,
  name: string,
  isDeleted: boolean;
  rid: null;
};
export interface IChargeUnitsProps {
  chargePointId: number;
  connectorNumber: number;
  connectorId: number;
  count: number;
  deviceCode: string;
  externalAddress: string;
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
};
export interface IGetChargePointStationFeatureData {
  id: number;
  stationChargePointFeatureType: number;
  stationChargePointFeatureValue: string;
};
export interface IGetChargePointStationFeatureResponse {
  success: boolean;
  data: IGetChargePointStationFeatureData;
};
export interface IInvestorsProps {
  id: number,
  name: string,
  rid: null;
};
export interface IServicePointsDetailsProps {
  name: string;
  id: string;
  resellerId: string;
  companyId: string;
  resellerName: string;
  companyName: string;
  isActive: boolean;
  isDeleted: boolean;
};
export interface IStatusListProps {
  id: number;
  name: string;
  rid: null;
};
interface IWorkingHoursContentProps {
  slug: number;
};
export interface IChargeUnitsContentProps {
  chargeUnits: IChargeUnitsProps[];
  connectors: IConnectorStateProps[];
  slug: string;
  setAddChargeUnit: React.Dispatch<React.SetStateAction<boolean>>;
  setAddConnector: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface IChargeUnitsProps {
  chargePointId: number;
  connectorNumber: number;
  connectorId: number;
  count: number;
  deviceCode: string;
  externalAddress: string;
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
};
export interface IConnectorBrandProps {
  connectorTypeId: number;
  displayName: string;
};
export interface IFormDataProps {
  [key: string]: boolean | number | string;
};
export interface IServiceDetailsContentProps {
  slug: string;
};
export interface IServicePointsDetailsInfoProps {
  id: number;
  stationId: number;
  address: string;
  phone1: string;
  phone2: string;
  lat: number;
  lon: number;
  cityId: number;
  districtId: number;
};
export interface IServicePointDetailsModalProps {
  slug: string;
  brands: IBrandsProps[];
  investors: IInvestorsProps[];
  accessTypeList: IAccessTypeProps[];
  statusList: IStatusListProps[];
  setConnectorCount: Dispatch<React.SetStateAction<number>>;
};
export interface IServicePointsDetailsPageProps {
  slug: string;
};
