import axios from "axios";

const getTariffFractionTypeRequest = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/ServicePoint/TariffSubFractionTypes` || '');

        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

export { getTariffFractionTypeRequest };
