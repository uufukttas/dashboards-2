import React from 'react';
import AddBrandModal from './DeviceModals/AddBrandModal';
import AddConnectorModal from './DeviceModals/AddConnectorModal';
import AddModelModal from './DeviceModals/AddModelModal';
import { BRAND_PREFIX } from '../../constants/constants';
import useModalManager from '../../hooks/useModalManager';

const ListHeader: React.FC<{ brandId: number; modelId: number; name: string; type: string }> = ({
  brandId,
  modelId,
  name,
  type,
}) => {
  const { openModal } = useModalManager();

  const handleOpenDevicModals = (): void => {
    if (type === 'brand') {
      openModal('deviceBrandModal', <AddBrandModal brandId={0} />);
    } else if (type === 'model') {
      openModal('deviceModelModal', <AddModelModal brandId={brandId} modelId={0} />);
    } else if (type === 'connector') {
      openModal(
        'deviceConnectorModal',
        <AddConnectorModal brandId={brandId} connectorId={0} connectorTypeId={1} isAc={false} modelId={modelId} />,
      );
    }
  };

  return (
    <button
      className={`${BRAND_PREFIX}-device-management-menu-item-container w-full h-full flex justify-between items-center min-h-[50px] px-4 cursor-pointer bg-primary text-white`}
      onClick={handleOpenDevicModals}
    >
      <span className="px-8">{name}</span>
      <i className="pi pi-plus" />
    </button>
  );
};

export default ListHeader;
