import axios from 'axios';

const getChargeUnitDeviceCode = async (slug: string) => {
    try {
        const deviceCode = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/Values/GetDeviceCode` || '',
                JSON.stringify({ "stationID": Number(slug) }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );

        return deviceCode.data;
    } catch (error) {
        console.log(error);
    };
};

export { getChargeUnitDeviceCode };
