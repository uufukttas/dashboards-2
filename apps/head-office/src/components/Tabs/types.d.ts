export interface ITabsItemProps {
    title: string | JSX.Element;
};
export interface ITabsProps {
    activeTabIndex: number;
    filters?: IFilterItemProps[]
    setActiveTabIndex: (index: number) => void;
    tabItems: ITabsItemProps[];
};

interface IFilterItemProps {
    id: string;
    label: string;
    operatorId: number;
    type: string;
    defaultValue?: string;
    dropdownItems?: IDropdownItemProps[];
};