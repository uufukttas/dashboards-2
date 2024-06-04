import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Label } from '@projects/label';
import { getConnectorModels, updateConnectorRequest } from '../../../../app/api/servicePointDetails';
import { toggleConnectorUpdated } from '../../../../app/redux/features/isConnectorUpdated';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { setAddConnector } from '../../../../app/redux/features/setVisibleModal';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { RootState } from '../../../../app/redux/store';

const ConnectorAddModal: React.FC = () => {
    const sectionPrefix = 'connector';
    const dispatch = useDispatch();
    const connectorProperty = useSelector((state: RootState) => state.setConnectorProperty.connectorProperty);
    const [dropdownItems, setDropdownItems] = useState<{ id: 0, name: 'Please Select', rid: null }[]>([]);
    const [connectorValue, setConnectorValue] = useState<number>(1);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const fetchAndPrepareDropdownItems = async () => {
        try {
            const response = await getConnectorModels(connectorProperty.chargePointModelId || 1);
            const connectorTypes = response.data.data;

            const items = connectorTypes.map((item: { stationChargePointModelConnectorId: number; displayName: string; }) => ({
                id: item.stationChargePointModelConnectorId,
                name: item.displayName,
                rid: null,
            }));

            setDropdownItems(items);
            setConnectorValue(items[0].id);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSubmit = async (event: React.FormEvent) => {
        setIsDisabled(true);
        dispatch(setAddConnector(false))
        event.preventDefault();
        const response = await updateConnectorRequest({
            id: connectorProperty.connectorId,
            connectorNr: connectorProperty.connectorNumber,
            stationChargePointID: connectorProperty.chargePointId,
            stationChargePointModelConnectorID: connectorValue,
        });
        dispatch(toggleModalVisibility(false));
        dispatch(toggleConnectorUpdated(true));
    };

    useEffect(() => {
        fetchAndPrepareDropdownItems();
    }, [connectorProperty.chargePointModelId]);

    return (
        <div className={`${BRAND_PREFIX}-${sectionPrefix}-modal-form-container relative p-6 bg-white rounded-lg`}>
            <form
                className={`${BRAND_PREFIX}-add-${sectionPrefix}-form w-full`}
                onSubmit={handleSubmit}
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
                        value={connectorValue.toString()}
                    />
                    <Button
                        buttonText='Kaydet'
                        className={`connector-type-add-button bg-primary text-white w-full py-2.5 rounded-lg`}
                        disabled={isDisabled}
                        id='addConnectorButton'
                        type='submit'
                    />
                </div>
            </form>
        </div>
    );
};

export default ConnectorAddModal;
