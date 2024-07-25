export interface IDropdownItemProps {
    id: number | null;
    name: string;
    rid: number | null;
    isChecked: boolean | undefined;
    stationFeatureType: number;
    stationFeatureValue: number;
};
export interface IHeaderProps {
    className?: string;
    headerName: string;
};
