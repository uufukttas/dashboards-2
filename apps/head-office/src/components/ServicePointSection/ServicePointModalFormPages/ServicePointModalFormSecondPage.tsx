import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { Textarea } from '@projects/textarea';
import { setServicePointInformation } from '../../../../app/redux/features/servicePointInformation';
import { RootState } from '../../../../app/redux/store';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

interface IFormDataProps {
  [key: string]: string | number | boolean | string[];
};

interface IModalPageInputs {
  activePage: number;
  cities: { rid: number; plateCode: number; name: string; }[];
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  setCities: React.Dispatch<React.SetStateAction<{ rid: number; plateCode: number; name: string; id: null }[]>>;
  setDistricts: React.Dispatch<React.SetStateAction<{ rid: number; name: string; plateCode: number; id: null }[]>>;
};

const ServicePointModalFormSecondPage = ({
  activePage,
  cities,
  setActivePage,
  setCities,
  setDistricts,
}: IModalPageInputs) => {
  const dispatch = useDispatch();
  const { formState: { errors }, handleSubmit, register } = useForm();
  const servicePointInformation = useSelector((state: RootState) => {
    return state.servicePointInformation.servicePointInformation
  });
  const formName = ['phone-number-1', 'phone-number-2', 'address'];
  const sectionPrefix = 'service-point';
  const formProperties = {
    phone1: `${sectionPrefix}-${formName[0]}`,
    phone2: `${sectionPrefix}-${formName[1]}`,
    address: `${sectionPrefix}-${formName[2]}`,
  };
  const [secondPageFormData, setSecondPageFormData] = useState<IFormDataProps>({
    [`${formProperties.phone1}`]: servicePointInformation.phone1 || '',
    [`${formProperties.phone2}`]: servicePointInformation.phone2 || '',
    [`${formProperties.address}`]: servicePointInformation.address || '',
  });

  const getCities = async () => {
    try {
      await axios.get(
        process.env.CITY_URL || ''
      )
        .then((response) => response.data.data)
        .then((cities) => {
          setCities(cities);
          getDistricts();
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    };
  };

  const getDistricts = async () => {
    try {
      await axios
        .post(
          process.env.DISTRICT_URL || '',
          { 'plateNumber': 1 }
        )
        .then((response) => response.data.data)
        .then(data => setDistricts(data))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    };
  };

  const handleFormSubmit: SubmitHandler<IFormDataProps> = () => {
    dispatch(
      setServicePointInformation({
        ...servicePointInformation,
        phone1: secondPageFormData[`${formProperties.phone1}`],
        phone2: secondPageFormData[`${formProperties.phone2}`],
        address: secondPageFormData[`${formProperties.address}`],
      }));

    setActivePage(activePage + 1);
  };

  useEffect(() => {
    if (cities.length === 0) {
      getCities();
    }
  }, [cities]);

  return (
    <form
      className={`${BRAND_PREFIX}-modal-page-2 ${activePage === 2 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`${sectionPrefix}-phone-numbers-container`}>
        <Label
          className={`${formProperties.phone1}-label block mb-2 text-heading font-semibold`}
          htmlFor={`${formProperties.phone1}`}
          labelText={`Birinci Telefon Numarasi`} >
          <span className="text-md text-error">*</span>
        </Label>
        <Input
          className={`${formProperties.phone1}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${formProperties.phone1}`}
          name={`${formProperties.phone1}`}
          placeholder={`0555 123 45 67`}
          register={
            register(`${formProperties.phone1}`, {
              required: `Telefon numarasi alani zorunludur.`,
              minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
              maxLength: { value: 11, message: 'En fazla 11 karakter girebilirsiniz.' },
              value: secondPageFormData[`${formProperties.phone1}`],
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                setSecondPageFormData({
                  ...secondPageFormData,
                  [event.target.name]: event.target.value,
                });
              },
            })}
          type={`number`}
        />
        {
          errors[`${formProperties.phone1}`]
          && errors[`${formProperties.phone1}`]?.message
          && (
            <div className={`${sectionPrefix}-phone-number-error-wrapper my-4 font-bold text-error`}>
              <p className={`${sectionPrefix}-phone-number-error-message text-error`}>
                {(errors[`${formProperties.phone1}`]?.message?.toString())}
              </p>
            </div>
          )}
        <Label
          className={`${formProperties.phone2}-input block mb-2 text-heading font-semibold`}
          htmlFor={`${formProperties.phone2}`}
          labelText={`Ikinci Telefon Numarasi`} />
        <Input
          className={`${formProperties.phone2}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${formProperties.phone2}`}
          name={`${sectionPrefix}${formName[1]}`}
          placeholder={`0555 123 45 67`}
          register={
            register(`${formProperties.phone2}`, {
              minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
              maxLength: { value: 11, message: 'En fazla 11 karakter girebilirsiniz.' },
              value: secondPageFormData[`${formProperties.phone2}`],
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                setSecondPageFormData({
                  ...secondPageFormData,
                  [event.target.name]: event.target.value,
                });
              },
            })}
          type={`number`}
        />
      </div>
      <div className={`${formProperties.address}-container`}>
        <Label
          className={`${sectionPrefix}-adress-input block mb-2 text-heading font-semibold`}
          htmlFor={`${formProperties.address}`}
          labelText={'Adres'} >
          <span className="text-md text-error">*</span>
        </Label>
        <Textarea
          className={`${formProperties.address}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${formProperties.address}`}
          name={`${formProperties.address}`}
          placeholder={'Cumhuriyet Mahallesi 123.Sokak...'}
          register={
            register(`${formProperties.address}`, {
              required: `Adres zorunludur.`,
              minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
              value: secondPageFormData[`${formProperties.address}`].toString(),
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                setSecondPageFormData({
                  ...secondPageFormData,
                  [event.target.name]: event.target.value,
                });
              },
            })}
        />
        {errors[`${formProperties.address}`]
          && errors[`${formProperties.address}`]?.message
          && (
            <div className={`${formProperties.address}-error-wrapper my-4 font-bold text-error`}>
              <p className={`${formProperties.address}-error-message text-error`}>
                {(errors[`${formProperties.address}`]?.message?.toString())}
              </p>
            </div>
          )}
      </div>
      <div className={`${sectionPrefix}-buttons-container flex justify-between items-center`}>
        <Button
          buttonText='Geri'
          className={`${sectionPrefix}-prev-button bg-primary text-text text-sm rounded-lg block p-2.5`}
          type={`button`}
          onClick={() => setActivePage(activePage - 1)}
        />
        <Button
          buttonText='Ileri'
          className={`${sectionPrefix}-next-button bg-primary text-text text-sm rounded-lg block p-2.5`}
          type={`submit`}
        />
      </div>
    </form >
  )
};

export default ServicePointModalFormSecondPage;
