export interface ITariffDataProps {
    id: number;
    name: string;
    saleUnitPrice: number;
    minKW: number;
    maxKW: number;
    createDate: string;
    validityBeginDate: string;
    validityEndDate: string;
};