import axios from 'axios';

const getConnectorModels = async (selectedBrandId: string) => {
    try {
        const response = await axios
            .post(
                process.env.GET_CONNECTOR_MODELS || '',
                { brandId: selectedBrandId },
                { headers: { 'Content-Type': 'application/json' } }
            )
            .then(response => response.data);

        return response;
    } catch (error) {
        console.log(error);
    };
};

export { getConnectorModels };
