import { Button } from '@projects/button';
import useModalManager from 'apps/head-office/src/hooks/useModalManager';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  useAddEnergyPriceMutation,
  useGetEnergyPriceDetailsMutation,
} from '../../../../app/api/services/service-point-details/servicePointDetails.service';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import BaseInput from '../../Base/BaseInput';
import ModalLayout from '../../Modal/Layouts/ModalLayout';
import type { IEnergyPriceModalProps, IStationIdProps } from '../types';

const EnergyPricesModal: FC<IStationIdProps> = ({ stationId }: IStationIdProps) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-energy-price-modal`;
  const today: Date = new Date();
  const formattedDate: string = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today
    .getDate()
    .toString()
    .padStart(2, '0')}`;
  const form = useForm();
  const [addEnergyPrice] = useAddEnergyPriceMutation();
  const { closeModal } = useModalManager();
  const [energyPricesProperty, setEnergyPricesProperty] = useState<IEnergyPriceModalProps>({
    isActive: true,
    price: 0,
    time: formattedDate,
  });

  const handleFormSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    await addEnergyPrice({
      body: {
        isActive: true,
        isDeleted: false,
        price: energyPricesProperty.price,
        startDate: energyPricesProperty.time,
        stationId,
      },
    });

    closeModal('addEnergyPriceModal');
  };

  return (
    <ModalLayout
      className={`${sectionPrefix}-container`}
      contentClassName={`${sectionPrefix}-content flex-col `}
      id={`${sectionPrefix}-container`}
      name={'addEnergyPriceModal'}
      title={'Enerji Fiyatı Ekle'}
    >
      <div className={`${sectionPrefix}-form-container relative p-6 bg-white rounded-lg`}>
        <form className={`${sectionPrefix}-form w-full`} onSubmit={handleFormSubmit}>
          <div className={`${sectionPrefix}-content-container`}>
            <div className={`${sectionPrefix}-price-input-container flex justify-between items-center`}>
              <BaseInput
                form={form}
                id={`${sectionPrefix}-price`}
                inputClassName={`${sectionPrefix}-price-input border text-text text-sm rounded-lg block p-2.5 mb-4 focus:ring-primary focus:border-primary`}
                label={`Enerji Fiyatı (kwh/Birim fiyat)`}
                name={`${sectionPrefix}-price`}
                type="text"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEnergyPricesProperty({
                    ...energyPricesProperty,
                    price: parseFloat(event.target.value),
                  });
                }}
              />
            </div>
            <BaseInput
              form={form}
              id={`${sectionPrefix}-datetime`}
              inputClassName={`${sectionPrefix}-date-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
              label={`Tarih`}
              name={`${sectionPrefix}-datetime`}
              type="date"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEnergyPricesProperty({
                  ...energyPricesProperty,
                  time: event.target.value,
                });
              }}
            />
            <Button
              buttonText="Kaydet"
              className={`-button bg-primary text-white w-full py-2.5 rounded-lg`}
              id="addEnergyPriceButton"
              type="submit"
            />
          </div>
        </form>
      </div>
    </ModalLayout>
  );
};

export default EnergyPricesModal;
