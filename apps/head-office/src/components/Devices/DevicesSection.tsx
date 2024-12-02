import { Menu } from 'primereact/menu';
import React, { useState } from 'react';
import {
  useGetConnectorsQuery,
  useGetDeviceBrandsQuery,
  useGetDeviceModelsQuery,
} from '../../../app/api/services/devices/devices.service';
import { BRAND_PREFIX } from '../../constants/constants';
import './devices.css';
import ListHeader from './ListHeader';
import ListItem from './ListItem';
import { IConnectorStateProps, IDeviceBrandDataProps, IDeviceResponsesProps, IHeaderProps } from './types';

const DevicesSection: React.FC = () => {
  const listTypes: string[] = ['brand', 'model', 'connector'];
  const [brandId, setBrandId] = useState<number>(3);
  const [connectorId, setConnectorId] = useState<number>(3);
  const [modelId, setModelId] = useState<number>(3);
  const { data: deviceModels = [] } = useGetDeviceModelsQuery<IDeviceResponsesProps>(brandId);
  const { data: deviceConnectors = [] } = useGetConnectorsQuery<IDeviceResponsesProps>(modelId);
  const { data: deviceBrands = [] } = useGetDeviceBrandsQuery<IDeviceResponsesProps>(null);

  const createMenuItems = (
    items: IDeviceBrandDataProps[] | IHeaderProps[] | IConnectorStateProps[],
    type: string,
  ) => {
    const headerName = getHeaderName(type) || '';

    if (items) {
      const listItems = [{ id: 0, name: headerName, imageCdnUrl: '' }, ...items];

      return listItems.map((item) => ({
        template:
          item.id === 0 ? (
            // @ts-ignore
            <ListHeader brandId={brandId} modelId={modelId} name={item.name || ''} type={type} />
          ) : (
            <ListItem
              item={item}
              type={type}
              onClick={
                type === 'brand'
                  ? () => setBrandId(item.id)
                  : type === 'model'
                  ? () => setModelId(item.id)
                  : () => setConnectorId(item.id)
              }
            />
          ),
      }));
    }
  };
  const getHeaderName = (type: string) => {
    if (type === 'brand') {
      return 'Marka';
    } else if (type === 'model') {
      return 'Model';
    } else if (type === 'connector') {
      return 'Konnektör';
    }
  };
  const setMenuItems = (type: string) => {
    if (type === 'brand') {
      return createMenuItems(deviceBrands, 'brand');
    } else if (type === 'model') {
      return createMenuItems(deviceModels, 'model');
    } else if (type === 'connector') {
      return createMenuItems(deviceConnectors, 'connector');
    }
  };

  return (
    <div
      className={`${BRAND_PREFIX}-device-management-container h-full w-full flex justify-between items-center flex-col`}
    >
      <div className={`${BRAND_PREFIX}-device-management-listing-container w-full h-full flex items-start`}>
        {listTypes.map((type) => (
          <div
            key={type}
            className={`${BRAND_PREFIX}-device-management-${type}-listing-container w-full h-full flex justify-between items-start border border-gray-300`}
          >
            <Menu className="w-full h-full flex flex-col justify-start items-start" model={setMenuItems(type)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicesSection;
