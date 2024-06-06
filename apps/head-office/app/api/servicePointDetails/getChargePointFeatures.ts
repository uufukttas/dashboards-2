import axios from "axios";

const getChargePointFeatures = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Values/GetChargePointFeatures` || "");

    return response.data;
  } catch (error) {
    console.error("Error getting charge point features", error);
  }
};

export { getChargePointFeatures };
