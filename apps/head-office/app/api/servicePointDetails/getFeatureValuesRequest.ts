import axios from 'axios';
import type { IServicePointDetailsFeatureValuesResponse } from './types'

const getServicePointFeatureValues = async (featureId: number): Promise<IServicePointDetailsFeatureValuesResponse> => {
    try {
        const response = await axios
            .post(
                process.env.NEXT_PUBLIC_GET_FEATURE_VALUES || '',
                JSON.stringify({ stationFeatureType: featureId }),
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then((response) => response.data)
        return response;
    } catch (error) {
        return {
            data: [],
            success: false,
        };
    };
};

export { getServicePointFeatureValues };
