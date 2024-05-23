import axios from "axios";

const getConnectorPropertiesRequest = async (stationChargePointId: number) => {
    try {
        const response = await axios.post(
            process.env.GET_CHARGE_POINT_CONNECTORS || '',
            JSON.stringify({ stationChargePointId }),
            { headers: { 'Content-Type': 'application/json' } }
        );

        return response.data;
    } catch (error) {
        console.error(error);
    };
};

export { getConnectorPropertiesRequest };
