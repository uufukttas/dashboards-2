import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ConnectorInfo: React.FC<{ connectorId: number }> = ({ connectorId }: { connectorId: number; }) => {
    const [displayName, setDisplayName] = useState('');

    const getConnectorInfo = async () => {
        try {
            const response = await axios.post(
                process.env.GET_CONNECTOR_INFO || '',
                ([connectorId]),
                { headers: { 'Content-Type': 'application/json' } }
            );
            return setDisplayName(response.data.data[0].displayName);
        } catch (error) {
            console.error('Failed to fetch connector info:', error);
            return '';
        }
    };

    useEffect(() => {
        getConnectorInfo();
    }, []);

    return (
        <>
            {
                displayName || '- KW - '
            }
        </>
    )
}

export default ConnectorInfo;
