import axios from "axios";

const getComissionDetails = async (servicePointId: string) => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_GET_COMISSIONS_URL || '',
            { stationId: servicePointId },
            { headers: { "Content-Type": "application/json" } },
        );

        return response.data;
    } catch (error) {
        console.error("Error while fetching comission details: ", error);
    };
};

export { getComissionDetails };
