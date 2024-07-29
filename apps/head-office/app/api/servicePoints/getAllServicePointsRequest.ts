import axios from 'axios';
import type { IGetAllServicePointPayloadProps, IGetServicePointsProps } from './types';

const getAllServicePointsRequest =
    async (payload: IGetAllServicePointPayloadProps): Promise<IGetServicePointsProps> => {
        try {
            const response = await axios
                .post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/ServicePoint/GetAllPoints` || '',
                    {
                        payload,
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        }
                    }
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
