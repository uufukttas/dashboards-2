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

interface IReportsProps {
  reportType: 'user' | 'charge' | 'all';
}

const Reports: React.FC<IReportsProps> = (props) => {
  const { reportType } = props;

  const pagePrefix: string = `${BRAND_PREFIX}-reports-center-page`;

  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.isLoadingVisible.isLoading
  );

  const reportSection = {
    ['user']: {
      title: 'Kullanıcı Raporları',
      headerName: 'Kullanıcı Raporları',
      render: <UserReportsSection />,
    },
    ['charge']: {
      title: 'Şarz Raporları',
      headerName: 'Şarz Raporları',
      render: <ChargeReportsSection />,
    },
    ['all']: {
      title: 'Tüm İşlemler',
      headerName: 'Tüm İşlemler',
      render: <ReportsSection />,
    },
  };

  useEffect(() => {
    dispatch(toggleLoadingVisibility(false));
  }, []);

  return (
    <div className={`${pagePrefix}-wrapper `}>
      <MainComponent headerName={reportSection[reportType].headerName}>
        <div
          className={`${pagePrefix}-container overflow-hidden w-full`}
        >
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
