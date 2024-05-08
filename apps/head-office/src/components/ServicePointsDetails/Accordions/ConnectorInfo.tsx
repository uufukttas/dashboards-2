import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ConnectorInfo = (id: number) => {
    const [displayName, setDisplayName] = useState('');

    const getConnectorInfo = async () => {
        try {
            const response = await axios.post(
                process.env.GET_CONNECTOR_INFO || '',
                ([id]),
                { headers: { 'Content-Type': 'application/json' } }
            );
            return setDisplayName(response.data.data[0].displayName); // Make sure the response structure is correct
        } catch (error) {
            console.error('Failed to fetch connector info:', error);
            return ''; // Return an empty string or handle differently
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
