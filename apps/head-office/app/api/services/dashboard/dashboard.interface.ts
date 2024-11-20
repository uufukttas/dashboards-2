export interface DashboardComponentInfoRequest {
  PageCode: string;
}

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
