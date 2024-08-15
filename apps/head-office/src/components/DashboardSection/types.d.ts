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
}