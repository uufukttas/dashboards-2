import axios from "axios";

const deleteEnergyPriceRequest = async (energyPriceId: number) => {
    try {
        const response = await axios.post(
            process.env.REMOVE_ENERGY_PRICE || '',
            { Id: energyPriceId },
            { headers: { "Content-Type": "application/json" } },
        );

        return response.data;
    } catch (error) {
        console.error("Error: ", error);
    };
};

export { deleteEnergyPriceRequest };
