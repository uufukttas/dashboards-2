import axios from 'axios';
import { IConnectorModelProps } from './types';

const getConnectorModels = async (selectedBrandId: string): Promise<IConnectorModelProps> => {
    try {
        const response = await axios
            .post(
                process.env.NEXT_PUBLIC_GET_CONNECTOR_MODELS || '',
                { brandId: selectedBrandId },
                { headers: { 'Content-Type': 'application/json' } }
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
