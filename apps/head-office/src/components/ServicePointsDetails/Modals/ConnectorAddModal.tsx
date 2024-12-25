import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@projects/button';
import { useUpdateConnectorSettingsMutation } from '../../../../app/api/services/service-point-details/servicePointDetails.service';
import BaseSelect from '../../Base/BaseSelect';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import { useGetConnectorsQuery } from '../../../../app/api/services/devices/devices.service';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { IConnectorAddModalProps, IConnectorPropertyProps } from '../types';
import EventManager from 'apps/head-office/src/managers/Event.manager';
import useModalManager from 'apps/head-office/src/hooks/useModalManager';

const ConnectorAddModal: React.FC<IConnectorPropertyProps> = ({ chargePointId, connectorId, connectorNumber, modelId }) => {
  const sectionPrefix = 'connector';
  const { data: connectors } = useGetConnectorsQuery(modelId);
  const [connectorProperty, setConnectorProperty] = useState({
    connectorId: (connectors && connectors[0]?.id) || 0,
    connectorNumber: connectorNumber,
    chargePointId: chargePointId,
    connectorValue: 0,
  });
  const [updateConnectorSettings] = useUpdateConnectorSettingsMutation();
  const form = useForm();
  const { closeModal } = useModalManager();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await updateConnectorSettings({
      body: {
        id: connectorId,
        connectorNr: connectorProperty.connectorNumber,
        stationChargePointID: connectorProperty.chargePointId,
        stationChargePointModelConnectorID: connectorProperty.connectorValue,
      },
    });

    EventManager.emit('connector-updated', {});
    closeModal('addConnectorModal');
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

    return items || [];
  };

  useEffect(() => {
    if (connectorProperty.connectorValue === 0) {
      setConnectorProperty({ ...connectorProperty, connectorValue: connectors?.[0]?.id || 0 });
    }
  }, [connectors]);

  return (
    connectors && (
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
                defaultValue={connectors[0]?.id}
                optionClassName='w-full'
                optionLabel='name'
                optionValue='id'
                onChange={(e) => setConnectorProperty({ ...connectorProperty, connectorValue: Number(e.target.value) })}
              ></BaseSelect>
              <Button
                buttonText="Kaydet"
                className={`connector-type-add-button bg-primary text-white w-full py-2.5 rounded-lg`}
                id="addConnectorButton"
                type="submit"
              />
            </div>
          </form>
        </div>
      </ModalLayout>
    )
  );
};

export default ConnectorAddModal;
