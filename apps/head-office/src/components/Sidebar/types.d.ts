export interface ISidebarElementProps {
    name: string;
    link: string;
    icon: JSX.Element;
};

export interface ISidebarBodyItemProps {
    index: number;
    item: ISidebarElementProps;
    sidebarElementsLength: number;
};