import axios from "axios";

const getEnergyPriceDetails = async (stationId: string) => {
    try {
        const response = await axios
            .post(process.env.GET_ENERGY_PRICE || '',
                ({ stationId }),
                { headers: { "Content-Type": "application/json" } }
            )

        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    };
};

export { getEnergyPriceDetails };
