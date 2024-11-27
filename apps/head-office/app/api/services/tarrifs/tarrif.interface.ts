export interface TariffRequestBody {
  tariff: {
    name: string;
    validityBeginDate: string;
    validityEndDate: string;
    minKW: number;
    maxKW: number;
    saleUnitPrice: string;
  };
  subfraction: {
    tariffSubFractionType: number;
  }[];
}

export interface Tariff {
  id: number;
  name: string;
  isActive: boolean;
  isDeleted: boolean;
  minKW: number;
  maxKW: number;
  saleUnitPrice: number;
  validityBeginDate: string;
  validityEndDate: string;
  createDate: string;
}

export interface TariffResponse {
  tariffs: Tariff[];
}

export interface SingleTariffResponse {
  data: {
    tariff: Tariff;
  };
}
