import React, { useEffect } from 'react';
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
import { Doughnut, Line, Pie } from "react-chartjs-2";
import { BiSolidEvStation } from "react-icons/bi";
import { FaChargingStation } from 'react-icons/fa';
import { FaBatteryHalf } from 'react-icons/fa6';
import { HiUserGroup } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { Card } from '@projects/card';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { dashboardsData } from './dashboardsData'; // It will be deleted after the API integration.
import './DashboardSection.css';
import DashboardMap from './DashboardMap';

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

const DashboardCards: React.FC = () => {
    const pagePrefix: string = `${BRAND_PREFIX}-dashboard-page-cards`;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleLoadingVisibility(false));
    }, []);

    const lineData = (response: any[]) => {
        const acData = response[0].ac.map((point: any) => point[Object.keys(point)[0]]);
        const dcData = response[1].dc.map((point: any) => point[Object.keys(point)[0]]);

        return {
            datasets: [
                {
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: acData,
                    label: 'AC',
                },
                {
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    borderColor: 'rgb(53, 162, 235)',
                    data: dcData,
                    label: 'DC',
                },
            ],
            labels: Object.keys(response[0].ac[0]).map(key => key)
        };
    };

    const doughnutData = (response: any[]) => {
        const labels = response.map(item => Object.keys(item)[0]);
        const data = response.map(item => item[Object.keys(item)[0]]);

        return {
            datasets: [
                {
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                    data: data,
                    label: '# of Transactions',
                },
            ],
            labels: labels,
        };

    }

    const lineOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem: any) {
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

    const renderGraphics = (data: any) => {
        if (data.graphic_type === 'line') {
            return <div className='w-full h-full'>
                <Line
                    data={lineData(data.value)}
                    options={lineOptions}
                />
            </div>
        } else if (data.graphic_type === 'doughnut') {
            return <div className='w-full h-full'>
                <Doughnut
                    data={doughnutData(data.value)}
                    options={{
                        plugins: {
                            legend: {
                                position: 'bottom' as const,
                            },
                            title: {
                                display: false,
                                text: 'Chart.js Line Chart',
                            },
                        }
                    }}
                />
            </div>
        } else if (data.graphic_type === 'semi_doughnut') {
            return <div className='w-full h-full'>
                <Doughnut
                    data={doughnutData(data.value)}
                    options={{
                        plugins: {
                            legend: {
                                position: 'bottom' as const,
                            },
                            title: {
                                display: false,
                                text: 'Chart.js Line Chart',
                            }
                        },
                        rotation: -90,
                        circumference: 180,
                        cutout: "50%",
                        maintainAspectRatio: true,
                        responsive: true,
                    }}
                />
            </div>
        } else if (data.graphic_type === 'pie') {
            return <div className='w-full h-full'>
                <Pie
                    data={doughnutData(data.value)}
                />
            </div>
        } else if (data.graphic_type === 'map') {
            return <div className='w-full h-full'>
                <div className='w-full h-full flex items-center justify-center'>
                <DashboardMap />
                </div>
            </div>
        }
    };

    const getValue = (data: number | any[]) => {
        if (Array.isArray(data.value)) {
            return renderGraphics(data);
        } else {
            return <div className='flex items-center justify-end'>
                <div className='text-4xl'>{data.value}</div>
            </div>
        }
    };

    const getCardIcon = (icon: string): JSX.Element => {
        switch (icon) {
            case 'FaChargingStation':
                return <FaChargingStation className='text-6xl' />;
            case 'BiSolidEvStation':
                return <BiSolidEvStation className='text-6xl' />;
            case 'FaBatteryHalf':
                return <FaBatteryHalf className='text-6xl' />;
            case 'HiUserGroup':
                return <HiUserGroup className='text-6xl' />;
            default:
                return <></>;
        };
    };

    return (
        <div className={`${pagePrefix}-info-container w-full flex justify-between flex-wrap`}>
            <div className={`${pagePrefix}-card-row-wrapper flex flex-col md:flex-row w-full`}>
                <div className='w-full h-full grid' style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: "1em" }}>
                    {
                        Object.keys(dashboardsData).map(item => {
                            return (
                                <Card
                                    BRAND_PREFIX={BRAND_PREFIX}
                                    containerClassName={`py-4 flex items-center justify-between shadow border border-gray-300 rounded-md`}
                                    key={item}
                                    style={{ gridArea: dashboardsData[item].type }}
                                >
                                    <div className={`w-full h-full flex text-center justify-between`}>
                                        <div className='card-info-container flex flex-col items-center justify-between px-4 w-full'>
                                            <div className='card-title-container flex items-center justify-start px-4 w-full '>
                                                <div className={`lg:text-md text-md`}>{dashboardsData[item].title}</div>
                                            </div>
                                            <div className='text-4xl flex w-full items-center justify-end'>
                                                {
                                                    getValue(dashboardsData[item])
                                                }
                                            </div>
                                        </div>
                                        <div className='card-icon-container flex items-center justify-center text-primary px-1'>
                                            {
                                                getCardIcon(dashboardsData[item].icon_name)
                                            }
                                        </div>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    );
};

export default DashboardCards;
