import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import { useDispatch } from 'react-redux';
import { Card } from '@projects/card';
import { detectDevice } from '@projects/common';
import KPIComponent from './CardComponents/KPIComponent';
import ListComponent from './CardComponents/ListComponent';
import ChartComponent from './CardComponents/ChartComponent';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import './HelperDashboardSection.css';
import { IHelperDashboardCardComponentProps } from './types';

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

const HelperDashboardCards: React.FC<{ widget: IHelperDashboardCardComponentProps }> = ({ widget }: { widget: IHelperDashboardCardComponentProps }) => {
    const itemPrefix: string = `${BRAND_PREFIX}-helper-dashboard-page-card-item`;
    const isDesktop = detectDevice().isDesktop;
    const isTablet = detectDevice().isTablet;
    const dispatch = useDispatch();
    const [componentValue, setComponentValue] = useState();

    const getCardComponentContent = () => {
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
    const setComponentPosition = (): string => {
        return (
            isDesktop
                ? widget.position
                : isTablet
                    ? widget.tabletLayout
                    : widget.mobileLayout
        )
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

export default HelperDashboardCards;
