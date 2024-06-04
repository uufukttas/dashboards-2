import axios from "axios";
import { IComissionRequestProps } from "./types";

const addComissionRequest = async (data: IComissionRequestProps) => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_ADD_COMISSION_URL || '',
            data
        );

        return response;
    } catch (error) {
        console.error(error);
    }
};

export { addComissionRequest };
