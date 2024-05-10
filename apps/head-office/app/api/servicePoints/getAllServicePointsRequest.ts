import axios from 'axios';
import type { IGetServicePointsProps } from './types';

const getAllServicePointsRequest = async (currentPage: number): Promise<IGetServicePointsProps> => {
    try {
        const response = await axios
            .post(
                process.env.GET_ALL_SERVICE_POINTS || '',
                ({
                    'pageNumber': currentPage,
                    'userCount': 10,
                })
            )
            .then((response) => {
                return {
                    data: response.data.data,
                    count: response.data.count,
                    success: response.status === 200,
                }
            });

        return response;
    } catch (error) {
        const response = {
            data: [],
            count: 0,
            success: false,
        };

        return response;
    };
};

export { getAllServicePointsRequest };
