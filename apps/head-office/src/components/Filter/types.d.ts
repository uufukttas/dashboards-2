interface IDropdownItemProps {
    id: number | null;
    name: string;
    rid: number | null;
    isChecked: boolean;
    stationFeatureType: number;
    stationFeatureValue: number;
};
interface IFilterItemProps {
    id: string;
    isDoubleValue: boolean;
    label: string;
    operatorId: number;
    type: string;
    defaultValue?: string;
    dropdownItems?: IDropdownItemProps[];
    value: string;
    value2?: string;
    isHidden: boolean;
    operators: { title: string | React.JSX.Element }[];
};
export interface IFilterInputProps {
    className?: string;
    filter: IFilterItemProps;
    value: string;
    id?: string;
    setFilters: (filter: IFilterItemProps[]) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, value: string) => void;
};
export interface IFilterProps {
    className?: string;
    filters: IFilterItemProps[];
    isExpanded: boolean;
    onFilterSubmit: () => void;
    setFilters: (filters: IFilterItemProps[]) => void;
};
