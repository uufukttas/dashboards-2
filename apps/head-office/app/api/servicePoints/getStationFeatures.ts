import axios from "axios";

const getStationFeaturesRequest = async (stationId: number) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/StationFeature/GetStationFeature` || '',
            { stationId: stationId },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            },
        );

        return response.data.data;
    } catch (error) {
        console.log('error', error)
    }
};

export { getStationFeaturesRequest };
