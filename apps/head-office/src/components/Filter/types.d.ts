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
};
export interface IFilterInputProps {
    className?: string;
    filter: IFilterItemProps;
    value: string;
    onChange: (id: string, value: string) => void;
};
export interface IFilterProps {
    className?: string;
    filters: IFilterItemProps[];
};
