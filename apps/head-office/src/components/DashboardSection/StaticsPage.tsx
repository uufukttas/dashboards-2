import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, PointElement, LineElement, Title, CategoryScale, Filler } from "chart.js";
import { Doughnut, Line, Pie } from "react-chartjs-2";
import Card from '../Card/Card';
// Will remove this library when we have a data from api
import { faker } from '@faker-js/faker';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const pieData = {
    labels: ['Planlanmış', 'Aktif', 'Arızalı'],
    datasets: [
        {
            label: 'Ünite',
            data: [12, 19, 3],
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
        },
    ]
};
export const donutData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
        },
    ],
};
export const lineOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};
export const lineData = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};
export const areaLineData = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export const areaLineOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

const StaticsPage = () => {
    return (
        <div className='flex justify-between w-full px-20 flex-wrap h-full'>
            <div className='w-full flex justify-between'>
                <Card
                    cardHeader={<h3 className='font-bold'>Şarj Üniteleri</h3>}
                    cardBody={
                        <Pie data={pieData} />
                    }
                    className='w-1/3 flex flex-col items-center m-2'
                />

                <Card
                    cardHeader={<h3 className='font-bold'>Şarj Üniteleri</h3>}
                    cardBody={
                        <Line options={lineOptions} data={lineData} style={{ width: "800px" }} />
                    }
                    className='w-2/3 flex flex-col items-center m-2 '
                />
            </div>
            <div className='w-full flex justify-between'>
                <Card
                    cardHeader={<h3 className='font-bold'>Şarj Üniteleri</h3>}
                    cardBody={
                        <Line options={areaLineOptions} data={areaLineData} style={{ height: "400px" }} />
                    }
                    className='w-2/3 flex flex-col items-center m-2'
                />
                <Card
                    cardHeader={<h3 className='font-bold'>Şarj Üniteleri</h3>}
                    cardBody={
                        <Doughnut data={donutData} />
                    }
                    className='w-1/3 m-2 flex flex-col items-center'
                />

            </div>
        </div>
    )
}

export default StaticsPage;
