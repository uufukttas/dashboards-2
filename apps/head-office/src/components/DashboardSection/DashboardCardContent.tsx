import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCircleInfo } from 'react-icons/fa6';
import { Card } from '@projects/card';
import { detectDevice } from '@projects/common';
import DashboardMap from './DashboardMap';
import DynamicSVG from './DynamicSVG';
import { BRAND_PREFIX } from '../../constants/constants';
import { IDashboardCardComponentProps, IWidgetContentParamsProps, IComponentValueProps } from './types';

const DashboardCardContent = ({ widget }: { widget: IDashboardCardComponentProps }) => {
    const itemPrefix: string = `${BRAND_PREFIX}-dashboard-page-card-item`;
    const dashboardCardContentPrefix: string = `${itemPrefix}-content`;
    const isDesktop: boolean = detectDevice().isDesktop;
    const isTablet: boolean = detectDevice().isTablet;
    const initialComponentValue: IComponentValueProps = {
        dashboardMapItemDataSummaries: [],
        dashboardWidgetType: '',
        widgetDescription: "",
    };
    const [componentValue, setComponentValue] = useState<IComponentValueProps>(initialComponentValue);

    const getComponentContentValue = async (widgetContentParams: IWidgetContentParamsProps) => {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/Dashboard/GetDashboardItemData`,
            widgetContentParams,
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setComponentValue(response.data.data);
    };
    const renderComponentContent = (widget: IDashboardCardComponentProps) => {
        if (widget.pageCode === '') return;

        if (componentValue.dashboardMapItemDataSummaries) {
            return (
                <DashboardMap widget={componentValue}/>
            )
        } else {
            return (
                <>
                    <div className={`${dashboardCardContentPrefix} w-full h-full flex text-center justify-between`}>
                        <div className={`${dashboardCardContentPrefix}-info-container flex flex-col items-center justify-start px-4 w-full`}>
                            <div className={`${dashboardCardContentPrefix}-title-container flex items-center justify-start w-full`}>
                                <div className={`${dashboardCardContentPrefix}-title lg:text-lg font-bold text-md`}>
                                    {
                                        componentValue.widgetTitle
                                    }
                                </div>
                            </div>
                            <div className={`${dashboardCardContentPrefix}-content-container flex items-center justify-center w-full h-5/6`}>
                                <div className={`${dashboardCardContentPrefix}-icon-container flex items-center justify-center ${componentValue.iconName ? 'w-full' : 'w-0'} h-5/6`}>
                                    <DynamicSVG fileName={componentValue.iconName} className='' />
                                </div>
                                <div className={`${dashboardCardContentPrefix}-value text-2xl flex w-full items-center ${componentValue.iconName ? 'justify-end': 'justify-center'} h-full`}>
                                    {
                                        <>
                                            <span className={`${BRAND_PREFIX}-active-widget-data text-6xl px-1`}>{componentValue.activeData}</span> /
                                            <span className='px-1'>{componentValue.totalData}</span>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        widget.widgetDescription &&
                        <div
                            className={`${dashboardCardContentPrefix}-description-container w-full h-1/6 flex items-end text-xs px-4`}>
                            <div
                                className={`${dashboardCardContentPrefix}-description w-full flex items-center justify-start`}>
                                <FaCircleInfo className='mx-2' />
                                {
                                    componentValue.widgetDescription
                                }
                            </div>
                        </div>
                    }
                </>
            )
        }
    }
    const setComponentPosition = (): string => {
        return (
            isDesktop
                ? widget.position
                : isTablet
                    ? widget.tabletLayout
                    : widget.mobileLayout
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

        if (widget.widgetCode) {
            fetchData();
        }
    }, [widget.pageCode]);

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

export default DashboardCardContent;
