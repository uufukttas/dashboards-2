import { Button } from '@projects/button';
import { useGetConnectorsQuery } from '../../../../app/api/services/devices/devices.service';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import BaseSelect from '../../Base/BaseSelect';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import { IConnectorAddModalProps } from '../types';

const ConnectorAddModal: React.FC<{ modelId: number }> = ({ modelId }) => {
  const sectionPrefix = 'connector';
  const [connectorValue, setConnectorValue] = useState<number>(1);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { data: connectors = [] } = useGetConnectorsQuery(modelId);
  const form = useForm();

  const handleSubmit = async (event: React.FormEvent) => {
    setIsDisabled(true);
    dispatch(setAddConnector(false));
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

  const setDropdownItems = (connectorList: IConnectorAddModalProps[]) => {
    const items = connectorList?.map((item: IConnectorAddModalProps) => {
      return {
        id: item.id,
        name: `${item.stationChargePointModelName} - ${item.stationChargePointConnectorTypeName} - ${
          item.ac ? 'AC' : 'DC'
        } - ${item.kwh}KW`,
      };
    });

    return items;
  };

  return (
    <ModalLayout
      className={`${BRAND_PREFIX}-${sectionPrefix}-modal-form-container relative p-6 bg-white rounded-lg`}
      name="connectorAddModal"
      title="Konnektör Ekle"
    >
      <div className={`${BRAND_PREFIX}-${sectionPrefix}-modal-form-container relative p-6 bg-white rounded-lg`}>
        <form className={`${BRAND_PREFIX}-add-${sectionPrefix}-form w-full`} onSubmit={handleSubmit}>
          <div className={`${BRAND_PREFIX}-connector-type-container`}>
            <BaseSelect
              form={form}
              className="w-full"
              id="connectorType"
              label="Konnektör Tipi"
              name="connectorType"
              items={setDropdownItems(connectors)}
              defaultValue={connectors && connectors[0]}
              onChange={(e) => setConnectorValue(parseInt(e.target.value))}
            ></BaseSelect>
            <Button
              buttonText="Kaydet"
              className={`connector-type-add-button bg-primary text-white w-full py-2.5 rounded-lg`}
              disabled={isDisabled}
              id="addConnectorButton"
              type="submit"
            />
          </div>
        </form>
      </div>
    </ModalLayout>
  );
};

export default ConnectorAddModal;
