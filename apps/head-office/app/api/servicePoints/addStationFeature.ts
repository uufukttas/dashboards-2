import axios from "axios";

const addStationFeatureRequest = async (data: string) => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_ADD_STATION_FEATURE || '',
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        return response.data.data;
    } catch (error) {
        console.log('error', error)
    }
};

export { addStationFeatureRequest };