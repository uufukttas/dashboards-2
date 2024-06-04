import axios from 'axios';
import type { IFormDataProps } from './types';

const updateStationRequest = async (actionData: IFormDataProps) => {
    try {
        const response = await axios
            .post(
                process.env.NEXT_PUBLIC_UPDATE_STATION_URL || '',
                actionData,
                { headers: { 'Content-Type': 'application/json' } }
            )

        return response.data;
    } catch (error) {
        console.error(error);
    };
};

export { updateStationRequest };
