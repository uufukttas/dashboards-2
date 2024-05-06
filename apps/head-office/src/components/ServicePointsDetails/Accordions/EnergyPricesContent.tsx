import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashCan } from 'react-icons/fa6';
import { Button } from '@projects/button';
import type { IEnergyPriceDetailsProps, IServiceDetailsContentProps } from '../types';

const EnergyPricesContent = ({ slug }: IServiceDetailsContentProps) => {
  const sectionPrefix = 'energy-prices-details';
  const [energyPriceDetails, setEnergyPriceDetails] = useState<IEnergyPriceDetailsProps[]>([]);

  const getEnergyPriceDetails = async (slug: string) => {
    axios
      .post(
        process.env.GET_ENERGY_PRICES || '',
        JSON.stringify({ stationId: Number(slug) }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => response.data)
      .then((data) => data.data && setEnergyPriceDetails(data.data))
      .catch((error) => console.log(error));
  };
  const handleDelete = (event: React.MouseEvent) => {
    const deletedEnergyPriceId = event.currentTarget.getAttribute('energy-price-id');

    axios
      .post(
        process.env.REMOVE_ENERGY_PRICE || '',
        JSON.stringify({ Id: deletedEnergyPriceId }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (energyPriceDetails.length === 0)
      getEnergyPriceDetails(slug);
  }, [energyPriceDetails]);

  return (
    energyPriceDetails && energyPriceDetails.map((energyPriceDetail: IEnergyPriceDetailsProps, idx: number) => {
      return (
        <div key={idx} className='flex flex-col items-end py-4 text-white'>
          <div className='flex w-full'>
            <div className={`${sectionPrefix}-content py-4 text-text w-full`}>
              <div className={`${sectionPrefix}-info-container flex justify-between`}>
                <div className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col md:flex-row w-full`}>
                  <div className={`${sectionPrefix}-info-item-value text-lg font-normal flex items-center justify-between w-full`}>
                    <p>
                      <span className='font-bold'>{`${idx + 1}`}</span>{`. ${energyPriceDetail.startDate.split('T')[0]}`}
                    </p>
                    <div className='flex items-center w-1/6'>
                      {
                        energyPriceDetail.isActive
                          ? <div className='bg-green-500 rounded-full h-4 w-4 mx-2'></div>
                          : <div className='bg-secondary rounded-full h-4 w-4 mx-2'></div>
                      }
                      <p className='justif'>
                        {energyPriceDetail.price} birim
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col md:flex-row`}>
                  <Button
                    buttonText={""}
                    className="bg-secondary rounded-md px-4 py-2 mx-4 text-white"
                    id={`energy-prices-delete-button`}
                    type={'button'}
                    dataAttributes={{ 'energy-price-id': energyPriceDetail.id.toString() }}
                    onClick={handleDelete}
                  >
                    <FaTrashCan />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })
  );
};
export default EnergyPricesContent;
