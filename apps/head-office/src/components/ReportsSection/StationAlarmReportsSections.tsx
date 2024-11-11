import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BaseReport from './BaseReport';
import { StationAlarmReportsTableHeadData } from './constants';
import { AppDispatch } from '../../../app/redux/store';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { getStationAlarmReports } from '../../../app/api/reports/getStationAlarmReportsRequest';

const StationAlarmReportSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);

  const getReports = async (): Promise<void> => {
    dispatch(toggleLoadingVisibility(true));

    const response = await getStationAlarmReports({
      pageNumber: 1,
      userCount: 100,
    });

    setData(response.data);

    setIsLoading(false);
    dispatch(toggleLoadingVisibility(false));
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <BaseReport
      id="station-alarm-reports"
      data={data}
      isLoading={isLoading}
      pagePrefix="station-status-reports"
      tableHeadData={StationAlarmReportsTableHeadData}
    />
  );
};

export default StationAlarmReportSection;
