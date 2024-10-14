import axios from 'axios';

const getMapStationsList = async () => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_MAP_URL}/api/App/stations`
        );

        if (response.data.success) {
            return response.data;
        } else {
            return { description: 'No data found', result: [], success: false };
        }
    } catch (error) {
        console.error('Error fetching map stations:', error);
        return { description: 'Error fetching data', result: [], success: false };
    }
};

export { getMapStationsList };
