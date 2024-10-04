interface IDataPoint {
    [key: string]: number | string;
    value: number;
}

export interface IChartData {
    data: {
        value: number;
    }
    [key: string]: IDataPoint[];
}

type ChartType = 'line' | 'doughnut' | 'semi_doughnut' | 'pie' | 'map' | 'list' | 'line&bar';

export interface IDashboardData {
    type: ChartType;
    value: IChartData[];
}

export interface ITooltipItem {
    dataset: {
        label: string;
    };
    parsed: {
        y: number;
    };
}


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