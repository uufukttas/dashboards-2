import axios from "axios";

const getChargePointInvestors = async () => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/Values/GetInvestors` || '',
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
        )

        return response.data;
    } catch (error) {
        console.error("Error getting charge point investors", error);
    }
};

export { getChargePointInvestors };
