import React, { useEffect, useState } from 'react'
import { BRAND_PREFIX } from '../../constants/constants';
import { Card } from '@projects/card';
import { detectDevice } from '@projects/common';
import axios from 'axios';
import DashboardMap from './DashboardMap';

const DashboardCardContent = ({ widget }) => {
    const itemPrefix: string = `${BRAND_PREFIX}-dashboard-page-cards-item`;
    const dashboardCardContentPrefix: string = `${itemPrefix}-content`;
    const isDesktop: boolean = detectDevice().isDesktop;
    const isTablet: boolean = detectDevice().isTablet;
    const [componentValue, setComponentValue] = useState({});

    const getComponentContentValue = async (widgetContentParams) => {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/Dashboard/GetDashboardItemData`,
            widgetContentParams,
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );

        // return response.data.data;
        setComponentValue(response.data.data);
    };
    const renderComponentContent = (widget) => {
        if (widget.pageCode === '') return;

        const widgetContentParams = {
            pageCode: widget.pageCode,
            reportCode: widget.widgetCode,
            reportType: widget.widgetType,
            dateFilterStartAt: new Date().toISOString(),
            dateFilterEndAt: new Date().toISOString(),
        };

        if (componentValue.dashboardMapItemDataSummaries) {
            return (
                <DashboardMap mapItems={componentValue.dashboardMapItemDataSummaries} />
            )
        } else {
            return (
                <>
                    <div className={`${dashboardCardContentPrefix} w-full h-full flex text-center justify-between`}>
                        <div className={`${dashboardCardContentPrefix}-info-container flex flex-col items-center justify-start px-4 w-full`}>
                            <div className={`${dashboardCardContentPrefix}-title-container flex items-center justify-start w-full`}>
                                <div className={`${dashboardCardContentPrefix}-title lg:text-lg font-bold text-md`}>
                                    {
                                        // getCardValues().title
                                        componentValue.widgetDescription
                                    }
                                </div>
                            </div>
                            <div
                                className={`${dashboardCardContentPrefix}-value text-2xl flex w-full items-center justify-end h-full`}>
                                {
                                    <>
                                        <>{componentValue.activeData}</> /
                                        <>{componentValue.totalData}</>
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
                                componentValue.widgetDescription
                            }
                        </div>
                    </div>
                </>
            )
        }
    }
    const setComponentPosition = (): string => {
        return (
            isDesktop
                ? widget.position
                : isTablet
                    ? widget.tablet_layout
                    : widget.mobile_layout
        )
    };


    useEffect(() => {
        const fetchData = async () => {
            const widgetContentParams = {
                pageCode: widget.pageCode,
                reportCode: widget.widgetCode,
                reportType: widget.widgetType,
                dateFilterStartAt: new Date().toISOString(),
                dateFilterEndAt: new Date().toISOString(),
            };
            await getComponentContentValue(widgetContentParams);
        };

        if (widget.pageCode) {
            fetchData();
        }
    }, [widget.pageCode]);

    console.log('DashboardCardsContent')

    return (
        <Card
            BRAND_PREFIX={BRAND_PREFIX}
            containerClassName={`${itemPrefix} py-4 flex flex-col items-center justify-between shadow border border-gray-300 rounded-md bg-white`}
            style={{ gridArea: setComponentPosition() }}
        >
            {
                renderComponentContent(widget)
            }
        </Card>
    );
};

export default DashboardCardContent