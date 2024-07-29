import axios from "axios";
import { ICompanyRequestProps } from "./types";

const getCompaniesRequest = async (): Promise<ICompanyRequestProps[] | []> => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/ServicePoint/GetCompanies` || '',
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

export { getCompaniesRequest };
