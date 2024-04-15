import React, { useEffect, useState } from 'react';
import { Dropdown } from '@projects/dropdown';
import { Label } from '@projects/label';
import axios from 'axios';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import type { IConnectorAddModalProps } from '../types';
import { Button } from '@projects/button';

const ConnectorAddModal = ({ connectorBrandId }: IConnectorAddModalProps) => {
    const sectionPrefix = 'connector';
    const [dropdownItems, setDropdownItems] = useState<{ id: 0, name: 'Please Select', rid: null }[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAndPrepareDropdownItems = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                process.env.GET_CONNECTOR_MODELS || '',
                { "brandId": connectorBrandId || 1 }
            );
            const connectorTypes = response.data.data;

            const items = connectorTypes.map((item: { stationChargePointModelConnectorId: number; displayName: string; }) => ({
                id: item.stationChargePointModelConnectorId,
                name: item.displayName,
                rid: null,
            }));

            setDropdownItems([{ id: 0, name: 'Please Select', rid: null }, ...items]);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAndPrepareDropdownItems();
    }, [connectorBrandId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`${BRAND_PREFIX}-${sectionPrefix}-modal-form-container relative p-6 bg-white rounded-lg`}>
            <form
                className={`${BRAND_PREFIX}-add-${sectionPrefix}-form w-full`}
                onSubmit={() => { }}
            >
                <div className={`-container`}>
                    <Label
                        className={`-label block mb-2 text-heading font-semibold`}
                        htmlFor={``}
                        labelText={`Şarj Ünitesi Markası`}
                    >
                        <span className="text-md text-error">*</span>
                    </Label>
                    <Dropdown
                        className={`-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
                        id={``}
                        items={dropdownItems}
                        name={``}
                        onChange={(event) => { }}
                        value={``}
                    />
                    <Button
                        buttonText='Kaydet'
                        id='addConnectorButton'
                        type='button'
                        className={`-button bg-primary text-white w-full py-2.5 rounded-lg`}
                        onClick={() => { }}
                    />
                </div>
            </form>
        </div>
    );
};

export default ConnectorAddModal;
