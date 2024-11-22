export interface ResourceKey {
  id: number;
  resourceKey: string;
  resourceKeyList: string[];
  value: string;
}

export interface ResourceTextRequestBody {
  resourceKeyList?: string[];
}

export interface City {
  countryId: number;
  isDeleted: string;
  plateCode: string;
  rid: number;
}

export interface GetDistrictsRequestParams {
  plateNumber: number;
}

export interface District {
  cityID: number;
  isDeleted: string;
  name: string;
  rid: number;
}
