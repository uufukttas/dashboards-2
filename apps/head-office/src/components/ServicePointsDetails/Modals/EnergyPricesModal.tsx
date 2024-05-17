import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { hideAlert, showAlert } from '../../../../app/redux/features/alertInformation';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

const EnergyPricesModal = ({ slug, setAddEnergyPrice, setIsEnergyPriceListUpdated }: {
  slug: string;
  setAddEnergyPrice: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEnergyPriceListUpdated: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const sectionPrefix = 'energy-prices';
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [currencies, setCurrencies] = React.useState<{ id: number; name: string; rid: null }[]>(
    [
      { id: 0, name: 'Seçiniz', rid: null }
    ]
  );
  const [energyPricesProperty, setEnergyPricesProperty] = useState<{ price: number; time: string; isActive: boolean }>({
    price: 0,
    time: '',
    isActive: true,
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const getCurrencies = async () => {
    await axios
      .get(
        'https://sharztestapi.azurewebsites.net/Values/Currencies'
      )
      .then((response) => {
        setCurrencies(response.data.data);
      });
  };
  const handleFormSubmit = () => {
    setIsDisabled(true);
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
        dispatch(
          showAlert({
            message: response.data.message,
            type: 'success',
          })
        );
        setTimeout(() => dispatch(hideAlert()), 5000);
      })
  };

  useEffect(() => {
    getCurrencies();
  }, []);

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
          <div className='inputs-container flex justify-start items-center mb-4'>
            <Input
              className={`${sectionPrefix}-input border text-text text-sm rounded-lg block p-2.5 mb-4 focus:ring-primary focus:border-primary`}
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
            <Dropdown
              className={`${sectionPrefix}-dropdown border text-text text-sm rounded-lg block p-2.5 mb-4 mx-4 focus:ring-primary focus:border-primary`}
              id={`${sectionPrefix}-dropdown`}
              name={`${sectionPrefix}-dropdown`}
              items={currencies}
            />
          </div>
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
            className={`-button bg-primary text-white w-full py-2.5 rounded-lg`}
            disabled={isDisabled}
            id='addConnectorButton'
            type='submit'
          />
        </div>
      </form>
    </div>
  );
};

export default EnergyPricesModal;
