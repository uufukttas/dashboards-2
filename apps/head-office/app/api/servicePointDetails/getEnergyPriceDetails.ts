import axios from "axios";

const getEnergyPriceDetails = async (stationId: string) => {
    try {
        const response = await axios
            .post(`${process.env.NEXT_PUBLIC_BASE_URL}/ServicePoint/GetEnergyPrice` || '',
                ({ stationId }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            )

        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    };
};

export { getEnergyPriceDetails };
