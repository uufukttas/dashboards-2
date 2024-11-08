import React, { Fragment, useEffect } from 'react';
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
  Tooltip,
} from 'chart.js';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut, Line, Pie } from 'react-chartjs-2';
import { BRAND_PREFIX } from '../../../constants/constants';
import { detectDevice } from '@projects/common';
import { useDispatch } from 'react-redux';
import { IChartData, IDashboardData } from '../types';
import {
  FaBatteryHalf,
  FaChargingStation,
  FaCircleInfo,
} from 'react-icons/fa6';
import { BiSolidEvStation } from 'react-icons/bi';
import { HiUserGroup } from 'react-icons/hi';
import { toggleLoadingVisibility } from '../../../../app/redux/features/isLoadingVisible';

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
  Tooltip
);
const ChartComponent = ({
  widget,
  componentValue,
}: {
  widget: any;
  componentValue: any;
}) => {
  const isDesktop = detectDevice().isDesktop;
  const isTablet = detectDevice().isTablet;
  const isMobile = detectDevice().isMobile;

  const getLabels = (count: number) => {
    return Array.from({ length: count }, (_, index) => (index + 1).toString());
  };

  const lineOptions = {
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        position: 'bottom',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        labels: getLabels(
          (() => {
            switch (widget.widgetCode) {
              case 'yearly_earning':
              case 'yearly_kwh_consumption':
              case 'annual_total':
                return 12;
              case 'monthly_kwh_consumption':
              case 'monthly_earning':
                return 5;
              case 'last_8_day_ac_dc_sales':
                return 8;
              default:
                return 0;
            }
          })()
        ),
      },
    },
    responsive: true,
  };
  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Combined Bar and Line Chart',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        // Grid çizgilerini çizilmemesi için
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  const pagePrefix: string = `${BRAND_PREFIX}-dashboard-page-cards`;
  const dispatch = useDispatch();
  const doughnutData = (response: any) => {
    const labels = response.map(
      (item: { name: string; data: any }) => item.name
    );
    const data = response.map((item: { name: string; data: any }) =>
      Number(item.data).toFixed(2)
    );

    return {
      datasets: [
        {
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(254, 245, 229, 0.6)',
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
  };
  const getCardIcon = (icon: string): JSX.Element => {
    switch (icon) {
      case 'FaChargingStation':
        return <FaChargingStation className="text-6xl" />;
      case 'BiSolidEvStation':
        return <BiSolidEvStation className="text-6xl" />;
      case 'FaBatteryHalf':
        return <FaBatteryHalf className="text-6xl" />;
      case 'HiUserGroup':
        return <HiUserGroup className="text-6xl" />;
      default:
        return <></>;
    }
  };
  // @ts-ignore
  const ACDCPrepareData = (data) => {
    // İlk adımda verileri tamamlıyoruz
    // @ts-ignore
    const completedData = data.map((item) => {
      const completedItem = { ...item.data };

      // 1'den 8'e kadar olan anahtarları kontrol ediyoruz ve eksik olanlara 0 ekliyoruz
      for (let i = 1; i <= 8; i++) {
        if (completedItem[i] === undefined) {
          completedItem[i] = 0;
        }
      }

      return {
        ...item,
        data: completedItem,
      };
    });

    // 'ac' ve 'dc' türlerini kontrol ediyoruz
    // @ts-ignore
    const acItem = completedData.find((item) => item.type === 'ac');
    // @ts-ignore
    const dcItem = completedData.find((item) => item.type === 'dc');

    const result = [];

    // 'ac' tipi varsa, onu ekliyoruz
    if (acItem) {
      result.push(acItem);
    } else {
      // 'ac' tipi yoksa, varsayılan bir obje modelinde ekliyoruz
      result.push({
        type: 'ac',
        data: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
      });
    }

    // 'dc' tipi varsa, onu ekliyoruz
    if (dcItem) {
      result.push(dcItem);
    } else {
      // 'dc' tipi yoksa, varsayılan bir obje modelinde ekliyoruz
      result.push({
        type: 'dc',
        data: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 },
      });
    }

    return result;
  };

  const getValue = (data: IDashboardData) => {
    if (!data?.chartType) return <></>;

    switch (data.chartType) {
      case 'line': {
        const response = lineData(data?.listItemData);
        return (
          <Line
            data={response}
            // @ts-ignore
            options={lineOptions}
          />
        );
      }
      case 'donut': {
        const response = doughnutData(data?.listItemData);
        return (
          <Doughnut
            data={response}
            options={{
              plugins: {
                legend: {
                  position: 'bottom',
                },
                title: {
                  display: false,
                  text: 'Chart.js Line Chart',
                },
              },
            }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        );
      }
      case 'semi_doughnut':
      case 'pie':
    }
  };

  // @ts-ignore
  const PrepareMonthlyEanrningData = (data) => {
    // @ts-ignore
    const completedData = data.map((item) => {
      const completedItem = { ...item.data };

      // 1'den 8'e kadar olan anahtarları kontrol ediyoruz ve eksik olanlara 0 ekliyoruz
      for (let i = 1; i <= 5; i++) {
        // if (completedItem[0][i] === undefined || completedItem[1][i] === undefined) {
        completedItem[i] = 0;
        // }
      }

      return {
        ...item,
        data: completedItem,
      };
    });

    // 'ac' ve 'dc' türlerini kontrol ediyoruz
    // @ts-ignore
    const acItem = completedData.find((item) => item.type === 'ac');
    // @ts-ignore
    const dcItem = completedData.find((item) => item.type === 'dc');

    const result = [];

    // 'ac' tipi varsa, onu ekliyoruz
    if (acItem) {
      result.push(acItem);
    } else {
      // 'ac' tipi yoksa, varsayılan bir obje modelinde ekliyoruz
      result.push({
        type: 'ac',
        data: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      });
    }

    // 'dc' tipi varsa, onu ekliyoruz
    if (dcItem) {
      result.push(dcItem);
    } else {
      // 'dc' tipi yoksa, varsayılan bir obje modelinde ekliyoruz
      result.push({
        type: 'dc',
        data: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      });
    }

    return result;
  };

  const lineData = (response: any) => {
    widget.widgetCode === 'last_8_day_ac_dc_sales' &&
      (response = ACDCPrepareData(response));
    widget.widgetCode === 'monthly_earning' &&
      (response = PrepareMonthlyEanrningData(response));
    let acData,
      dcData,
      todayData,
      lastWeekData,
      monthData,
      lastMonthData,
      yearData,
      lastYearData;
    console.log('response', response);
    if (response[0]?.type === 'ac' || response[1]?.type === 'dc') {
      ({ acData: acData, dcData: dcData } = processData(response, 'ac', 'dc'));
    } else if (response[0][0].type === 'ac' || response[0][1].type === 'dc') {
      ({ acData: todayData, dcData: lastWeekData } = processData(
        response,
        'today',
        'last_week_today'
      ));
    }
    const key =
      (response[0].ac && response[0]?.ac[0]) ||
      (response[0].today && response[0]?.today[0]) ||
      (response[0].month && response[0]?.month[0]) ||
      (response[0].year && response[0]?.year[0]);
    return {
      datasets: [
        {
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          data: yearData || monthData || todayData || acData,
          label: 'AC',
        },
        {
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          borderColor: 'rgb(53, 162, 235)',
          data: lastYearData || lastMonthData || lastWeekData || dcData,
          label: 'DC',
        },
      ],
      labels: Object.keys(key || []).map((key) => key),
    };
  };
  const processData = (
    response: any,
    currentKey: string,
    previousKey: string
  ) => {
    let acData = response[0],
      dcData = response[1];

    if (Array.isArray(response[0])) {
      acData = response[0][0].data.map((item: any) =>
        item.kwh ? item.kwh : item.amount
      );
      dcData = response[0][1].data.map((item: any) =>
        item.kwh ? item.kwh : item.amount
      );
    } else {
      if (acData && dcData) {
        acData = Object.keys(response[0].data).map(
          (point) => response[0]?.data[point]
        );
        dcData = Object.keys(response[1].data).map(
          (point) => response[1]?.data[point]
        );
      }
    }
    return { acData, dcData };
  };
  const barLineData = (data: IChartData[]) => {
    const transformedData: {
      labels: string[];
      amount: number[];
      charge_count: number[];
      kwh: number[];
      service_fee: number[];
    } = {
      labels: [],
      amount: [],
      charge_count: [],
      kwh: [],
      service_fee: [],
    };
    data.forEach((item: any) => {
      const key = Object.keys(item)[0];
      const stats = item[key];
      transformedData.labels.push(key);
      transformedData.amount.push(stats.amount);
      transformedData.charge_count.push(stats.charge_count);
      transformedData.kwh.push(stats.kwh);
      transformedData.service_fee.push(stats.service_fee);
    });
    return {
      labels: transformedData.labels,
      datasets: [
        {
          type: 'bar',
          label: 'Bar Dataset 1',
          data: transformedData.charge_count,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          yAxisID: 'y',
        },
        {
          type: 'line',
          label: 'Line Dataset 1',
          data: transformedData.kwh,
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          yAxisID: 'y1',
        },
        {
          type: 'bar',
          label: 'Bar Dataset 2',
          data: transformedData.amount,
          borderColor: 'rgb(255, 159, 64)',
          backgroundColor: 'rgba(255, 159, 64, 0.5)',
          yAxisID: 'y',
        },
        {
          type: 'line',
          label: 'Line Dataset 2',
          data: transformedData.service_fee,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          yAxisID: 'y1',
        },
      ],
    };
  };
  const renderGraphics = (data: IDashboardData) => {
    if (data.type === 'line') {
      return (
        <div className="w-full h-full">
          <Line
            data={lineData(data.value)}
            // @ts-expect-error will delete
            options={lineOptions}
          />
        </div>
      );
    } else if (data.type === 'doughnut') {
      return (
        <div className="w-full h-full flex justify-center items-center">
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
              },
            }}
          />
        </div>
      );
    } else if (data.type === 'semi_doughnut') {
      return (
        <div className="w-full h-full flex justify-center items-center">
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
              },
              rotation: -90,
              circumference: 180,
              cutout: '50%',
              maintainAspectRatio: true,
              responsive: true,
            }}
          />
        </div>
      );
    } else if (data.type === 'pie') {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Pie
            data={doughnutData(data.value)}
            options={{
              plugins: {
                legend: {
                  position: 'bottom' as const,
                },
              },
            }}
          />
        </div>
      );
    } else if (data.type === 'line&bar') {
      return (
        <div className="w-full h-full h-[400px] flex items-center justify-center">
          {/* <Bar data={barLineData(data.value)} className={`flex justify-center items-center !w-[800px]`} style={{ width: "1150", height: '450' }} /> */}
        </div>
      );
    } else if (data.type === 'list') {
      return (
        <div className="w-full h-full">
          <ul>
            {data.value.map((item: IChartData) => {
              return (
                <li key={Object.keys(item)[0]} className="text-xl">
                  <div className="flex items-start justify-between">
                    <div className="text-md">{Object.keys(item)[0]}</div>
                    <div className="text-md">{[Object.keys(item)[0]]}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  };

  useEffect(() => {
    dispatch(toggleLoadingVisibility(false));
  }, []);

  if (!componentValue) {
    return (
      <div className="animate-pulse flex flex-col items-center justify-center h-full w-full px-4">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-4 mx-4"></div>
        <div className="h-64 bg-gray-300 rounded w-full"></div>
      </div>
    );
  }

  return (
    <div
      className={`${pagePrefix}-info-container w-full flex justify-between flex-wrap min-w-1/2 `}
    >
      <div
        className={`${pagePrefix}-card-row-wrapper flex flex-col md:flex-row w-full`}
      >
        <div className="w-full h-full grid">
          <Fragment>
            <div
              className={`card-content w-full h-full flex text-center justify-between`}
            >
              <div className="card-info-container flex flex-col items-center justify-start px-4 w-full">
                <div className="card-title-container flex items-center justify-start w-full">
                  <div className={`lg:text-lg font-bold text-md`}>
                    {componentValue?.widgetTitle}
                  </div>
                </div>
                <div className="card-info text-2xl flex w-full items-center justify-end h-full">
                  {getValue(componentValue)}
                </div>
              </div>
              {componentValue?.icon_name && (
                <div className="card-icon-container flex items-center justify-center text-primary px-1">
                  {getCardIcon(componentValue?.icon_name)}
                </div>
              )}
            </div>
            {componentValue?.widgetDescription && (
              <div className="w-full description-container flex items-end text-xs px-4">
                <div className="w-full flex items-center justify-start">
                  <FaCircleInfo className="mx-2" />
                  {componentValue?.widgetDescription}
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
