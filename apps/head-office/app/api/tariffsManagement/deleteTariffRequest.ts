import axios from "axios";

const deleteTariffRequest = async (deletedTariffId: number) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/Tariff/DeleteTariff`,
            { tariffId: deletedTariffId },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export { deleteTariffRequest };
