import axios from 'axios';

const getAllTariffsRequest = async (name: string, currentPage: number) => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/Tariff/GetTariffs`,
                { pageNumber: currentPage, userCount: 10, name: name },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }
            );

        return response.data;
    } catch (error) {
        return error;
    };
};

export { getAllTariffsRequest };
