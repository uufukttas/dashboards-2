import { Menu } from 'primereact/menu';
import React, { useState } from 'react';
import { IDeviceBrandDataProps, IDeviceResponsesProps } from '../../../app/api/services/devices/devices.interface';
import {
  useGetConnectorInfoMutation,
  useGetDeviceBrandsQuery,
  useGetDeviceModelsQuery,
} from '../../../app/api/services/devices/devices.service';
import { BRAND_PREFIX } from '../../constants/constants';
import './devices.css';
import ListHeader from './ListHeader';
import ListItem from './ListItem';

const DevicesSection: React.FC = () => {
  const [brandId, setBrandId] = useState<number>(3);
  const [modelId, setModelId] = useState<number>(1);
  const [connectors, setConnectors] = useState<IDeviceBrandDataProps[]>([]);
  const { data: brandModels } = useGetDeviceModelsQuery<IDeviceResponsesProps>(brandId);
  const { data: deviceBrandsInfo } = useGetDeviceBrandsQuery<IDeviceResponsesProps>(null);
  const [getConnectorInfo] = useGetConnectorInfoMutation<IDeviceResponsesProps>({});

  const handleModelClick = async (id: number) => {
    setModelId(id);
    try {
      const response = await getConnectorInfo({ body: { brandId: id } }).unwrap();
      // @ts-ignore
      setConnectors(response);
    } catch (error) {
      console.error('Failed to fetch connector info:', error);
    }
  };

  const createMenuItems = (items: IDeviceBrandDataProps[] = [], type: 'brand' | 'model' | 'connector') => {
    const headerName = type === 'brand' ? 'Marka' : type === 'model' ? 'Model' : 'Konnektör';
    const listItems = [{ id: 0, name: headerName, imageCdnUrl: '' }, ...items];

    return listItems.map((item) => ({
      template:
        item.id === 0 ? (
          <ListHeader name={item.name || ''} onClick={() => {}} />
        ) : (
          <ListItem
            item={item}
            type={type}
            onClick={type === 'brand' ? setBrandId : type === 'model' ? handleModelClick : () => {}}
          />
        ),
    }));
  };

  return (
    <div
      className={`${BRAND_PREFIX}-device-management-container h-full w-full flex justify-between items-center flex-col`}
    >
      <div className={`${BRAND_PREFIX}-device-management-listing-container w-full h-full flex items-start`}>
        {['brand', 'model', 'connector'].map((type) => (
          <div
            key={type}
            className={`${BRAND_PREFIX}-device-management-${type}-listing-container w-full h-full flex justify-between items-start border border-gray-300`}
          >
            <Menu
              className="w-full h-full flex flex-col justify-start items-start"
              model={
                createMenuItems(
                  type === 'brand'
                  ? deviceBrandsInfo
                  : type === 'model'
                    ? brandModels
                    : connectors,
                  type as 'brand' | 'model' | 'connector',
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevicesSection;
