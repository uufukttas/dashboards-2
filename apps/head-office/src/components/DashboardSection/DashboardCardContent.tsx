import { Card } from '@projects/card';
import { detectDevice } from '@projects/common';
import { useGetComponentContentMutation } from 'apps/head-office/app/api/services/dashboard/dashboard.service';
import { useEffect } from 'react';
import { FaCircleInfo } from 'react-icons/fa6';
import { BRAND_PREFIX } from '../../constants/constants';
import DashboardMap from './DashboardMap';
import DynamicSVG from './DynamicSVG';
import { IDashboardCardComponentProps } from './types';

const DashboardCardContent = ({ widget }: { widget: IDashboardCardComponentProps }) => {
  const itemPrefix: string = `${BRAND_PREFIX}-dashboard-page-card-item`;
  const dashboardCardContentPrefix: string = `${itemPrefix}-content`;
  const isDesktop: boolean = detectDevice().isDesktop;
  const isTablet: boolean = detectDevice().isTablet;

  const [getComponentContent, { data: componentValue }] = useGetComponentContentMutation();

  const renderComponentContent = (widget: IDashboardCardComponentProps) => {
    if (widget.pageCode === '') return;

    if (componentValue?.dashboardMapItemDataSummaries) {
      return <DashboardMap widget={componentValue} />;
    } else {
      return (
        <>
          <div className={`${dashboardCardContentPrefix} w-full h-full flex flex-row text-center justify-between`}>
            <div
              className={`${dashboardCardContentPrefix}-info-container flex flex-col items-center justify-start px-4 w-full`}
            >
              <div className={`${dashboardCardContentPrefix}-title-container flex items-center justify-start w-full`}>
                <div className={`${dashboardCardContentPrefix}-title lg:text-lg font-bold text-md`}>
                  {componentValue?.widgetTitle}
                </div>
              </div>
              <div
                className={`${dashboardCardContentPrefix}-content-container flex items-center justify-center w-full h-5/6`}
              >
                <div
                  className={`${dashboardCardContentPrefix}-icon-container flex items-center justify-center ${
                    componentValue?.iconName ? 'w-full' : 'w-0'
                  } h-5/6`}
                >
                  <DynamicSVG fileName={componentValue?.iconName} className="" />
                </div>
                <div
                  className={`${dashboardCardContentPrefix}-value text-2xl flex w-full items-center justify-${componentValue?.valuePositionType} h-full`}
                >
                  {
                    <>
                      <span className={`${BRAND_PREFIX}-active-widget-data text-${componentValue?.valueSizeType} px-1`}>
                        {componentValue?.activeData}
                      </span>{' '}
                      /<span className="px-1">{componentValue?.totalData}</span>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
          {widget.widgetDescription && (
            <div
              className={`${dashboardCardContentPrefix}-description-container w-full h-1/6 flex items-end text-xs px-4`}
            >
              <div className={`${dashboardCardContentPrefix}-description w-full flex items-center justify-start`}>
                <FaCircleInfo className="mx-2" />
                {componentValue?.widgetDescription}
              </div>
            </div>
          )}
        </>
      );
    }
  };

  const setComponentPosition = (): string => {
    return isDesktop ? widget.position : isTablet ? widget.tabletLayout : widget.mobileLayout;
  };

  useEffect(() => {
    if (widget.widgetCode) {
      getComponentContent({
        body: {
          pageCode: widget.pageCode,
          reportCode: widget.widgetCode,
          reportType: widget.widgetType,
          dateFilterStartAt: new Date().toISOString(),
          dateFilterEndAt: new Date().toISOString(),
        },
      });
    }
  }, [widget.pageCode]);

  return (
    <Card
      BRAND_PREFIX={BRAND_PREFIX}
      containerClassName={`${itemPrefix} py-4 flex flex-col items-center justify-between shadow border border-gray-300 rounded-md bg-white`}
      style={{ gridArea: setComponentPosition() }}
    >
      {renderComponentContent(widget)}
    </Card>
  );
};

export default DashboardCardContent;
