import axios from "axios";

const getPermissionRequest = async (stationId: number) => {
    try {
        const response = await axios.post(
            process.env.GET_PERMISSIONS_URL || '',
            { stationId },
            { headers: { 'Content-Type': 'application/json' } }
        )
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export { getPermissionRequest };
