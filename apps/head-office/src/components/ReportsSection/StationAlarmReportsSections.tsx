import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseReport from './BaseReport';
import { UsersReportsTableHeadData } from './constants';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { setReportsData } from '../../../app/redux/features/getAllReports';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { getStationStatusReports } from '../../../app/api/reports/getStationStatusReportsRequest';

const StationStatusReportSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reportsData = useSelector(
    (state: RootState) => state.getAllReports.reportsData
  );

  const getReports = async (): Promise<void> => {
    const response = await getStationStatusReports({
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
    getReports();

    return () => {
      dispatch(setReportsData({ data: [], count: 0 }));
    };
  }, []);

  return (
    <BaseReport
      id="station-status-reports"
      data={reportsData}
      isLoading={isLoading}
      pagePrefix="station-status-reports"
      tableHeadData={UsersReportsTableHeadData}
    />
  );
};

export default StationStatusReportSection;
