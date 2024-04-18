import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { IServiceDetailsContentProps } from '../types';
import { Button } from '@projects/button';
import { FaSackDollar, FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModalVisibility } from '../../../../app/redux/features/isModalVisible';
import { RootState } from '../../../../app/redux/store';

const EnergyPricesContent = ({ setAddEnergyPrice, slug }: IServiceDetailsContentProps) => {
  const sectionPrefix = 'energy-prices-details';
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state: RootState) => state.isModalVisibleReducer.isModalVisible);
  const [energyPriceDetails, setEnergyPriceDetails] = useState<{ id: number; stationId: number; price: number; startDate: string; isActive: boolean; isDeleted: boolean }[]>([]);

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

  const handleDelete = (event: React.MouseEvent) => {
    const deletedEnergyPriceId = event.currentTarget.getAttribute('energy-price-id');
    
    axios
      .post(
        'https://sharztestapi.azurewebsites.net/ServicePoint/RemoveEnergyPrice',
        JSON.stringify({ Id: deletedEnergyPriceId }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (energyPriceDetails.length === 0)
      getEnergyPriceDetails(slug);
  }, [energyPriceDetails]);

  return (
    <div className='flex flex-col items-end py-4'>
      <Button
        buttonText={""}
        className="button bg-primary rounded-md px-4 py-2 mx-4 hover:bg-primary-lighter"
        id={`energy-prices-add-button`}
        type={'button'}
        onClick={() => {
          setAddEnergyPrice && setAddEnergyPrice(true);
          dispatch(toggleModalVisibility(isModalVisible));
        }}
      >
        <FaSackDollar />
      </Button>
      {
        energyPriceDetails && energyPriceDetails.map((
          energyPriceDetail: { id: number; stationId: number; price: number; startDate: string; isActive: boolean; isDeleted: boolean }, idx: number
        ) => {
          return (
            <div key={idx} className='flex w-full'>
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
                      className="bg-secondary rounded-md px-4 py-2 mx-4"
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
          );
        })
      } </div>
  );
};

export default EnergyPricesContent;
