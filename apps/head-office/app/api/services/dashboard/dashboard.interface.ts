export interface DashboardComponentInfoRequest {
  PageCode: string;
};
export interface DashboardItem {
  activeData: unknown;
  iconName: string;
  mobileLayout: string;
  pageCode: string;
  pageId: number;
  pageName: string;
  position: string;
  tabletLayout: string;
  totalData: unknown;
  widgetCode: string;
  widgetDescription: string;
  widgetId: number;
  widgetType: string;
}

export interface DashboardItemDataRequest {
  pageCode: string;
  reportCode: string;
  reportType: string;
  dateFilterStartAt: string;
  dateFilterEndAt: string;
}

export interface ComponentValue {
  dashboardMapItemDataSummaries?: {
    iconUrl: string;
    isAC: boolean;
    latitude: string;
    longitude: string;
    name: string;
    status: string;
  }[];
  widgetTitle?: string;
  activeData?: number;
  dashboardWidgetType?: string;
  iconName?: string;
  totalData?: number;
  widgetDescription?: string;
  valuePositionType?: string;
  valueSizeType?: string;
}
