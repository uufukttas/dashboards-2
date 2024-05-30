import axios from 'axios';

const getConnectorInfo = async (connectorId: number): Promise<string> => {
    try {
        const response = await axios.post(
            process.env.GET_CONNECTOR_INFO || '',
            ([{ connectorId: connectorId }]),
            { headers: { 'Content-Type': 'application/json' } }
        );

        return response.data.data[0]?.displayName;
    } catch (error) {
        console.error('Failed to fetch connector info:', error);
        return '';
    }
};

export { getConnectorInfo };
