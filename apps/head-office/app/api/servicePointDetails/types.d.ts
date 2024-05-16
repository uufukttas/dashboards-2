interface IServicePointDetailsFeature {
    StationFeatureType: number;
    StationFeatureValue: string;
};
interface IServicePointDetailsFeatureValues {
    rid: number;
    name: string;
};

export interface IServicePointDetailsFeatureResponse {
    data: IServicePointDetailsFeature[];
    success: boolean;
};

export interface IServicePointDetailsFeatureValuesResponse {
    data: IServicePointDetailsFeatureValues[];
    success: boolean;
};
