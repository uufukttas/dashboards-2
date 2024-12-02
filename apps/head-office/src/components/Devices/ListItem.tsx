import React from 'react';
import Image from 'next/image';
import { Button } from '@projects/button';
import AddBrandModal from './DeviceModals/AddBrandModal';
import AddConnectorModal from './DeviceModals/AddConnectorModal';
import AddModelModal from './DeviceModals/AddModelModal';
import ConfirmationModal from '../Modals/ConfirmationModal';
import { BRAND_PREFIX } from '../../constants/constants';
import useModalManager from '../../hooks/useModalManager';
import {
  useDeleteDeviceBrandMutation,
  useDeleteDeviceConnectorMutation,
  useDeleteDeviceModelMutation,
} from '../../../app/api/services/devices/devices.service';

import { IConnectorStateProps, IDeviceBrandDataProps, IDeviceModelDataProps } from './types';

const ListItem: React.FC<{
  item: IConnectorStateProps | IDeviceBrandDataProps | IDeviceModelDataProps;
  type: string;
  onClick: (id: number) => void;
}> = ({ item, type, onClick }) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-device-management-menu`;
  const [deleteDeviceBrand] = useDeleteDeviceBrandMutation();
  const [deleteDeviceModel] = useDeleteDeviceModelMutation();
  const [deleteDeviceConnector] = useDeleteDeviceConnectorMutation();
  const { openModal } = useModalManager();

  const handleOpenDeviceModals = (item: IConnectorStateProps | IDeviceBrandDataProps | IDeviceModelDataProps) => {
    if (type === 'brand') {
      openModal('deviceBrandModal', <AddBrandModal brandId={item.id} />);
    } else if (type === 'model') {
      // @ts-ignore
      openModal('deviceModelModal', <AddModelModal brandId={item.brandId} modelId={item.id} />);
    } else if (type === 'connector') {
      openModal(
        'deviceConnectorModal',
        <AddConnectorModal
          // @ts-ignore
          brandId={item?.stationChargePointBrandID}
          connectorId={item.id}
          // @ts-ignore
          connectorTypeId={item?.stationChargePointConnectorTypeID}
          // @ts-ignore
          isAc={item?.ac}
          //  @ts-ignore
          modelId={item?.stationChargePointModelID}
        />,
      );
    }
  };
  const handleDeleteDeviceItems = (id: number): void => {
    if (type === 'brand') {
      openModal(
        'confirmation-modal',
        // @ts-ignore
        <ConfirmationModal name="confirmation-modal" onConfirm={() => deleteDeviceBrand(id)} />,
      );
    } else if (type === 'model') {
      openModal(
        'confirmation-modal',
        // @ts-ignore
        <ConfirmationModal name="confirmation-modal" onConfirm={() => deleteDeviceModel(id)} />,
      );
    } else if (type === 'connector') {
      openModal(
        'confirmation-modal',
        // @ts-ignore
        <ConfirmationModal name="confirmation-modal" onConfirm={() => deleteDeviceConnector(id)} />,
      );
    }
  };

  return (
    <div
      className={`${sectionPrefix}-item-container w-full h-full flex justify-between items-center min-h-[50px] px-4 hover:bg-gray-300`}
    >
      <div
        className={`${sectionPrefix}-info-container w-full flex items-center justify-between px-8`}
        data-item-id={item.id}
        onClick={() => {
          onClick(item.id);
        }}
      >
        <div className={`menu-item-${type}-name`}>
          {type === 'connector'
            ? // @ts-ignore
              `${item.stationChargePointModelName} - ${item.stationChargePointConnectorTypeName} - ${
                // @ts-ignore
                item.ac ? 'AC' : 'DC'
                // @ts-ignore
              } - ${item.kwh}KW`
            : // @ts-ignore
              item.name}
        </div>
        {
          // @ts-ignore
          type !== 'connector' && item.imageCdnUrl && (
            <div className={`menu-item-${type}-logo`}>
              <Image
                // @ts-ignore
                alt={item.name || ''}
                height={100}
                // @ts-ignore
                src={`${item.imageCdnUrl}?h=100&w=100&scale=both&mode=max`}
                width={100}
              />
            </div>
          )
        }
      </div>
      <Button
        className={`${sectionPrefix}-item-action-container mx-2`}
        id={`${BRAND_PREFIX}-device-update-modal-button`}
        type="button"
        onClick={() => handleOpenDeviceModals(item)}
      >
        <i className="pi pi-pencil" />
      </Button>
      <Button
        className={`${sectionPrefix}-item-action-container mx-2`}
        id={`${BRAND_PREFIX}-device-update-modal-button`}
        type="button"
        onClick={() => handleDeleteDeviceItems(item.id)}
      >
        <i className="pi pi-trash" />
      </Button>
    </div>
  );
};

export default ListItem;
