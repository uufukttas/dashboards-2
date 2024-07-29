import axios from "axios";

const getCityRequest = async () => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/Values/GetCities` || '',
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
        );

        return response.data.data;
    } catch (error) {
        console.log('error', error)
    }
};

export { getCityRequest };
