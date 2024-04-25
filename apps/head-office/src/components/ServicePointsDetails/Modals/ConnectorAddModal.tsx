import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Label } from '@projects/label';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import type { IConnectorAddModalProps } from '../types';

const ConnectorAddModal: React.FC<IConnectorAddModalProps> = ({ connectorProperty }: IConnectorAddModalProps) => {
    const sectionPrefix = 'connector';
    const dispatch = useDispatch();
    const [dropdownItems, setDropdownItems] = useState<{ id: 0, name: 'Please Select', rid: null }[]>([]);
    const [connectorValue, setConnectorValue] = useState<number>(1);

    const fetchAndPrepareDropdownItems = async () => {
        try {
            const response = await axios
                .post(
                    process.env.GET_CONNECTOR_MODELS || '',
                    { "brandId": connectorProperty.chargePointModelId || 1 }
                );
            const connectorTypes = response.data.data;

            const items = connectorTypes.map((item: { stationChargePointModelConnectorId: number; displayName: string; }) => ({
                id: item.stationChargePointModelConnectorId,
                name: item.displayName,
                rid: null,
            }));

            setDropdownItems([...items]);
        } catch (error) {
            console.error(error);
        }
    };
    const setConenctorProperty = async (event: React.FormEvent) => {
        event.preventDefault();
        await axios
            .post(
                process.env.UPDATE_CONNECTOR_URL || '',
                {
                    id: connectorProperty.chargePointId,
                    connectorNr: connectorProperty.connectorNumber,
                    stationChargePointID: connectorProperty.connectorId,
                    stationChargePointModelConnectorID: connectorValue,
                }
            )
        dispatch(toggleModalVisibility());
    };

    useEffect(() => {
        fetchAndPrepareDropdownItems();
    }, [connectorProperty.chargePointModelId]);

    return (
        <div className={`${BRAND_PREFIX}-${sectionPrefix}-modal-form-container relative p-6 bg-white rounded-lg`}>
            <form
                className={`${BRAND_PREFIX}-add-${sectionPrefix}-form w-full`}
                onSubmit={setConenctorProperty}
            >
                <div className={`${BRAND_PREFIX}-connector-type-container`}>
                    <Label
                        className={`connector-type-label block mb-2 text-heading font-semibold`}
                        htmlFor={`connector-type-dropdown`}
                        labelText={`Konnektör Tipi`}
                    >
                        <span className="text-md text-error">*</span>
                    </Label>
                    <Dropdown
                        className={`connector-type-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
                        id={`connector-type-dropdown`}
                        items={dropdownItems}
                        name={`connector-type-dropdown`}
                        onChange={(event) => setConnectorValue(Number(event.currentTarget.value))}
                        value={``}
                    />
                    <Button
                        buttonText='Kaydet'
                        id='addConnectorButton'
                        type='submit'
                        className={`connector-type-add-button bg-primary text-white w-full py-2.5 rounded-lg`}
                    />
                </div>
            </form>
        </div>
    );
};

export default ConnectorAddModal;
