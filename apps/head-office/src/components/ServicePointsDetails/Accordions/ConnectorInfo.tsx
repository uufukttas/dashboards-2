import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getConnectorInfo } from '../../../../app/api/servicePointDetails';
import { RootState } from '../../../../app/redux/store';
import { IConnectorInfoProps } from '../types';

const ConnectorInfo: React.FC<IConnectorInfoProps> = (props: IConnectorInfoProps) => {
    const [displayName, setDisplayName] = useState('');
    const isConnectorUpdated = useSelector((state: RootState) => state.isConnectorUpdated.isConnectorUpdated);

    const changeConnectorName = async (): Promise<void> => {
        const connectorInfo = await getConnectorInfo(props.connectorId);

        setDisplayName(connectorInfo);
    };

    useEffect(() => {
        changeConnectorName();
    }, []);

    useEffect(() => {
        changeConnectorName();
    }, [isConnectorUpdated]);

    return (
        <>
            {displayName || '-'}
        </>
    );
};

export default ConnectorInfo;
