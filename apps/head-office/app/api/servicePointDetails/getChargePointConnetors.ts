import axios from "axios";

const getChargePointConnetors = async (chargePointId: number) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/StationInfo/GetChargePointConnectorsV2` || '',
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
