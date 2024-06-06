import axios from "axios";

const addStationFeatureRequest = async (data: string) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/StationFeature/AddStationFeature` || '',
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