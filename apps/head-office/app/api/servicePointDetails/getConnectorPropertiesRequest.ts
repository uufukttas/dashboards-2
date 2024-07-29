import axios from "axios";

const getConnectorPropertiesRequest = async (stationChargePointId: number) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/StationInfo/GetChargePointConnectors` || '',
            JSON.stringify({ stationChargePointId }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error(error);
    };
};

export { getConnectorPropertiesRequest };
