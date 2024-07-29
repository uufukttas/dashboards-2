import axios from "axios";
import { IUpdateConnectorRequestProps } from "./types";

const updateConnectorRequest = async (data: IUpdateConnectorRequestProps) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/ServicePoint/UpdateConnector` || '',
            data,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        return response;
    } catch (error) {
        console.error(error);
    }
};

export { updateConnectorRequest };
