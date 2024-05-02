interface IConnectorAddModalProps {
  connectorProperty: {
    chargePointId: number,
    chargePointModelId: number,
    connectorNumber: number,
    connectorId: number
  };
};
interface IConnectorProps {
  RID: number;
  connectorName: string;
  connectorNr: number;
  id: number;
  isAc: boolean;
  kw: number;
  stationChargePointID: number;
  epdkSocketNumber: number;
};
interface IConnectorStateProps {
  [key: number]: IConnectorProps[][][][];
  stationChargePointID: number;
  connectorNr: number;
  epdkSocketNumber: number;
  isAc: boolean;
  modelID: number;
  kw: number;
  RID: number;
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
  RID: number,
  DayOfTheWeek: number,
  IsClosed: boolean,
  OpeningTime: string,
  ClosingTime: string,
  IsDeleted: boolean
};
interface IResponseItem {
  day: number;
  hour: number;
};
interface IRequestDataProps {
  chargePointId: number;
  features: { id: number, stationChargePointFeatureType: number, stationChargePointFeatureTypeValue: string }[];
}
interface IServicePointsDetailsBodyProps {
  activeIndex: number;
  chargeUnits: IChargeUnitsProps[];
  connectorsList: IConnectorStateProps[];
  setAddChargeUnit: Dispatch<SetStateAction<boolean>>;
  setAddConnector: Dispatch<SetStateAction<boolean>>;
  setAddEnergyPrice: Dispatch<SetStateAction<boolean>>;
  setConnectorProperty: Dispatch<SetStateAction<{
    chargePointId: number,
    chargePointModelId: number,
    connectorNumber: number,
    connectorId: number
  }>>;
  slug: string;
};
interface IWorkingHoursContentProps {
  slug: number;
};
export interface IAccessTypeListItemProps {
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

export interface IChargeUnitsContentProps {
  chargeUnits: IChargeUnitsProps[];
  connectorsList: IConnectorStateProps[];
  slug: string;
  setAddChargeUnit: React.Dispatch<React.SetStateAction<boolean>>;
  setAddConnector: React.Dispatch<React.SetStateAction<boolean>>;
  setConnectorProperty: React.Dispatch<SetStateAction<{
    chargePointId: number,
    chargePointModelId: number,
    connectorNumber: number,
    connectorId: number
  }>>;
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
export interface IConnectorBrandProps {
  connectorTypeId: number;
  displayName: string;
};
export interface IEnergyPriceDetailsProps {
  id: number;
  stationId: number;
  price: number;
  startDate: string;
  isActive: boolean;
  isDeleted: boolean;
};
export interface IFeatureProps {
  stationId?: number;
  id: null | number;
  isChecked?: boolean;
  name: string; 
  rid: number | null;
  stationFeatureType: number;
  stationFeatureValue: number;
};
export interface IGetChargePointStationFeatureData {
  id: number;
  stationChargePointFeatureType: number;
  stationChargePointFeatureValue: string;
};
export interface IGetChargePointStationFeatureResponse {
  success: boolean;
  data: IGetChargePointStationFeatureData[];
};
export interface IInvestorsProps {
  id: number,
  name: string,
  rid: null;
};
export interface IServicePointsDetailsProps {
  name: string;
  id: number;
  companyId: number;
  resellerName: string;
  resellerCompanyId: number;
  companyName: string;
  isActive: boolean;
  isDeleted: boolean;
};
export interface IStatusListItemProps {
  id: number;
  name: string;
  rid: null;
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
  addressDetail: string;
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
  accessTypeList: IAccessTypeListItemProps[];
  statusList: IStatusListItemProps[];
  setAddChargeUnit: React.Dispatch<React.SetStateAction<boolean>>;
};
export interface IServicePointsDetailsPageProps {
  slug: string;
};
export interface IServicePointDetailsHeaderProps {
  servicePointDetailsName: string;
  servicePointDetailsStatus: boolean;
};
export interface ITimeSlot {
  rid?: number;
  day: number;
  hour: number;
  isSelected: boolean;
  isSelectable: boolean;
  isPassive: boolean;
};