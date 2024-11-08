import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseReport from './BaseReport';
import { UsersReportsTableHeadData } from './constants';
import { AppDispatch, RootState } from '../../../app/redux/store';
import { getUserReportsRequest } from '../../../app/api/reports/getUserReportsRequest';
import { setReportsData } from '../../../app/redux/features/getAllReports';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';

const UserReportsSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const reportsData = useSelector(
    (state: RootState) => state.getAllReports.reportsData
  );

  const getUserReports = async (): Promise<void> => {
    const response = await getUserReportsRequest({
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
    getUserReports();

    return () => {
      dispatch(setReportsData({ data: [], count: 0 }));
    };
  }, []);

  return (
    <BaseReport
      id="user-reports"
      data={reportsData}
      isLoading={isLoading}
      pagePrefix="user-reports"
      tableHeadData={UsersReportsTableHeadData}
    />
  );
};

export default UserReportsSection;
