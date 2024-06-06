import axios from "axios";

const getPermissionRequest = async (stationId: number) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/auth/ChargePointUsers` || '',
            { stationId },
            { headers: { 'Content-Type': 'application/json' } }
        )
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export { getPermissionRequest };
