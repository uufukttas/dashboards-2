export interface ISidebarBodyItemProps {
    index: number;
    item: ISidebarElementProps;
    sidebarElementsLength: number;
};
export interface ISidebarElementProps {
    icon: string | JSX.Element;
    label: string;
    path: string;
    subItems?: ISidebarElementProps[];
};
export interface ISidebarItemComponentProps {
    item: ISidebarElementProps;
};
