interface ICompanyProps {
    id: number;
    imageUrl: string;
    name: string;
};
interface IMapIconProps {
    code: string;
    urL: string;
};
interface IResultProps {
    companies: ICompanyProps[];
    filterPowers: number[];
    mapiIcons: IMapIconProps[];
    stations: IStationProps[];
};
interface IStationProps {
    companyId: number;
    filter: number;
    id: number;
    lat: number;
    lon: number;
    mapPinIconCode: string
    name: string
    powers: number[];
};
export interface IDashboardClientProps {
    description: string | null;
    result: IResultProps;
    success: boolean;
};