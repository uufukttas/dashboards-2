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
    isHidden: boolean;
};
export interface IFilterInputProps {
    className?: string;
    filter: IFilterItemProps;
    value: string;
    id?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> , value: string) => void;
};
export interface IFilterProps {
    className?: string;
    filters: IFilterItemProps[];
    isExpanded: boolean;
    onFilterSubmit: () => void;
    setFilters: (filters: IFilterItemProps[]) => void;
    setIsExpanded: (isExpanded: boolean) => void;
};
