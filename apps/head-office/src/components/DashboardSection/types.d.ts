interface IDataPoint {
    [key: string]: number | string;
    value: number;
}

export interface IChartData {
    ac: IDataPoint[];
    dc: IDataPoint[];
    data: {
        value: number;
    }
}

type ChartType = 'line' | 'doughnut' | 'semi_doughnut' | 'pie' | 'map';

export interface IDashboardData {
    graphic_type: ChartType;
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