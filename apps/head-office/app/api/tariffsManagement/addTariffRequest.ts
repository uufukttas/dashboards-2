import axios from 'axios';
import { IAddTariffRequestProps } from './types';

const addTariffRequest = async (data: IAddTariffRequestProps) => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/Tariff/AddTariff`,
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            )

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export { addTariffRequest };
