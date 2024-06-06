import axios from 'axios';
import type { IGetServicePointsProps } from './types';

const getAllServicePointsRequest = async (currentPage: number, searchedServicePointName?: string): Promise<IGetServicePointsProps> => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/ServicePoint/GetAllPoints` || '',
                ({
                    'pageNumber': currentPage,
                    'userCount': 10,
                    'name': searchedServicePointName || '',
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
