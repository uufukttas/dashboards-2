import axios from "axios";

const getComissionDetails = async (servicePointId: string) => {
    try {
        const response = await axios.post(
            process.env.GET_COMISSIONS_URL || '',
            { stationId: servicePointId },
            { headers: { "Content-Type": "application/json" } },
        );

        console.log('response', response)

        return response.data;
    } catch (error) {
        console.error("Error while fetching comission details: ", error);
    };
};

export { getComissionDetails };
