import axios from "axios";
import { IResellerRequestProps } from "./types";

const getResellersRequest = async (): Promise<IResellerRequestProps[] | []> => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/ServicePoint/GetResellers` || '',
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
        );

        if (!response.data.success) {
            return [];
        }

        return response.data.data;
    } catch (error) {
        return [];
    };
};

export { getResellersRequest };
