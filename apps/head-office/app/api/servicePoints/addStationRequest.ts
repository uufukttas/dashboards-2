import axios from 'axios';
import type { IFormDataProps } from './types';

const addStationRequest = async (actionData: IFormDataProps) => {
    try {
        const response = await axios
            .post(
                process.env.NEXT_PUBLIC_ADD_STATION_URL || '',
                actionData,
                { headers: { 'Content-Type': 'application/json' } }
            )

        return response.data;
    } catch (error) {
        console.error(error);
    };
};

export { addStationRequest };
