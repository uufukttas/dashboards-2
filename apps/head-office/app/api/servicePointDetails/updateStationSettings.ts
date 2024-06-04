import axios from "axios";

const updateStationSettings = async (data: string, token: string) => {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_UPDATE_STATION_SETTINGS || '',
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        return response;
    } catch (error) {
        console.error(error);
    };
};

export { updateStationSettings };
