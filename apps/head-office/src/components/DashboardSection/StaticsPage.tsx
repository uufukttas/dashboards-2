import React from 'react'
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
import { Doughnut, Line, Pie } from "react-chartjs-2";
import Card from '../Card/Card';
// Will remove this library when we have a data from api
import { faker } from '@faker-js/faker';
import { BRAND_PREFIX } from '../../constants/constants';

Chart.register(
    ArcElement,
    CategoryScale,
    Filler,
    LinearScale,
    LineElement,
    Legend,
    PointElement,
    Title,
    Tooltip,
);

const StaticsPage: React.FC = () => {
    const chartsPrefix: string = `${BRAND_PREFIX}-charts-container`;
    const labels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const areaLineData = {
        datasets: [
            {
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                fill: true,
                label: 'Gelir',
            },
            {
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgb(53, 162, 235)',
                data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                label: 'Gider',
            },
        ],
        labels,
    };
    const areaLineOptions = {
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
        responsive: true,
    };
    const donutData = {
        datasets: [
            {
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                data: [12, 19, 3, 5, 2, 3],
                label: '# of Votes',
            },
        ],
        labels: ['Arizali', 'Aktif', 'Planlanmis', 'Uygun', 'Mesgul', 'Bakimda'],
    };
    const pieData = {
        datasets: [
            {
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                data: [12, 19, 3],
                label: 'Ünite',
            },
        ],
        labels: ['Gelir', 'Masraf', 'Bakim'],
    };
    const lineData = {
        datasets: [
            {
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgb(255, 99, 132)',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 400 })),
                label: 'AC',
            },
            {
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgb(53, 162, 235)',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 400 })),
                label: 'DC',
            },
        ],
        labels,
    };
    const lineOptions = {
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: false,
                text: 'Chart.js Line Chart',
            },
        },
        responsive: true,
    };

    return (
        <div className={`${chartsPrefix} flex justify-between w-full flex-wrap h-full`}>
            <div className={`${chartsPrefix}-row w-full flex flex-col xl:flex-row justify-between my-4 w-1/3`}>
                <Card
                    cardBody={<Pie data={pieData} />}
                    cardHeader={<h3 className='font-bold'>Istasyonlar Durumlari</h3>}
                    className='w-full flex flex-col items-center py-4 mx-2 px-4 mt-4 lg:mt-0 '
                />
                <Card
                    cardBody={<Doughnut data={donutData} />}
                    cardHeader={<h3 className='font-bold'>Sarj Unite Durumlari</h3>}
                    className='w-full flex flex-col items-center py-4 mx-2 px-4 mt-4 lg:mt-0 '
                />
                <Card
                    cardBody={<Pie data={pieData} />}
                    cardHeader={<h3 className='font-bold'>Bilanco</h3>}
                    className='w-full flex flex-col items-center py-4 mx-2 px-4 mt-4 lg:mt-0 '
                />
            </div>
            <div className={`${chartsPrefix}-row w-full flex justify-between my-4 w-1/3`}>
                <Card
                    cardBody={<Line className='w-[300px] h-[100px] lg:w-[924px] lg:h-full' options={lineOptions} data={lineData} />}
                    cardHeader={<h3 className='font-bold'>Aylik Getiri</h3>}
                    className='line-chart w-full flex flex-col items-center p-8 h-full'
                />
            </div>
            <div className={`${chartsPrefix}-row w-full flex justify-between my-4 w-1/3`}>
                <Card
                    cardBody={<Line className='w-[300px] h-[100px] lg:w-[924px] lg:h-full' options={areaLineOptions} data={areaLineData} />}
                    cardHeader={<h3 className='font-bold'>Gelir Gider Karsilastirma</h3>}
                    className='line-chart w-full flex flex-col items-center p-8 h-full'
                />
            </div>
        </div>
    )
};

export default StaticsPage;
