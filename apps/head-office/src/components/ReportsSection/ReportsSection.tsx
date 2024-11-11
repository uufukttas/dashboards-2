import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReportsRequest } from '../../../app/api/reports';
import { setReportsData } from '../../../app/redux/features/getAllReports';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { RootState } from '../../../app/redux/store';
import './ReportsSection.css';
import BaseReport from './BaseReport';
import { AllReportsTableHeadData } from './constants';

const ReportsSection: React.FC = () => {
  const dispatch = useDispatch();
  const reportsData = useSelector(
    (state: RootState) => state.getAllReports.reportsData
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getAllChargeData = async (): Promise<void> => {
    const response = await getAllReportsRequest({
      pageNumber: 1,
      userCount: 100,
    });

    dispatch(
      setReportsData({
        data: response.data,
        count: response.count,
      })
    );

    setIsLoading(false);
    dispatch(toggleLoadingVisibility(false));
  };

  useEffect(() => {
    getAllChargeData();
  }, []);

  return (
    <BaseReport
      id="all-reports"
      data={reportsData}
      isLoading={isLoading}
      pagePrefix="all-reports"
      tableHeadData={AllReportsTableHeadData}
    />
  );
};

export default ReportsSection;
