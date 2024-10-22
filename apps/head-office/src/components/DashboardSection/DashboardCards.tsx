import React, { useEffect } from 'react';
import { FaCircleInfo } from 'react-icons/fa6';
import { GiElectricalSocket } from "react-icons/gi";
import { IoIosFlash } from "react-icons/io";
import { PiWaveSineBold } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { Card } from '@projects/card';
import { detectDevice } from '@projects/common';
import { dashboardsData } from './dashboardsData';
import DashboardMap from './DashboardMap';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { IDashboardCardComponentInfoProps, IDashboardCardComponentProps, IDashboardDataValueProps } from './types';
import './DashboardSection.css';

const DashboardCards: React.FC<{ dashboardComponentInfo: IDashboardCardComponentInfoProps }> = ({ dashboardComponentInfo }: { dashboardComponentInfo: IDashboardCardComponentInfoProps }) => {
    const pagePrefix: string = `${BRAND_PREFIX}-dashboard-page-cards`;
    const itemPrefix: string = `${pagePrefix}-item`;
    const isDesktop = detectDevice().isDesktop;
    const isTablet = detectDevice().isTablet;
    const dispatch = useDispatch();

    const getCardIcon = (icon: string): JSX.Element => {
        switch (icon) {
            case 'GiElectricalSocket':
                return <GiElectricalSocket className='text-8xl rounded' />;
            case 'IoIosFlash':
                return <IoIosFlash className='text-8xl' />;
            case 'PiWaveSineBold':
                return <PiWaveSineBold className='text-8xl' />;
            default:
                return <></>;
        };
    };
    const getCardValue = (cardData: string | IDashboardDataValueProps[]): React.ReactNode => {
        if (typeof cardData === 'string') {
            return getValue(cardData);
        } else {
            return renderMaps();
        }
    };
    const getValue = (dashboardCardValue: string): JSX.Element => {
        const mainData = dashboardCardValue.split('/')[0] || '';
        const wholeData = dashboardCardValue.split('/')[1] || '';

        return (
            <div className={`${itemPrefix}-content-data-value-container flex items-end justify-end`}>
                <div className={`${itemPrefix}-content-data-value text-4xl`}>{mainData}/</div>
                <div className={`${itemPrefix}-content-data-value text-2xl`}>{wholeData}</div>
            </div>
        );
    };
    const renderMaps = (): JSX.Element => {
        return (
            <div className={`${itemPrefix}-content-data-value-maps-container w-full h-full`}>
                <div className={`${itemPrefix}-content-data-value-maps w-full h-full flex items-center justify-center`}>
                    <DashboardMap />
                </div>
            </div>
        );
    };

    useEffect(() => {
        dispatch(toggleLoadingVisibility(false));
    }, []);

    return (
        <div className={`${pagePrefix}-container w-full flex justify-between flex-wrap`}>
            <div className={`${pagePrefix}-card-row-wrapper flex flex-col md:flex-row w-full`}>
                <div
                    className={`${pagePrefix}-card-row-container w-full h-full grid`}
                    style={{
                        gap: "2em",
                        gridTemplateColumns: (
                            isDesktop
                                ? 'repeat(12, 1fr)'
                                : 'repeat(11, 1fr)'
                        ),
                    }}
                >
                    {
                        (dashboardComponentInfo).map((item: IDashboardCardComponentProps) => {
                            return (
                                <Card
                                    BRAND_PREFIX={BRAND_PREFIX}
                                    containerClassName={`${itemPrefix} py-4 flex flex-col items-center justify-between shadow border border-gray-300 rounded-md bg-white`}
                                    key={item.position}
                                    style={{
                                        gridArea: (
                                            isDesktop
                                                ? item.position
                                                : isTablet
                                                    ? item.tablet_layout
                                                    : item.mobile_layout
                                        ),
                                    }}
                                >
                                    <div
                                        className={`${itemPrefix}-content w-full h-full flex text-center justify-between`}>
                                        <div
                                            className={`${itemPrefix}-content-info-container flex flex-col items-center justify-start px-4 w-full`}>
                                            <div
                                                className={`${itemPrefix}-content-title-container flex items-center justify-start w-full`}>
                                                <div
                                                    className={`${itemPrefix}-content-title lg:text-lg font-bold text-md`}>
                                                    {/* {
                                                        dashboardsData[item].widgetcode
                                                    } */}
                                                </div>
                                            </div>
                                            <div
                                                className={`${itemPrefix}-content-value text-2xl flex w-full items-center justify-end h-full`}>
                                                {
                                                    // getCardValue(dashboardsData[item].value)
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
                                    {
                                        // dashboardsData[item]?.description && (
                                        //     <div
                                        //         className={`${itemPrefix}-content-description-container w-full h-1/6 flex items-end text-xs px-4`}>
                                        //         <div
                                        //             className={`${itemPrefix}-content-description w-full flex items-center justify-start`}>
                                        //             <FaCircleInfo className='mx-2' />
                                        //             {
                                        //                 dashboardsData[item]?.description
                                        //             }
                                        //         </div>
                                        //     </div>
                                        // )
                                    }
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default DashboardCards;
