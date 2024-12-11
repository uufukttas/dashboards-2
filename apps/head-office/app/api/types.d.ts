export interface Get<T = undefined> {
  id?: number;
  params?: T;
}

export interface Post<T = undefined> {
  body: T;
}

export interface Put<T = undefined> {
  body: T;
  id: number;
}

export interface Delete {
  id: number;
}
interface IResponseDataProps {
  message: string;
}
export interface IDeleteUserRequestResponseProps {
  message: string;
  success: boolean;
}
export interface ILoginRequestProps {
  [key: string]: string;
}
export interface IResponseInfoProps {
  status: number;
  data: IResponseDataProps;
  message?: string;
  token: {
    result: string;
  };
}
export interface IResponseProps {
  error: {
    response: IResponseInfoProps;
  };
}

export interface IComissionRequestProps {
  forInvestor: comissionFeatures.isResellerForServicePoint;
  isActive: true;
  ownerType: comissionFeatures.reseller;
  rate: comissionFeatures.rate;
  stationId;
  tariffSubFractionTypeID: comissionFeatures.tariffFraction;
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

export interface IConnectorRequestProps {
  id: connectorProperty.connectorId;
  connectorNr: connectorProperty.connectorNumber;
  stationChargePointID: connectorProperty.chargePointId;
  stationChargePointModelConnectorID: connectorValue;
}
