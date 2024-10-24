type ChartType = 'line' | 'doughnut' | 'semi_doughnut' | 'pie' | 'map' | 'list' | 'line&bar';
interface IDataPoint {
    [key: string]: number | string;
    value: number;
};
export interface IChartData {
    data: {
        value: number;
    }
    [key: string]: IDataPoint[];
};
export interface IDashboardCardComponentInfoProps {
    data: IDashboardCardComponentProps[];
};
export interface IDashboardCardComponentProps {
    title: string;
    value: string;
    icon_name: string;
    description: string;
    position: string;
    mobile_layout: string;
    tablet_layout: string;
    type: string;
};
export interface IDashboardData {
    type: ChartType;
    value: IChartData[];
};
export interface ITooltipItem {
    dataset: {
        label: string;
    };
    parsed: {
        y: number;
    };
};
export interface IChartItem {
    [key: string]: IDataPoint[];
};
export interface IDashboardsDataProps {
    [key: string]: {
        title: string;
        value: string | IDashboardDataValueProps[];
        icon_name: string;
        description: string;
        position: string;
        mobile_layout: string;
        tablet_layout: string;
        type: string;
    };
};
export interface IDashboardDataValueProps {
    lat: number;
    lng: number;
    name?: string;
    isAC?: boolean;
    icon_url?: string;
    status?: string;
};
export interface IDashboardMapItemDataSummaryProps {
    mapItems: IDashboardDataValueProps[];
};
export interface IMapItemsProps {
    iconUrl: string;
    isAC: boolean;
    latitude: string;
    longitude: string;
    name: string;
    status: string;
}
export interface IWidgetContentParamsProps {
    pageCode: string;
    reportCode: string;
    reportType: string;
    dateFilterStartAt: string;
    dateFilterEndAt: string;
};

export interface IWidgetDataProps {
    activeData: number;
    iconName: string;
    dashboardMapItemDataSummaries?: IDashboardMapItemDataSummaryProps;
    mobile_layout: string
    pageCode: string;
    pageId: number;
    pageName: string;
    position: string;
    tablet_layout: string;
    totalData: number;
    widgetCode: string;
    widgetDescription: string;
    widgetId: number;
    widgetType: string;
};

export interface IDashboardComponentInfoResponseProps {
    data: IDashboardCardComponentProps[];
    success: boolean;
}