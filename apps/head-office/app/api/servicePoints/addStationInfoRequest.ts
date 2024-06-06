import axios from "axios";
import { IFormDataProps } from "./types";

const addStationInfoRequest = async (actionData: IFormDataProps) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/StationInfo/AddStationInfo` || '',
            actionData,
            { headers: { 'Content-Type': 'application/json' } }
        )
            .then((response) => response.data)

        return response;
    } catch (error) {
        console.error(error);
    };
};

export { addStationInfoRequest };
