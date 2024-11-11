import axios from 'axios';
import { IGetReportsPayloadProps } from './types';

const getUserReportsRequest = async (payload: IGetReportsPayloadProps) => {
  try {
    const response = await axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/Report/CustomerReport` || '',
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
          success: response.data.success,
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
