import { createSlice, Reducer } from '@reduxjs/toolkit';
import { IReportsDataStateProps } from '../types';

const initialState: IReportsDataStateProps = {
  allReports: {
    data: [],
    count: 0,
  },
  userReports: {
    data: [],
    count: 0,
  },
  paymentReports: {
    data: [],
    count: 0,
  },
  stationAlarmReports: {
    data: [],
    count: 0,
  },
  stationStatusReports: {
    data: [],
    count: 0,
  },
};

export const reportsData = createSlice({
  name: 'reportsData',
  initialState,
  reducers: {
    setReportsData: (state, action) => {
      state.allReports = action.payload;
    },
    setUsersData: (state, action) => {
      state.userReports = action.payload;
    },
    setPaymentData: (state, action) => {
      state.paymentReports = action.payload;
    },
    setStationStatusData: (state, action) => {
      state.stationStatusReports = action.payload;
    },
    setStationAlarmData: (state, action) => {
      state.stationAlarmReports = action.payload;
    }
  },
});

export const { setReportsData, setUsersData } = reportsData.actions;
export default reportsData.reducer as Reducer<IReportsDataStateProps>;
