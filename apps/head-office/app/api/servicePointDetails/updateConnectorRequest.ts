import axios from "axios";
import { IUpdateConnectorRequestProps } from "./types";

const updateConnectorRequest = async (data: IUpdateConnectorRequestProps) => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_UPDATE_CONNECTOR_URL || '',
            data,
        );

        return response;
    } catch (error) {
        console.error(error);
    }
};

export { updateConnectorRequest };
