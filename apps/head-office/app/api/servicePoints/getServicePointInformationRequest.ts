import axios from 'axios';
import type { IServicePointInformationResponseProps } from './types';

const getServicePointInformationRequest = async (servicePointId: number): Promise<IServicePointInformationResponseProps> => {
    try {
        const response = await axios
        .post(
            process.env.NEXT_PUBLIC_GET_STATION_INFO_BY_ID || '',
            ({ 'stationId': servicePointId })
        )
        .then((response) => response)

        return response.data;
    } catch (error) {
        const response = {
            error: 'Istasyon servisinde hata!. Tekrar deneyiniz.',
            success: false,
            data: [],
        };

        return response;
    };
};

export { getServicePointInformationRequest };
