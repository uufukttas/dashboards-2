import axios from "axios";
import { IFormDataProps } from "./types";

const addStationInfoRequest = async (actionData: IFormDataProps) => {
    try {
        await axios
        .post(
            process.env.NEXT_PUBLIC_ADD_STATION_INFO_URL || '',
          actionData,
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => response.data)
    } catch (error) {
        console.error(error);
    };
};

export { addStationInfoRequest };
