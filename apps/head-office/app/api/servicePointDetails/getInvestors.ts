import axios from "axios";

const getInvestors = async () => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_GET_INVESTORS || '');

        return response.data;
    } catch (error) {
        console.error(error);
    };
};

export { getInvestors };
