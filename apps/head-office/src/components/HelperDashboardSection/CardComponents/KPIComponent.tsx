import React from 'react';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import DynamicSVG from '../../DashboardSection/DynamicSVG';
import { IComponentValueProps } from '../../DashboardSection/types';
import { FaCircleInfo } from 'react-icons/fa6';

const KPIComponent: React.FC<{
  componentValue: IComponentValueProps | undefined;
}> = ({ componentValue }) => {
  const itemPrefix: string = `${BRAND_PREFIX}-dashboard-page-card-item`;
  const dashboardCardContentPrefix: string = `${itemPrefix}-content`;

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
      <div className={`${dashboardCardContentPrefix} w-full h-full flex text-center justify-between`}>
        <div className={`${dashboardCardContentPrefix}-info-container flex flex-col items-center justify-start px-4 w-full`}>
          <div className={`${dashboardCardContentPrefix}-title-container flex items-center justify-start w-full`}>
            <div className={`${dashboardCardContentPrefix}-title lg:text-lg font-bold text-md`}>
              {componentValue?.widgetTitle}
            </div>
          </div>
          <div className={`${dashboardCardContentPrefix}-container flex items-center justify-center w-full h-5/6`}>
            {
              componentValue?.iconName &&
              <div className={`${dashboardCardContentPrefix}-icon-container flex items-center justify-center w-full h-5/6`}>
                <DynamicSVG fileName={componentValue?.iconName} />
              </div>
            }
            <div className={`${dashboardCardContentPrefix}-value text-${componentValue?.valueSizeType} flex w-full items-center justify-center ${componentValue?.valuePositionType} h-full`}>
              {
                <>
                  <span>{componentValue?.totalData}</span>
                </>
              }
            </div>
          </div>
        </div>
      </div>
      <div className={`${dashboardCardContentPrefix}-description-container w-full h-1/6 flex items-end text-xs px-4`}>
        <div className={`${dashboardCardContentPrefix}-description w-full flex items-center justify-start`}>
          {componentValue?.widgetDescription && (
            <>
              <FaCircleInfo className="mx-2" />
              <p>{componentValue?.widgetDescription}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default KPIComponent;
