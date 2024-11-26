import Image from 'next/image';
import React from 'react';
import { IDeviceBrandDataProps } from '../../../app/api/services/devices/devices.interface';
import { BRAND_PREFIX } from '../../constants/constants';

const ListItem: React.FC<{
  item: IDeviceBrandDataProps;
  type: 'brand' | 'model' | 'connector';
  onClick: (id: number) => void;
}> = ({ item, type, onClick }) => {
  const getImageUrl = (url: string | null) =>
    url
      ? `${url}?h=100&w=100&scale=both&mode=max`
      : `https://bo-test.sharz.net/cdn/img/device-brands/circontrol_logo.png?h=100&w=100&scale=both&mode=max`;

  return (
    <div
      className={`${BRAND_PREFIX}-device-management-menu-item-container w-full h-full flex justify-between items-center min-h-[50px] px-4 hover:bg-gray-300`}
    >
      <div
        className={`${BRAND_PREFIX}-device-management-menu-info-container w-full flex items-center justify-between px-8`}
        data-item-id={item.id}
        onClick={() => onClick(item.id)}
      >
        <div className={`menu-item-${type}-name`}>{type === 'connector' ? item.displayName : item.name}</div>
        {type !== 'connector' && (
          <div className={`menu-item-${type}-logo`}>
            <Image alt={item.name} src={getImageUrl(item.imageCdnUrl)} />
          </div>
        )}
      </div>
      <div className={`${BRAND_PREFIX}-device-management-menu-item-action-container`}>
        <i className="pi pi-pencil" />
      </div>
    </div>
  );
};

export default ListItem;
