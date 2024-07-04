interface IDropdownItemProps {
    id: null;
    name: string;
    rid: number;
};
interface IFilterItemProps {
    id: string;
    label: string;
    operatorId: number;
    type: string;
    defaultValue?: string;
    dropdownItems?: IDropdownItemProps[];
    value: string;
    value2: string;
};
export interface IFilterInputProps {
    className?: string;
    filter: IFilterItemProps;
    value: string;
    onChange: (id: string, value: string) => void;
};
export interface IFilterProps {
    className?: string;
    setFilters: (filters: IFilterItemProps[]) => void;
    filters: IFilterItemProps[];
    onFilterSubmit: () => void;
};
