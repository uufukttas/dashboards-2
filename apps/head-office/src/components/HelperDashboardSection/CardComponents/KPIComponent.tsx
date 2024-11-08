import React from 'react';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import DynamicSVG from '../../DashboardSection/DynamicSVG';
import { IComponentValueProps } from '../../DashboardSection/types';
import { FaCircleInfo } from 'react-icons/fa6';

const KPIComponent: React.FC<{
  componentValue: IComponentValueProps | null;
}> = ({ componentValue }) => {
  const itemPrefix: string = `${BRAND_PREFIX}-dashboard-page-card-item`;
  const dashboardCardContentPrefix: string = `${itemPrefix}-content`;

  const getKPIFontSize = (widgetCode: string) => {
    if (
      widgetCode === 'active_customer' ||
      widgetCode === 'total_process_count'
    ) {
      return 'text-4xl';
    }

    return 'text-2xl';
  };

  const formattedNumber = (number: string) => {
    if (
      componentValue?.dashboardWidgetType !== 'total_transactions_amount' &&
      componentValue?.dashboardWidgetType !== 'total_earnings' &&
      componentValue?.dashboardWidgetType !== 'total_cost'
    ) {
      return number;
    }

    const res = new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      // @ts-ignore
    }).format(number);

    return `${res} TL`;
  };

  if (!componentValue) {
    return (
      <div className="animate-pulse flex flex-col space-y-4 p-4 w-full">
        <p>Yükleniyor...</p>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`${dashboardCardContentPrefix} w-full h-full flex text-center justify-between`}
      >
        <div
          className={`${dashboardCardContentPrefix}-info-container flex flex-col items-center justify-start px-4 w-full`}
        >
          <div
            className={`${dashboardCardContentPrefix}-title-container flex items-center justify-start w-full`}
          >
            <div
              className={`${dashboardCardContentPrefix}-title lg:text-lg font-bold text-md`}
            >
              {componentValue?.widgetTitle}
            </div>
          </div>
          <div
            className={`${dashboardCardContentPrefix}-content-container flex items-center justify-center w-full h-5/6`}
          >
            <div
              className={`${dashboardCardContentPrefix}-icon-container flex items-center justify-center w-full h-5/6`}
            >
              {/* <DynamicSVG fileName={componentValue?.iconName} /> */}
            </div>
            <div
              className={`${dashboardCardContentPrefix}-value ${getKPIFontSize(
                componentValue?.dashboardWidgetType
              )} flex w-full items-center justify-end h-full`}
            >
              {
                <>
                  <span>{formattedNumber(componentValue?.totalData)}</span>
                </>
              }
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${dashboardCardContentPrefix}-description-container w-full h-1/6 flex items-end text-xs px-4`}
      >
        <div
          className={`${dashboardCardContentPrefix}-description w-full flex items-center justify-start`}
        >
          {componentValue?.widgetDescription && (
            <>
              <p>{componentValue?.widgetDescription}</p>
              <FaCircleInfo className="mx-2" />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default KPIComponent;
