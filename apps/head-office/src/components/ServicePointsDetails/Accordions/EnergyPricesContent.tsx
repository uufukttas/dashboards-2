import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { IServiceDetailsContentProps } from '../types';

const EnergyPricesContent = ({ slug }: IServiceDetailsContentProps) => {
  const sectionPrefix = 'service-point-details';
  const [energyPriceDetails, setEnergyPriceDetails] = useState<{ id: number; stationId: number; price: number; startData: string; isActive: boolean; isDeleted: boolean }[]>([]);

  const getEnergyPriceDetails = async (slug: string) => {
    axios
      .post(
        'https://sharztestapi.azurewebsites.net/ServicePoint/GetEnergyPrice',
        JSON.stringify({ stationId: Number(slug) }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => response.data)
      .then((data) => setEnergyPriceDetails(data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (energyPriceDetails.length === 0)
      getEnergyPriceDetails(slug);
  }, [energyPriceDetails]);

  return (
    energyPriceDetails && energyPriceDetails.map((energyPriceDetail: { id: number; stationId: number; price: number; startData: string; isActive: boolean; isDeleted: boolean }, idx: number) => {
      return (
        <div key={idx} className={`${sectionPrefix}-content py-8 text-text`}>
          <div className={`${sectionPrefix}-info-container`}>
            <div className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col md:flex-row`}>
              <p className={`${sectionPrefix}-info-item-label text-lg font-bold md:w-1/4`}>
                Enrgy Prices (kw/h):
              </p>
              <p className={`${sectionPrefix}-info-item-value text-lg font-normal flex items-center`}>
                {energyPriceDetail.isActive
                  ? <div className='bg-green-500 rounded-full h-4 w-4 mx-2'></div>
                  : <div className='bg-secondary rounded-full h-4 w-4 mx-2'></div>
                }
                {energyPriceDetail.price}
              </p>
            </div>
          </div>
        </div>
      );
    })
  );
};

export default EnergyPricesContent;
