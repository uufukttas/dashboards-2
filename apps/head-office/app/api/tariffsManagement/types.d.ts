interface ITariffDataProps {
    name: string;
    validityBeginDate: string;
    validityEndDate: string;
    minKW: number;
    maxKW: number;
    saleUnitPrice: string;
};
interface ISubfractionProps {
    tariffSubFractionType: number;
};
export interface IAddTariffRequestProps {
    tariff: ITariffDataProps;
    subfraction: ISubfractionProps[];
};

