import axios from "axios";

const getTariffFractionTypeRequest = async () => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_TARIFF_SUB_FRACTION_TYPE_URL || '');

        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

export { getTariffFractionTypeRequest };
