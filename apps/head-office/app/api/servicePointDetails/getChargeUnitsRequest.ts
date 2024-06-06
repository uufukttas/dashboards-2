import axios from "axios";

const getChargeUnitsRequest = async (slug: number) => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/ServicePoint/GetStationSettings` || '',
                JSON.stringify({
                    stationId: slug,
                    PageNumber: 1,
                    PageSize: 10
                }),
                { headers: { 'Content-Type': 'application/json' } }
            );

        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    };
};

export { getChargeUnitsRequest };
