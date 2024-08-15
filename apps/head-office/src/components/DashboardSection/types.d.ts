interface IDataPoint {
    [key: string]: number | string;
    value: number;
}

export interface IChartData {
    ac: IDataPoint[];
    dc: IDataPoint[];
    today: IDataPoint[];
    last_week_today: IDataPoint[];
    month: IDataPoint[];
    year: IDataPoint[];
    last_month: IDataPoint[];
    last_year: IDataPoint[];
    data: {
        value: number;
    }
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
}