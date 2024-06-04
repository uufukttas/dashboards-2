interface IServicePointDetailsFeature {
    StationFeatureType: number;
    StationFeatureValue: string;
};
interface IServicePointDetailsFeatureValues {
    rid: number;
    name: string;
};
export interface IImageModalProps {
    FileName : string;
    Image : File,
    StationId : string;
};
export interface IComissionRequestProps {
    ownerType: number;
    forInvestor: boolean;
    tariffSubFractionTypeID: number;
    rate: number;
    stationId: string;
    isActive: boolean;
};
export interface IServicePointDetailsFeatureResponse {
    data: IServicePointDetailsFeature[];
    success: boolean;
};

export interface IServicePointDetailsFeatureValuesResponse {
    data: IServicePointDetailsFeatureValues[];
    success: boolean;
};
export interface IUpdateConnectorRequestProps {
    id: number;
    connectorNr: number;
    stationChargePointID: number;
    stationChargePointModelConnectorID: number;
}
