'use client';

import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import MainComponent from '../MainComponent/MainComponent';
import ReportsSection from './ReportsSection';
import StationAlarmReportSection from './StationAlarmReportsSections';
import StationPaymentReportsSection from './StationPaymentsReportsSection';
import StationStatusReportSection from './StationStatusReportsSections';
import UserReportsSection from './UserReportsSection';

interface IReportsProps {
  reportType: 'all' | 'user' | 'station-status' | 'station-alarm' | 'payment';
}

const Reports: React.FC<IReportsProps> = (props) => {
  const { reportType } = props;

  const pagePrefix: string = `${BRAND_PREFIX}-reports-center-page`;

  const reportSection = {
    ['all']: {
      title: 'Tüm İşlemler',
      headerName: 'Tüm İşlemler',
      render: <ReportsSection />,
    },
    ['user']: {
      title: 'Kullanıcı Raporları',
      headerName: 'Kullanıcı Raporları',
      render: <UserReportsSection />,
    },
    ['station-status']: {
      title: 'İstasyon Durum Raporları',
      headerName: 'İstasyon Durum Raporları',
      render: <StationStatusReportSection />,
    },
    ['station-alarm']: {
      title: 'İstasyon Alarm Raporları',
      headerName: 'İstasyon Alarm Raporları',
      render: <StationAlarmReportSection />,
    },
    ['payment']: {
      title: 'Ödeme Raporları',
      headerName: 'Ödeme Raporları',
      render: <StationPaymentReportsSection />,
    },
  };

  return (
    <div className={`${pagePrefix}-wrapper `}>
      <MainComponent headerName={reportSection[reportType].headerName}>
        <div className={`${pagePrefix}-container overflow-hidden w-full`}>
          <div className={`${BRAND_PREFIX}-reports-center-container overflow-hidden w-full`}>
            {reportSection[reportType].render}
          </div>
        </div>
      </MainComponent>
    </div>
  );
};

export default Reports;
