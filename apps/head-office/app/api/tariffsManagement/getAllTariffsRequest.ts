import axios from 'axios';

const getAllTariffsRequest = async (stationId: number | null) => {
    try {
        const response = await axios
            .post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/Tariff/GetTariffs`,
                { StationId: stationId },
                { headers: { 'Content-Type': 'application/json' } }
            );

        return response.data;
    } catch (error) {
        return error;
    };
};

export { getAllTariffsRequest };
