import axios from 'axios';
import type { IResponseInfoProps } from '../types.d';

const loginRequest = async (credentials: string): Promise<IResponseInfoProps | null> => {
    try {
        const response = await axios.post(
            process.env.LOGIN_URL || '',
            credentials,
            { headers: { 'Content-Type': 'application/json' } }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response || null;
        } else {
            return null;
        };
    };
};

export default loginRequest;
