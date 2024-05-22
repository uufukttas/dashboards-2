import axios from "axios";

const getChargePointFeatures = async () => {
  try {
    const response = await axios.get(process.env.GET_CHARGE_POINT_FEATURES || "");

    return response.data;
  } catch (error) {
    console.error("Error getting charge point features", error);
  }
};

export { getChargePointFeatures };
