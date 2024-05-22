import axios from "axios";

const getInvestors = async () => {
    try {
        const response = await axios.get(process.env.GET_INVESTORS || '');

        return response.data;
    } catch (error) {
        console.error(error);
    };
};

export { getInvestors };
