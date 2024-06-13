import axios from 'axios';

const getAllTariffsRequest = async (currentPage: number) => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/Tariff/GetTariffs`,
                { pageNumber: currentPage, userCount: 10 },
                { headers: { 'Content-Type': 'application/json' } }
            );

        return response.data;
    } catch (error) {
        return error;
    };
};

export { getAllTariffsRequest };
