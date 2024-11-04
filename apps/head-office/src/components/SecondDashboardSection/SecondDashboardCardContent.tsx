import React, { Fragment, useEffect, useState } from 'react';
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
    Tooltip
} from "chart.js";
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { BiSolidEvStation } from "react-icons/bi";
import { FaChargingStation } from 'react-icons/fa';
import { FaBatteryHalf, FaCircleInfo } from 'react-icons/fa6';
import { HiUserGroup } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { Card } from '@projects/card';
import { secondDashboardsData } from './secondDashboardsData'; // It will be deleted after the API integration.
import DashboardMap from './SecondDashboardMap';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { IChartData, IDashboardData, ISecondDashboardCardComponentProps, ITooltipItem } from './types';
import './SecondDashboardSection.css';
import { detectDevice } from '@projects/common';
import axios from 'axios';
import KPIComponent from './CardComponents/KPIComponent';
import ListComponent from './CardComponents/ListComponent';
import ChartComponent from './CardComponents/ChartComponent';

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
    Tooltip,
);

const SecondDashboardCards: React.FC = ({ widget }) => {
    const pagePrefix: string = `${BRAND_PREFIX}-second-dashboard-page-cards`;
    const itemPrefix: string = `${BRAND_PREFIX}-second-dashboard-page-card-item`;
    const dashboardCardContentPrefix: string = `${itemPrefix}-content`;
    const isDesktop = detectDevice().isDesktop;
    const isTablet = detectDevice().isTablet;
    const dispatch = useDispatch();
    const [componentValue, setComponentValue] = useState();
    const lineOptions = {
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                display: false,
            },
            legend: {
                position: 'bottom'
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: (tooltipItem: ITooltipItem) => {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.parsed.y}`;
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'category',
                labels: ['1', '2', '3', '4', '5', '6', '7', '8']
            }
        },
        responsive: true,
    };

    const setComponentPosition = (): string => {
        return (
            isDesktop
                ? widget.position
                : isTablet
                    ? widget.tabletLayout
                    : widget.mobileLayout
        )
    };

    const getCardComponentContent = (): React.ReactElement => {

        switch (widget.widgetType) {
            case 'chart':
                return (
                    <ChartComponent
                        widget={widget}
                        componentValue={componentValue}
                    />

                );
            case 'kpi':
                return (
                    <KPIComponent componentValue={componentValue} />
                );
            case 'list':
                return (
                    <ListComponent componentValue={componentValue} />
                );
        };
    };

    const getComponentValue = async () => {
        if (!widget.widgetCode) return;

        const requestParams = {
            "pageCode": widget.pageCode,
            "reportCode": widget.widgetCode,
            "reportType": widget.widgetType,
            "dateFilterStartAt": "2022-10-17T08:30:25.810Z",
            "dateFilterEndAt": "2024-10-25T08:30:25.810Z"
        };
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/Dashboard/GetDashboardItemData`,
            requestParams,
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );

        setComponentValue(response.data.data);
        return response.data.data;
    };

    useEffect(() => {
        dispatch(toggleLoadingVisibility(false));
    }, []);

    useEffect(() => {
        const fetchData = () => {
            console.log('componentValue', componentValue)
            getComponentValue();
        };

        fetchData();
    }, [widget.widgetCode]);

    return (
        <Card
            BRAND_PREFIX={BRAND_PREFIX}
            containerClassName={`${itemPrefix} py-4 flex flex-col items-center justify-between shadow border border-gray-300 rounded-md bg-white`}
            style={{ gridArea: setComponentPosition() }}
        >
            {
                getCardComponentContent()
            }
        </Card>
    );
};

export default SecondDashboardCards;
