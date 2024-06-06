import axios from "axios";

const addStationSettingsRequest = async (data: string, token: string) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/ServicePoint/AddStationSettings` || '',
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

export { addStationSettingsRequest };
