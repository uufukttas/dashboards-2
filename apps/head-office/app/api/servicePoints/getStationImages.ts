import axios from 'axios';
import { IGetStationImagesResponse } from './types';

const getStationImages = async (
  stationId: string
): Promise<IGetStationImagesResponse> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/StationPoint/GetImageList` || '',
      {
        params: {
          stationId,
        },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return {
      error: error,
    };
  }
};

export default getStationImages;
