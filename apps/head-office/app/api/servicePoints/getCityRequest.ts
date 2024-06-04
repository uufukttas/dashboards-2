import axios from "axios";

const getCityRequest = async () => {
    try {
        const response = await axios.get(
            process.env.NEXT_PUBLIC_CITY_URL || '',
        );

        return response.data.data;
    } catch (error) {
        console.log('error', error)
    }
};

export { getCityRequest };
