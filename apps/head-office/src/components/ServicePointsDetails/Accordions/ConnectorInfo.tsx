import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/redux/store';

const ConnectorInfo: React.FC<{ connectorId: number }> = ({ connectorId }: { connectorId: number; }) => {
    const [displayName, setDisplayName] = useState('');
    const isConnectorUpdated = useSelector((state: RootState) => state.isConnectorUpdated.isConnectorUpdated);

    const getConnectorInfo = async () => {
        try {
            const response = await axios.post(
                process.env.GET_CONNECTOR_INFO || '',
                ([{connectorId: connectorId}]),
                { headers: { 'Content-Type': 'application/json' } }
            );

            return setDisplayName(response.data.data[0]?.displayName);
        } catch (error) {
            console.error('Failed to fetch connector info:', error);
            return '';
        }
    };

    useEffect(() => {
        getConnectorInfo();
    }, []);

    useEffect(() => {
        getConnectorInfo();
    }, [isConnectorUpdated]);

    return (
        <>
            {
                displayName || '- KW - '
            }
        </>
    )
}

export default ConnectorInfo;
