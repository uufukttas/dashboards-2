import axios from "axios";

const getDistrictsRequest = async (plateNumber: number) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/Values/GetDistricts` || '',
            { 'plateNumber': plateNumber },
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
        );

        return response.data.data;
    } catch (error) {
        console.log('error', error)
    }
};

export { getDistrictsRequest };
