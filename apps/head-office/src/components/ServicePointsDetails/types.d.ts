export interface IConnectorModel {
  stationChargePointModelConnectorId: number;
  displayName: string;
}
interface IConnectorPropertyProps {
  chargePointId: number;
  chargePointModelId: number;
  connectorNumber: number;
  connectorId: number;
}
export interface IConnectorProps {
  chargingStatus: number | null;
  chargingStatusMessage: string | null;
  connectorNr: number;
  energyUsed: number | null;
  epdkSocketNumber: string;
  isActive: boolean;
  meterStartDate: string | null;
  modelId: number;
  RID: number;
  stationChargePointID: number;
  stationConnectorAC: boolean | null;
  stationConnectorKW: number | null;
  stationConnectorName: string | null;
  status: number;
  statusName: string;
  tariffId: number | null;
  tariffName: string | null;
  tariffSaleUnitPrice: number | null;
}
interface IConvertedStructure {
  stationID: number;
  dayOfTheWeek: number;
  openingTime: string;
  closingTime: string;
  isClosed: boolean;
  isDeleted: boolean;
}
interface IPermissionsProps {
  userId: number;
  userName: string;
}
interface IResponse {
  RID: number;
  DayOfTheWeek: number;
  IsClosed: boolean;
  OpeningTime: string;
  ClosingTime: string;
  IsDeleted: boolean;
}
interface IResponseItem {
  day: number;
  hour: number;
}
interface IRequestDataProps {
  chargePointId: number;
  features: { id: number; stationChargePointFeatureType: number; stationChargePointFeatureTypeValue: string }[];
}
interface IWorkingHoursContentProps {
  stationId: number;
}
export interface IAccordionConfigProps {
  actionButton?: React.ReactNode;
  accordionContent: React.ReactNode;
  accordionTitle: string;
  titleClassName: string;
  accordionIcon?: React.ReactNode;
}
export interface IBrandsProps {
  id: number;
  name: string;
  isDeleted: boolean;
  rid: null;
}

export interface IChargeUnitsContentProps {
  stationId: number;
}
export interface IChargeUnitProps {
  accessType: string;
  brandName: string;
  chargePointId: number;
  connectorNumber: number;
  connectorId: number;
  count: number;
  createdDate: string;
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
  serialNumber: string;
  stationId: number;
  status: number;
  statusName: string;
}
export interface IComissionDetailProps {
  stationId: number;
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
export interface IConnectorInfoProps {
  connectorId: number;
}
export interface IConnectorModelProps {
  success: boolean;
  data: IConnectorModel[];
}
export interface IEnergyPriceDetailsProps {
  id: number;
  stationId: number;
  price: number;
  startDate: string;
  isActive: boolean;
  isDeleted: boolean;
}
export interface IEnergyPriceModalProps {
  price: number;
  time: string;
  isActive: boolean;
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
export interface IGetChargePointStationFeatureData {
  id: number;
  stationChargePointFeatureType: number;
  stationChargePointFeatureValue: string;
}
export interface IGetChargePointStationFeatureResponse {
  success: boolean;
  data: IGetChargePointStationFeatureData[];
}
export interface IFeatureTypeListProps {
  id: number;
  name: string;
  rid: null;
}
export interface IInvestorsProps {
  id: number;
  name: string;
  rid: null;
}
export interface IFeatureValueProps {
  name: string;
  rid: number;
}
export interface IModalConfigProps {
  condition:
    | boolean
    | {
        isVisible: boolean;
      };
  headerTitle: string;
  modalId: string;
  content: React.ReactNode;
  closeAction: () => void;
  className?: string;
  containerClassName?: string;
}
export interface IServicePointDetailsContentProps {
  activeTabIndex: number;
  stationId: number;
}
export interface IServicePointsDetailsProps {
  name: string;
  id: number;
  companyId: number;
  resellerName: string;
  resellerCompanyId: number;
  companyName: string;
  isActive: boolean;
  isDeleted: boolean;
}
export interface IFormDataProps {
  [key: string]: string | number | boolean | undefined;
}
export interface IServiceDetailsContentProps {
  slug: string;
}
export interface IServicePointsEnergyPricesContentProps {
  setIsEnergyPriceListUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  slug: string;
}
export interface IServicePointsDetailsInfoProps {
  address: string;
  addressDetail: string;
  cityId: number;
  districtId: number;
  id: number;
  lat: number;
  lon: number;
  phone1: string;
  phone2: string;
  stationId: number;
}
export interface IServicePointDetailsModalProps {
  slug: string;
}
export interface IServicePointPermissionsModalProps {
  stationId: number;
}
export interface IServicePointsDetailsPageProps {
  slug: string;
}
export interface IServicePointDetailsHeaderProps {
  servicePointDetailsName: string;
  servicePointDetailsStatus: boolean;
}
export interface ITabsItemProps {
  title: string | JSX.Element;
}
export interface ITimeSlot {
  rid?: number;
  day: number;
  hour: number;
  isSelected: boolean;
  isSelectable: boolean;
  isPassive: boolean;
}

export interface IScheduleItemProps {
  time: string;
  days: Array<{ selected: boolean; rid: number | null }>;
}

export interface IPositionProps {
  hourIndex: number;
  dayIndex: number;
}

export interface ISelectedTimeProps {
  day: string;
  startTime: string;
  endTime: string;
  rid: number | null;
}
export interface ITimeFromAPIProps {
  ClosingTime: string;
  DayOfTheWeek: number;
  IsClosed: boolean;
  IsDeleted: boolean;
  OpeningTime: string;
  RID: number;
}

export interface IWorkingHoursContentProps {
  stationId: number;
}

export interface ISelectedTimeByDayProps {
  endTime: string | null;
  startTime: string | null;
  rid: number | null;
}

export interface IInfoItems {
  label: string;
  value?: string | null[] | undefined;
  render?: ReactNode;
}

export interface IStationImagesProps {
  stationId: number;
}
export interface IStationImageResponseProps {
  id: number;
  stationId: number;
  fileName: string;
  pathName: string;
  cdnUrl: string;
  sortOrder: number;
}

export interface IStationFeatureProps {
  StationFeatureType: number;
  StationFeatureValue: string;
}

export interface IFeatureItemProps {
  rid: number;
  name: string;
}
export interface IInfoItemsProps {
  label: string;
  value?: string | null;
  render?: React.ReactNode;
}

export interface IBrandItemProps {
  id: number;
  imageCdnUrl: string | null;
  name: string;
}

export interface IChargeUnitAddModalProps {
  chargePointId?: number;
  stationId: number;
}
export interface IStationIdProps {
  stationId: number;
}

export interface IActionButtonProps {
  buttonText: string;
  modalName: string;
  ModalComponent: React.FC<{ stationId: number }>;
  stationId: number;
}

export interface IAccordionSection {
  actionButton: (stationId: number) => JSX.Element | null;
  content: React.ComponentType<{ stationId: number }> | React.ComponentType;
  icon?: React.ReactNode;
  key: string;
  title: string;
}

export interface ITabTitleProps {
  icon: JSX.Element;
  label: string;
}

export interface IStationFeatureValuesProps {
  data?: IFeatureItemProps[];
  error?: string | unknown;
}
export interface IStationIdProps {
  stationId: number;
}

export interface IImageDataProps {
  id: number;
  cdnUrl: string;
  fileName: string;
  sortOrder: number;
  stationId: number;
}

export interface ICommissionTableHeaderItemProps {
  label: string;
}

export interface IComissionItemProps {
  stationId: number;
  comissionDetail: IComissionDataProps;
}

export interface IInfoColumnProps {
  children: React.ReactNode;
  className?: string;
}
export interface IServicePointPermissionProps {
  name: string;
  surName: string;
  userId: number;
  userName: string;
}

export interface ITabsTitleProps {
  icon: JSX.Element;
  label: string;
}

export interface IConnectorAddModalProps {
  id: number;
  stationChargePointBrandID: number;
  stationChargePointBrandName: string;
  stationChargePointModelID: number;
  stationChargePointModelName: string;
  stationChargePointConnectorTypeID: number;
  stationChargePointConnectorTypeName: string;
  kwh: number;
  ac: boolean;
}

export interface ICommissionFeaturesProps {
  reseller: number;
  isResellerForServicePoint: boolean;
  tariffFraction: number;
  rate: string;
  time: number;
}

export interface IStationImagesModalProps {
  clickedImageId: number;
  stationId: number;
}