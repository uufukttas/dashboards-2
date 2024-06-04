import axios from "axios";

const getWorkingHoursRequest = async (servicePointId: string) => {
    try {
        const response = await axios
            .post(
                process.env.NEXT_PUBLIC_GET_WORKING_HOURS || '',
                JSON.stringify({ "stationID": servicePointId }),
                { headers: { 'Content-Type': 'application/json' } }
            )

        return response.data;
    } catch (error) {
        console.error("Error while getting working hours", error);
    }
};

export { getWorkingHoursRequest };
