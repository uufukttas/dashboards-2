import axios from 'axios';
import { IResponseStatusProps } from '../types';

const loginRequest = async (credentials: string): Promise<IResponseStatusProps | null >  => {
    try {
        const response = await axios.post(
            process.env.LOGIN_URL || '',
            credentials,
            { headers: { 'Content-Type': 'application/json' } }
        );

        return response;
    } catch (error) {
        return null;
    };
};

export default loginRequest;
