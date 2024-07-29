import axios from 'axios';
import type { IServicePointDetailsFeatureValuesResponse } from './types'

const getServicePointFeatureValues = async (featureId: number): Promise<IServicePointDetailsFeatureValuesResponse> => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/StationFeature/GetFeatureValues` || '',
                JSON.stringify({ stationFeatureType: featureId }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
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
