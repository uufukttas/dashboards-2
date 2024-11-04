import { BRAND_PREFIX } from 'apps/head-office/src/constants/constants';
import React from 'react'

const KPIComponent = ({ componentValue }: {componentValue: any}) => {
    const itemPrefix: string = `${BRAND_PREFIX}-dashboard-page-card-item`;
    const dashboardCardContentPrefix: string = `${itemPrefix}-content`;

    return (
        <>
            <div className={`${dashboardCardContentPrefix} w-full h-full flex text-center justify-between`}>
                <div className={`${dashboardCardContentPrefix}-info-container flex flex-col items-center justify-start px-4 w-full`}>
                    <div className={`${dashboardCardContentPrefix}-title-container flex items-center justify-start w-full`}>
                        <div className={`${dashboardCardContentPrefix}-title lg:text-lg font-bold text-md`}>
                            {
                                // getCardValues().title
                                componentValue?.widgetDescription
                            }
                        </div>
                    </div>
                    <div
                        className={`${dashboardCardContentPrefix}-value text-2xl flex w-full items-center justify-end h-full`}>
                        {
                            <>
                                {/* <>{componentValue?.activeData}</> / */}
                                <>{componentValue?.totalData}</>
                            </>
                        }
                    </div>
                </div>
                {
                    // dashboardsData[item]?.icon_name && (
                    //     <div
                    //         className={`${itemPrefix}-content-icon-container flex items-center justify-center text-primary px-1`}>
                    //         {
                    //             getCardIcon(dashboardsData[item]?.icon_name)
                    //         }
                    //     </div>
                    // )
                }
            </div>
            <div
                className={`${dashboardCardContentPrefix}-description-container w-full h-1/6 flex items-end text-xs px-4`}>
                <div
                    className={`${dashboardCardContentPrefix}-description w-full flex items-center justify-start`}>
                    {/* <FaCircleInfo className='mx-2' /> */}
                    {
                        componentValue?.widgetDescription
                    }
                </div>
            </div>
        </>
    )
}

export default KPIComponent