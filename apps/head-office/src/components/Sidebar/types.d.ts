export interface ISidebarBodyItemProps {
    index: number;
    item: ISidebarElementProps;
    sidebarElementsLength: number;
};
export interface ISidebarElementProps {
    name: string;
    link: string;
    icon: JSX.Element;
    subItems?: ISidebarElementProps[];
};
