export interface IConnectorModel {
  stationChargePointModelConnectorId: number;
  displayName: string;
};
interface IConnectorPropertyProps {
  chargePointId: number,
  chargePointModelId: number,
  connectorNumber: number,
  connectorId: number
};
interface IConnectorProps {
  RID: number;
  connectorName: string;
  connectorNr: number;
  id: number;
  isAC: boolean;
  kw: number;
  stationChargePointID: number;
  epdkSocketNumber: number;
};
interface IConnectorStateProps {
  [key: number]: IConnectorProps[][][][];
  stationChargePointID: number;
  connectorNr: number;
  epdkSocketNumber: number;
  isAC: boolean;
  modelId: number;
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
interface IPermissionsProps {
  userId: number;
  userName: string;
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
interface IWorkingHoursContentProps {
  slug: number;
};
export interface IAccordionConfigProps {
  actionButton?: React.ReactNode;
  accordionContent: React.ReactNode;
  accordionTitle: string;
  titleClassName: string;
  accordionIcon?: React.ReactNode;
};
export interface IBrandsProps {
  id: number,
  name: string,
  isDeleted: boolean;
  rid: null;
};

export interface IChargeUnitsContentProps {
  chargeUnits: IChargeUnitsProps[];
  slug: string;
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
export interface IComissionDetailProps {
  slug: string;
};
export interface IComissionProps {
  RID: number;
  ID: number;
  TariffSubFractionTypeID: number;
  TariffSubFractionTypeName: string;
  Rate: number;
  OwnerType: number;
  OwnerTypeName: string
  OwnerID: number;
  OwnerName: string;
  IsActive: boolean;
  IsActive: null,
  LocationTypeName: string;
  LocationRelatedID: null,
  ForInvestor: number;
};
export interface IConnectorInfoProps {
  connectorId: number;
};
export interface IConnectorModelProps {
  success: boolean;
  data: IConnectorModel[];
};
export interface IEnergyPriceDetailsProps {
  id: number;
  stationId: number;
  price: number;
  startDate: string;
  isActive: boolean;
  isDeleted: boolean;
};
export interface IEnergyPriceModalProps {
  price: number;
  time: string;
  isActive: boolean
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
export interface IFeatureTypeListProps {
  id: number;
  name: string;
  rid: null;
};
export interface IInvestorsProps {
  id: number,
  name: string,
  rid: null;
};
export interface IFeatureValueProps {
  name: string;
  rid: number;
};
export interface IModalConfigProps {
  condition: boolean;
  headerTitle: string;
  modalId: string;
  content: React.ReactNode;
  closeAction: () => void;
};
export interface IServicePointDetailsContentProps { 
  slug: string;
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
export interface IFormDataProps {
  [key: string]: boolean | number | string;
};
export interface IServiceDetailsContentProps {
  slug: string;
};
export interface IServicePointsEnergyPricesContentProps {
  setIsEnergyPriceListUpdated: React.Dispatch<React.SetStateAction<boolean>>;
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
};
export interface IServicePointPermissionsModalProps {
  slug: string;
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
