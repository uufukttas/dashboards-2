import axios from 'axios';
import { IGetReportsPayloadProps } from './types';

const getStationStatusReports = async (payload: IGetReportsPayloadProps) => {
  try {
    const response = await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/Report/StationStatus` || '', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        return {
          data: response.data.data,
          success: response.data.success,
        };
      });

    return {
      data: response.data,
      count: response.data.length,
      success: response.success,
    };
  } catch (error) {
    const response = {
      data: [],
      count: 0,
      success: false,
    };

    return response;
  }
};

export { getStationStatusReports };
