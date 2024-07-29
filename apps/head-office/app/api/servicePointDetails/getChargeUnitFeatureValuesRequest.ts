import axios from 'axios';

const getChargeUnitFeatureValuesRequest = async (chargePointId: string) => {
    try {
        const featureValues = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/StationFeature/GetChargePointFeature` || '',
                { "StationChargePointID": Number(chargePointId) },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );

        return featureValues.data;
    } catch (error) {
        console.log(error);
    };
};

export { getChargeUnitFeatureValuesRequest };
