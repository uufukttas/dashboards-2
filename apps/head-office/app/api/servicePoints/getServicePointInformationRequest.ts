import axios from 'axios';
import type { IServicePointInformationResponseProps } from './types';

const getServicePointInformationRequest = async (servicePointId: number): Promise<IServicePointInformationResponseProps> => {
    try {
        const response = await axios
        .post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/StationInfo/GetByStationId` || '',
            ({ 'stationId': servicePointId }),
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
        )
        .then((response) => response)

        return response.data;
    } catch (error) {
        const response = {
            error: 'İstasyon servisinde hata!. Tekrar deneyiniz.',
            success: false,
            data: [],
        };

        return response;
    };
};

export { getServicePointInformationRequest };
