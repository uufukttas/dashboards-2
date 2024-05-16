import axios from 'axios';

const getChargeUnitFeatureValuesRequest = async (chargePointId: string) => {
    try {
        const featureValues = await axios
            .post(
                process.env.GET_CHARGE_POINT_STATION_FEATURE || '',
                { "StationChargePointID": Number(chargePointId) },
                { headers: { 'Content-Type': 'application/json' } }
            );

        return featureValues.data;
    } catch (error) {
        console.log(error);
    };
};

export { getChargeUnitFeatureValuesRequest };
