import axios from "axios";

const getChargePointConnetors = async (chargePointId: number) => {
    try {
        const response = await axios.post(
            process.env.GET_CHARGE_POINT_CONNECTORSV2 || '',
            JSON.stringify({ stationChargePointId: chargePointId }),
            { headers: { 'Content-Type': 'application/json' } }
        );

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { getChargePointConnetors };
