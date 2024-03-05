import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { Textarea } from '@projects/textarea';
import { RootState } from '../../../../app/redux/store';

interface IFormData {
  [key: string]: string | number | boolean | string[];
};

interface IModalPageInputs {
  activePage: number;
  cities: { rid: number; plateCode: number; name: string; }[];
  formData: IFormData;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  setCities: React.Dispatch<React.SetStateAction<{ rid: number; plateCode: number; name: string; id: null }[]>>;
  setDistricts: React.Dispatch<React.SetStateAction<{ rid: number; name: string; plateCode: number; id: null }[]>>;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
};

const ServicePointModalFormSecondPage = ({
  activePage,
  cities,
  formData,
  setActivePage,
  setCities,
  setDistricts,
  setFormData
}: IModalPageInputs) => {
  const brandPrefix = 'sh';
  const formProperties = ['phone-number-1', 'phone-number-2', 'address'];
  const sectionPrefix = 'service-point';
  const updatedServicePointInfoData = useSelector((state: RootState) => {
    return state.updatedServicePointInfoData.updatedServicePointInfoData
  });
  const { formState: { errors }, handleSubmit, register } = useForm();

  const getCities = async () => {
    try {
      await axios.get(
        process.env.CITY_URL || ''
      )
        .then((response) => response.data.data)
        .then((cities) => { setCities(cities); getDistricts() });
    } catch (error) {
      console.log(error);
    };
  };

  const getDistricts = async () => {
    try {
      await axios.post(
        process.env.DISTRICT_URL || '',
        { 'plateNumber': formData[`${sectionPrefix}-city`] }
      )
        .then((response) => response.data.data)
        .then(data => setDistricts(data));
    } catch (error) {
      console.log(error);
    };
  };

  const handleFormSubmit: SubmitHandler<IFormData> = () => {
    setActivePage(activePage + 1);
  };

  useEffect(() => {
    if (cities.length === 0 && activePage === 2) {
      getCities();
    }

    if (updatedServicePointInfoData.id > 0) {
      setFormData({
        [`${sectionPrefix}-${formProperties[0]}`]: updatedServicePointInfoData.Phone1,
        [`${sectionPrefix}-${formProperties[1]}`]: updatedServicePointInfoData.Phone2,
        [`${sectionPrefix}-${formProperties[2]}`]: updatedServicePointInfoData.Address,
      });
    }
  }, [cities, activePage, updatedServicePointInfoData]);

  return (
    <form
      className={`${brandPrefix}-modal-page-2 ${activePage === 2 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`${sectionPrefix}-phone-numbers-container`}>
        <Label
          className={`${sectionPrefix}-${formProperties[0]}-label block mb-2 text-heading font-semibold`}
          htmlFor={`${sectionPrefix}-${formProperties[0]}`}
          labelText={`Hizmet Noktasi Birinci Telefon Numarasi`} >
          <span className="text-md text-error">*</span>
        </Label>
        <Input
          className={`${sectionPrefix}-${formProperties[0]}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${sectionPrefix}-${formProperties[0]}`}
          name={`${sectionPrefix}-${formProperties[0]}`}
          placeholder={`0555 123 45 67`}
          register={
            register(`${sectionPrefix}-${formProperties[0]}`, {
              required: `Telefon numarasi alani zorunludur.`,
              minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
              maxLength: { value: 11, message: 'En fazla 11 karakter girebilirsiniz.' },
              value: updatedServicePointInfoData.id > 0
                ? updatedServicePointInfoData.Phone1
                : formData[`${sectionPrefix}-${formProperties[0]}`],
              onChange: (event) => { setFormData({ ...formData, [event.target.name]: event.target.value }) },
            })}
          type={`number`}
        />
        {
          errors[`${sectionPrefix}-${formProperties[0]}`]
          && errors[`${sectionPrefix}-${formProperties[0]}`]?.message
          && (
            <div className={`${sectionPrefix}-phone-number-error-wrapper my-4 font-bold text-error`}>
              <p className={`${sectionPrefix}-phone-number-error-message`}>
                {(errors[`${sectionPrefix}-${formProperties[0]}`]?.message?.toString())}
              </p>
            </div>
          )}
        <Label
          className={`${sectionPrefix}-${formProperties[1]}-input block mb-2 text-heading font-semibold`}
          htmlFor={`${sectionPrefix}-${formProperties[1]}`}
          labelText={`Hizmet Noktasi Ikinci Telefon Numarasi`} />
        <Input
          className={`${sectionPrefix}-${formProperties[1]}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${sectionPrefix}-${formProperties[1]}`}
          name={`${sectionPrefix}${formProperties[1]}`}
          placeholder={`0555 123 45 67`}
          register={
            register(`${sectionPrefix}-${formProperties[1]}`, {
              minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
              maxLength: { value: 11, message: 'En fazla 11 karakter girebilirsiniz.' },
              value: updatedServicePointInfoData.id > 0
                ? updatedServicePointInfoData.Phone2
                : formData[`${sectionPrefix}-${formProperties[1]}`],
              onChange: (event) => { setFormData({ ...formData, [event.target.name]: event.target.value }) },
            })}
          type={`number`}
        />
      </div>
      <div className={`${sectionPrefix}-${formProperties[2]}-container`}>
        <Label
          className={`${sectionPrefix}-adress-input block mb-2 text-heading font-semibold`}
          htmlFor={`${sectionPrefix}-${formProperties[2]}`}
          labelText={'Hizmet Noktasi Adresi'} >
          <span className="text-md text-error">*</span>
        </Label>
        <Textarea
          className={`${sectionPrefix}-${formProperties[2]}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${sectionPrefix}-${formProperties[2]}`}
          name={`${sectionPrefix}-${formProperties[2]}`}
          placeholder={'Cumhuriyet Mahallesi 123.Sokak...'}
          register={
            register(`${sectionPrefix}-${formProperties[2]}`, {
              required: `Hizmet Noktasi Adresi zorunludur.`,
              minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
              onChange: (event) => {
                setFormData({ ...formData, [`${sectionPrefix}-${formProperties[2]}`]: event.target.value })
              },
            })}
          value={formData[`${sectionPrefix}-${formProperties[2]}`]?.toString()}
        />
        {errors[`${sectionPrefix}-${formProperties[2]}`]
          && errors[`${sectionPrefix}-${formProperties[2]}`]?.message
          && (
            <div className={`${sectionPrefix}-${formProperties[2]}-error-wrapper my-4 font-bold text-error`}>
              <p className={`${sectionPrefix}-${formProperties[2]}-error-message`}>
                {(errors[`${sectionPrefix}-${formProperties[2]}`]?.message?.toString())}
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
