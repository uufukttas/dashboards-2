import React, { useEffect } from 'react';
import {
  ArcElement,
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  Legend,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Card } from '@projects/card';
import { detectDevice } from '@projects/common';
import KPIComponent from './CardComponents/KPIComponent';
import ListComponent from './CardComponents/ListComponent';
import ChartComponent from './CardComponents/ChartComponent';
import { BRAND_PREFIX } from '../../constants/constants';
import './HelperDashboardSection.css';
import { IHelperDashboardCardComponentProps } from './types';
import { useGetDashboardItemsMutation } from 'apps/head-office/app/api/services/dashboard/dashboard.service';

Chart.register(
  ArcElement,
  CategoryScale,
  ChartDataLabels,
  Filler,
  LinearScale,
  LineElement,
  Legend,
  PointElement,
  Title,
  Tooltip
);

const HelperDashboardCards: React.FC<{ widget: IHelperDashboardCardComponentProps }> = ({
  widget,
}: {
  widget: IHelperDashboardCardComponentProps;
}) => {
  const itemPrefix: string = `${BRAND_PREFIX}-helper-dashboard-page-card-item`;
  const isDesktop = detectDevice().isDesktop;
  const isTablet = detectDevice().isTablet;
  const [getDashboardItems, { data: componentValue }] = useGetDashboardItemsMutation({});

  const getCardComponentContent = () => {
    if (!componentValue) {
      return;
    }

    switch (widget.widgetType) {
      case 'chart':
        return <ChartComponent widget={widget} componentValue={componentValue} />;
      case 'kpi':
        return <KPIComponent componentValue={componentValue} />;
      case 'list':
        return <ListComponent componentValue={componentValue} />;
    }
  };
  const setComponentPosition = (): string => {
    return isDesktop ? widget.position : isTablet ? widget.tabletLayout : widget.mobileLayout;
  };

  useEffect(() => {
    getDashboardItems({
      body: {
        pageCode: widget.pageCode,
        reportCode: widget.widgetCode,
        reportType: widget.widgetType,
        dateFilterStartAt: '2022-10-17T08:30:25.810Z',
        dateFilterEndAt: '2024-10-25T08:30:25.810Z',
      },
    });
  }, [widget.widgetCode]);

  return (
    <Card
      BRAND_PREFIX={BRAND_PREFIX}
      containerClassName={`${itemPrefix} py-4 flex flex-col items-center justify-between shadow border border-gray-300 rounded-md bg-white`}
      style={{ gridArea: setComponentPosition() }}
    >
      {getCardComponentContent()}
    </Card>
  );
};

export default HelperDashboardCards;
