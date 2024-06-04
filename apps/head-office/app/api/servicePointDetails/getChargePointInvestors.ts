import axios from "axios";

const getChargePointInvestors = async () => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_GET_INVESTORS || '')
console.log('response', response)
        return response.data;
    } catch (error) {
        console.error("Error getting charge point investors", error);
    }
};

export { getChargePointInvestors };
