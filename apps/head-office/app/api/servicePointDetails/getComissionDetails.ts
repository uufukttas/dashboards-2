import axios from "axios";

const getComissionDetails = async (servicePointId: string) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/ServicePoint/SelectCommisionRate` || '',
            { stationId: servicePointId },
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            },
        );

        return response.data;
    } catch (error) {
        console.error("Error while fetching comission details: ", error);
    };
};

export { getComissionDetails };
