import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllReportsRequest } from '../../../app/api/reports';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import './ReportsSection.css';
import BaseReport from './BaseReport';
import { AllReportsTableHeadData } from './constants';

const ReportsSection: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);

  const getAllChargeData = async (): Promise<void> => {
    dispatch(toggleLoadingVisibility(true));
    const response = await getAllReportsRequest({
      pageNumber: 1,
      userCount: 100,
    });

    setData(response.data);

    setIsLoading(false);
    dispatch(toggleLoadingVisibility(false));
  };

  useEffect(() => {
    getAllChargeData();
  }, []);

  return (
    <BaseReport
      id="all-reports"
      data={data}
      isLoading={isLoading}
      pagePrefix="all-reports"
      tableHeadData={AllReportsTableHeadData}
    />
  );
};

export default ReportsSection;
