import axios from 'axios';

const getMapLocationsRequest = async () => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_MAP_URL}/api/App/stations` || '',
            { headers: { 'Content-Type': 'application/json' } }
        );

        console.log('response', response)
        return response;
    } catch (error) {
        return [];
    }
};

export { getMapLocationsRequest };
