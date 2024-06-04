import axios from "axios";
import { IFormDataProps } from "./types";

const updateStationInfoRequest = async (actionData: IFormDataProps) => {
    try {
        const response = await axios
            .post(
                process.env.NEXT_PUBLIC_ADD_STATION_INFO_URL || '',
                actionData,
                { headers: { 'Content-Type': 'application/json' } }
            );

        return response;
    } catch (error) {
        return {
            response: {
                message: "Error updating station info",
            }
        };
    };
};

export { updateStationInfoRequest };
