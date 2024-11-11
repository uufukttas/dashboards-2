import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BaseReport from './BaseReport';
import { StationStatusReportsTableHeadData } from './constants';
import { AppDispatch } from '../../../app/redux/store';
import { setReportsData } from '../../../app/redux/features/getAllReports';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { getStationStatusReports } from '../../../app/api/reports/getStationStatusReportsRequest';

const StationStatusReportSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);

  const getReports = async (): Promise<void> => {
    dispatch(toggleLoadingVisibility(true));

    const response = await getStationStatusReports({
      pageNumber: 1,
      userCount: 100,
    });

    setData(response.data);
    setIsLoading(false);
    dispatch(toggleLoadingVisibility(false));
  };

  useEffect(() => {
    getReports();

    return () => {
      dispatch(setReportsData({ data: [], count: 0 }));
    };
  }, []);

  return (
    <BaseReport
      id="station-status-reports"
      data={data}
      isLoading={isLoading}
      pagePrefix="station-status-reports"
      tableHeadData={StationStatusReportsTableHeadData}
    />
  );
};

export default StationStatusReportSection;
