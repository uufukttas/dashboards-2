import axios from 'axios';

const getConnectorInfo = async (connectorId: number): Promise<string> => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/ServicePoint/StationConnectorInfo` || '',
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
