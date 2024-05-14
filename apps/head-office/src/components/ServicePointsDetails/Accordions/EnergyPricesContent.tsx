import React from 'react';
import { useDispatch } from 'react-redux';
import { FaTrashCan } from 'react-icons/fa6';
import { Button } from '@projects/button';
import { showDialog } from '../../../../app/redux/features/dialogInformation';
import type { IEnergyPriceDetailsProps, IServicePointsEnergyPricesContentProps } from '../types';

const EnergyPricesContent = ({ energyPriceDetails, setIsEnergyPriceListUpdated }: IServicePointsEnergyPricesContentProps) => {
  const sectionPrefix = 'energy-prices-details';
  const dispatch = useDispatch();

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
                    onClick={() => dispatch(
                      showDialog({
                        actionType: 'deleteEnergyPrice',
                        data: energyPriceDetail.id,
                      }))
                    }
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
