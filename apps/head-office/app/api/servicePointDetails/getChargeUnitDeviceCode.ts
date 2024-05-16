import axios from 'axios';

const getChargeUnitDeviceCode = async (slug: string) => {
    try {
        const deviceCode = await axios
            .post(
                process.env.GET_DEVICE_CODE || '',
                JSON.stringify({ "stationID": Number(slug) }),
                { headers: { 'Content-Type': 'application/json' } }
            );

        return deviceCode.data;
    } catch (error) {
        console.log(error);
    };
};

export { getChargeUnitDeviceCode };
