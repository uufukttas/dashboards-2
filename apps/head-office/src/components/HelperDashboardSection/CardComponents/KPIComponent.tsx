import React from 'react';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { FaCircleInfo } from 'react-icons/fa6';
import DynamicSVG from '../../DashboardSection/DynamicSVG';

const KPIComponent = ({ componentValue }: { componentValue: any }) => {
    const itemPrefix: string = `${BRAND_PREFIX}-dashboard-page-card-item`;
    const dashboardCardContentPrefix: string = `${itemPrefix}-content`;

    const getKPIFontSize = (widgetCode: string) => {
        if (widgetCode === 'active_customer' ||widgetCode === 'total_process_count') {
            return 'text-4xl';
        }

        return 'text-2xl';
    };

    const formattedNumber = (number: string) => {
        if (componentValue?.dashboardWidgetType !== 'total_transactions_amount' &&
            componentValue?.dashboardWidgetType !== 'total_earnings' &&
            componentValue?.dashboardWidgetType !== 'total_cost'
        ) {
            return number;
        }

        const res = new Intl.NumberFormat('de-DE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
            // @ts-ignore
        }).format(number);

        console.log(res);

        return `${res} TL`;
    }

    return (
        <>
            <div className={`${dashboardCardContentPrefix} w-full h-full flex text-center justify-between`}>
                <div className={`${dashboardCardContentPrefix}-info-container flex flex-col items-center justify-start px-4 w-full`}>
                    <div className={`${dashboardCardContentPrefix}-title-container flex items-center justify-start w-full`}>
                        <div className={`${dashboardCardContentPrefix}-title lg:text-lg font-bold text-md`}>
                            {
                                componentValue?.widgetTitle
                            }
                        </div>
                    </div>
                    <div className={`${dashboardCardContentPrefix}-content-container flex items-center justify-center w-full h-5/6`}>

                        <div className={`${dashboardCardContentPrefix}-icon-container flex items-center justify-center w-full h-5/6`}>
                            <DynamicSVG fileName={componentValue?.iconName} />
                        </div>
                        <div
                            className={`${dashboardCardContentPrefix}-value ${getKPIFontSize(componentValue?.dashboardWidgetType)} flex w-full items-center justify-end h-full`}>
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
                className={`${dashboardCardContentPrefix}-description-container w-full h-1/6 flex items-end text-xs px-4`}>
                <div
                    className={`${dashboardCardContentPrefix}-description w-full flex items-center justify-start`}>
                    <FaCircleInfo className='mx-2' />
                    {
                        componentValue?.widgetDescription
                    }
                </div>
            </div>
        </>
    )
}

export default KPIComponent