import axios from 'axios';
import { IGetReportsPayloadProps } from './types';

const getUserReportsRequest = async (payload: IGetReportsPayloadProps) => {
  try {
    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Report/UserReports` || '',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        return {
          data: response.data.data,
          count: response.data.count,
          success: response.status === 200,
        };
      });

    return response;
  } catch (error) {
    const response = {
      data: [],
      count: 0,
      success: false,
    };

    return response;
  }
};

export { getUserReportsRequest };
