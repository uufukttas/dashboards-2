import axios from "axios";

const getChargePointInvestors = async () => {
    try {
        const response = await axios.get(process.env.GET_INVESTORS || '')

        return response.data;
    } catch (error) {
        console.error("Error getting charge point investors", error);
    }
};

export { getChargePointInvestors };