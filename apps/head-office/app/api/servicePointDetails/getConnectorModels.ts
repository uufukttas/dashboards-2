import axios from 'axios';
import { IConnectorModelProps } from './types';

const getConnectorModels = async (selectedBrandId: string): Promise<IConnectorModelProps> => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/Values/GetConnectorModels` || '',
                { brandId: selectedBrandId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );

        return response.data
    } catch (error) {
        return {
            success: false,
            data: [],
        }
    };
};

export { getConnectorModels };
