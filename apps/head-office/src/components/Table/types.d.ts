export interface IServicePointInfoProps {
    address: string;
    cityId: number;
    districtId: number;
    freePark?: string | null | undefined;
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    opportunities?: string[] | null | undefined;
    paymentMethods?: string[] | null | undefined;
    phone?: string | null | undefined;
    type?: string | null | undefined;
};

export interface ITableProps {
    servicePoints: IServicePointInfoProps[];
};