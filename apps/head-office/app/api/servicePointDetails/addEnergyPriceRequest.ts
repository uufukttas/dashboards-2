import axios from "axios";

const addEnergyPriceRequest = async (data: string) => {
    try {
        const response = axios
            .post(
                process.env.NEXT_PUBLIC_ADD_ENERGY_PRICE_URL || '',
                data,
                { headers: { 'Content-Type': 'application/json' } }
            )

        return response;
    } catch (error) {
        console.error(error);
    }
};

export { addEnergyPriceRequest };
