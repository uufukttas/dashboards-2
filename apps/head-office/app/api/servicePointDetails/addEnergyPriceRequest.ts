import axios from "axios";

const addEnergyPriceRequest = async (data: string) => {
    try {
        const response = axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/ServicePoint/AddEnergyPrice` || '',
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                },
            )

        return response;
    } catch (error) {
        console.error(error);
    }
};

export { addEnergyPriceRequest };
