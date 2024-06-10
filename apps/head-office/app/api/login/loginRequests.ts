import axios from 'axios';
import type { ILoginRequestProps, IResponseInfoProps } from '../types';

const loginRequest = async (credentials: ILoginRequestProps): Promise<IResponseInfoProps> => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/Auth/Login` || '',
            credentials,
            { headers: { 'Content-Type': 'application/json' } }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
                return { status: 400, data: { message: 'Hay aksi bir seyler ters gitti...' } };
            } else if (error.response?.status === 401) {
                return { status: 401, data: { message: 'Kullanici adi veya sifre hatali.' } };
            }
        }

        return { status: 500, data: { message: 'Sunucu hatasi olustu.' } };
    };
};

export default loginRequest;
