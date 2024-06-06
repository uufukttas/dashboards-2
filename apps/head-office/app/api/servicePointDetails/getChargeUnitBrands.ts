import axios from "axios";

const getChargeUnitBrands = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/Values/GetModels` || "")
      .then((response) => response.data);

    return response;
  } catch (error) {
    console.log(error);
  };
};

export { getChargeUnitBrands };
