import React from 'react';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { BRAND_PREFIX } from '../../../../src/constants/constants';
import { useForm } from 'react-hook-form';
import { Button } from '@projects/button';
import axios from 'axios';

const EnergyPricesModal = ({ slug, setAddEnergyPrice, setIsEnergyPriceListUpdated }: {
  slug: string;
  setAddEnergyPrice: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEnergyPriceListUpdated: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const sectionPrefix = 'energy-prices';
  const [energyPricesProperty, setEnergyPricesProperty] = React.useState<{ price: number; time: string; isActive: boolean }>({
    price: 0,
    time: '',
    isActive: true,
  });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const handleFormSubmit = () => {
    axios
      .post(
        'https://sharztestapi.azurewebsites.net/ServicePoint/AddEnergyPrice',
        JSON.stringify({
          stationId: slug,
          price: energyPricesProperty.price,
          startDate: energyPricesProperty.time,
          isActive: true,
          isDeleted: false
        }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => {
        setAddEnergyPrice(false);
        setIsEnergyPriceListUpdated(true);
      })
  }

  return (
    <div className={`${BRAND_PREFIX}-${sectionPrefix}-modal-form-container relative p-6 bg-white rounded-lg`}>
      <form
        className={`${BRAND_PREFIX}-add-${sectionPrefix}-form w-full`}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className={`-container`}>
          <Label
            className={`${sectionPrefix}-label block mb-2 text-heading font-semibold`}
            htmlFor={``}
            labelText={`Enerji Fiyati (kwh/Birim fiyat)`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Input
            className={`${sectionPrefix}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
            id={`${sectionPrefix}`}
            name={`${sectionPrefix}`}
            register={
              register(`${sectionPrefix}`, {
                min: {
                  value: 1,
                  message: `Enerji Fiyati 0'dan büyük olmalıdır.`,
                },
                required: `Enerji Fiyati zorunludur.`,
                value: energyPricesProperty.price.toString(),
                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                  setEnergyPricesProperty({
                    ...energyPricesProperty,
                    price: parseFloat(event.target.value),
                  });
                },
              })
            }
            type={`text`}
          />
          {errors[`${sectionPrefix}`]
            && errors[`${sectionPrefix}`]?.message
            && (
              <div className={`${sectionPrefix}-error-wrapper my-4 font-bold text-error`}>
                <p className={`${sectionPrefix}-error-message text-error`}>
                  {errors[`${sectionPrefix}`]?.message?.toString()}
                </p>
              </div>
            )}


          <Label
            className={`${sectionPrefix}-label block mb-2 text-heading font-semibold`}
            htmlFor={``}
            labelText={`Tarih`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Input
            className={`${sectionPrefix}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4 focus:ring-primary focus:border-primary`}
            id={`${sectionPrefix}-datetime`}
            name={`${sectionPrefix}-datetime`}
            register={
              register(`${sectionPrefix}-datetime`, {
                required: `Tarih zorunludur.`,
                value: energyPricesProperty.price.toString(),
                onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                  setEnergyPricesProperty({
                    ...energyPricesProperty,
                    time: event.target.value,
                  });
                },
              })
            }
            type={`date`}
          />
          <Button
            buttonText='Kaydet'
            id='addConnectorButton'
            type='submit'
            className={`-button bg-primary text-white w-full py-2.5 rounded-lg`}
          />
        </div>
      </form>
    </div>
  );
};

export default EnergyPricesModal;
