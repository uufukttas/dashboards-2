'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import MainComponent from '../MainComponent/MainComponent';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { RootState, AppDispatch } from '../../../app/redux/store';
import ReportsSection from './ReportsSection';
import UserReportsSection from './UserReportsSection';
import ChargeReportsSection from './ChargeReportsSection';
import StationStatusReportSection from './StationStatusReportsSections';

interface IReportsProps {
  reportType: 'all' | 'user' | 'station-status' | 'station-alarm' | 'payment';
}

const Reports: React.FC<IReportsProps> = (props) => {
  const { reportType } = props;

  const pagePrefix: string = `${BRAND_PREFIX}-reports-center-page`;

  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.isLoadingVisible.isLoading
  );

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
      render: <ChargeReportsSection />,
    },
    ['payment']: {
      title: 'Ödeme Raporları',
      headerName: 'Ödeme Raporları',
      render: <ChargeReportsSection />,
    },
  };

  useEffect(() => {
    dispatch(toggleLoadingVisibility(false));
  }, []);

  return (
    <div className={`${pagePrefix}-wrapper `}>
      <MainComponent headerName={reportSection[reportType].headerName}>
        <div className={`${pagePrefix}-container overflow-hidden w-full`}>
          <div
            className={`${BRAND_PREFIX}-reports-center-container overflow-hidden w-full`}
          >
            {reportSection[reportType].render}
          </div>
        </div>
      </MainComponent>
      {isLoading && <Loading />}
    </div>
  );
};

export default Reports;
