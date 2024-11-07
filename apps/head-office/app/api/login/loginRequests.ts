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
                return { status: 400, data: { message: 'Hay aksi bir seyler ters gitti...' }, token: { result: '' } };
            } else if (error.response?.status === 401) {
                return { status: 401, data: { message: 'Kullanıcı adi veya sifre hatali.' }, token: { result: '' } };
            }
        }

        return {
            status: 500, data: { message: 'Sunucu hatasi olustu.' }, token: { result: '' }
        }
    }
};

export default loginRequest;
