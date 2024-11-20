export interface ReourceKey {
  id: number;
  resourceKey: string;
  resourceKeyList: string[];
  value: string;
}

export interface ResourceTextRequestBody {
  resourceKeyList?: string[];
}
