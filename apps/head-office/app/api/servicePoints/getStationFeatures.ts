import axios from "axios";

const getStationFeaturesRequest = async (stationId: number) => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_GET_STATION_FEATURES || '',
            { stationId: stationId },
            { headers: { 'Content-Type': 'application/json' } },
        );

        return response.data.data;
    } catch (error) {
        console.log('error', error)
    }
};

export { getStationFeaturesRequest };
