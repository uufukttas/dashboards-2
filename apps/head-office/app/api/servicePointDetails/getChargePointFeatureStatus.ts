import axios from 'axios';

const getChargePointFeatureStatus = async () => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_GET_CHARGE_POINT_FEATURES || '');

        return response.data;
    } catch (error) {
        console.error('Error getting charge point features', error);
    }
};

export { getChargePointFeatureStatus };
