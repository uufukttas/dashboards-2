import axios from 'axios';
import type { IServicePointDataResponseProps } from './types';

const getServicePointDataRequest = async (servicePointId: number): Promise<IServicePointDataResponseProps> => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/ServicePoint/GetStationById` || '',
                ({ 'id': servicePointId })
            )
            .then((response) => response.data)

        return response;
    } catch (error) {
        const response = {
            success: false,
            error: 'Istasyon servisinde hata!. Tekrar deneyiniz.',
            data: [],
        };

        return response;
    };
};

export { getServicePointDataRequest };
