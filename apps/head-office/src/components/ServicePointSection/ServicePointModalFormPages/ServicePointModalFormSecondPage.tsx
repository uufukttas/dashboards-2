import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@projects/button';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { Textarea } from '@projects/textarea';

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

const ServicePointModalFormSecondPage = ({ activePage, cities, formData, setActivePage, setCities, setDistricts, setFormData }: IModalPageInputs) => {
  const prefixSP = 'sh-service-point';
  const formProperties = ['service-point-phone-number-1', 'service-point-phone-number-2', 'service-point-address'];
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
        { 'plateNumber': Number(formData['service-point-city'] || 1) }
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
  }, [cities, activePage]);

  return (
    <form className={`sh-modal-page-2 ${activePage === 2 ? 'block' : 'hidden'}`} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`${prefixSP}-phone-numbers-container`}>
        <Label htmlFor={`${formProperties[0]}`} labelText={`Hizmet Noktasi Telefon Numarasi`} className={`${prefixSP}-phone-number-1-label block mb-2 text-sm font-medium text-gray-900`}>
          <span className="text-md text-error">*</span>
        </Label>
        <Input
          ariaInvalid={true}
          id={`${prefixSP}-phone-number-1`}
          name={`${formProperties[0]}`}
          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4`}
          type={`number`}
          placeholder={`05551234567`}
          register={register(`${formProperties[0]}`, {
            required: `Telefon numarasi alani zorunludur.`,
            minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
            maxLength: { value: 11, message: 'En fazla 11 karakter girebilirsiniz.' },
            value: formData[`${formProperties[0]}`],
            onChange: (event) => { setFormData({ ...formData, [event.target.name]: event.target.value }) },
          })}
        />
        {errors[`${formProperties[0]}`] && errors[`${formProperties[0]}`]?.message && (
          <div className={`service-point-phone-number-error-wrapper my-4 font-bold text-error`}>
            <p className={`service-point-phone-number-error-message`}>
              {(errors[`${formProperties[0]}`]?.message?.toString())}
            </p>
          </div>
        )}
        <Label htmlFor={`${formProperties[1]}`} labelText={`Hizmet Noktasi Telefon Numarasi`} className={`block mb-2 text-sm font-medium text-gray-900`} />
        <Input
          ariaInvalid={true}
          id={`${prefixSP}-phone-number-2`}
          name={`${formProperties[1]}`}
          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4`}
          type={`number`}
          placeholder={`05551234567`}
          value={formData[`${formProperties[1]}`]?.toString()}
          onChange={(event) => { setFormData({ ...formData, [event.target.name]: event.target.value }) }}
        />
      </div>
      <div className={`${prefixSP}-address-container`}>
        <Label htmlFor={`service-point-address`} labelText={'Hizmet Noktasi Adresi'} className={`block mb-2 text-sm font-medium text-gray-900`}>
          <span className="text-md text-error">*</span>
        </Label>
        <Textarea
          id={`${formProperties[2]}`}
          name={`${formProperties[2]}`}
          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4`}
          placeholder={'Cumhuriyet Mahallesi 123.Sokak...'}
          register={register(`${formProperties[2]}`, {
            required: `Hizmet Noktasi Adresi zorunludur.`,
            minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
            onChange: (event) => { setFormData({ ...formData, [`${formProperties[2]}`]: event.target.value }) },
            value: formData[`${formProperties[2]}`]
          })}
        />
        {errors[`${formProperties[2]}`] && errors[`${formProperties[2]}`]?.message && (
          <div className={`service-point-address-error-wrapper my-4 font-bold text-error`}>
            <p className={`service-point-address-error-message`}>
              {(errors[`${formProperties[2]}`]?.message?.toString())}
            </p>
          </div>
        )}
      </div>
      <div className={`service-point-buttons-container flex justify-between items-center`}>
        <Button
          buttonText='Geri'
          className={`bg-blue-500 border text-gray-900 text-sm rounded-lg block w-1/4 p-2.5`}
          type={`button`}
          onClick={() => setActivePage(activePage - 1)}
        />
        <Button
          buttonText='Ileri'
          className={`bg-blue-500 border text-gray-900 text-sm rounded-lg block w-1/4 p-2.5`}
          type={`submit`}
        />
      </div>
    </form >
  )
};

export default ServicePointModalFormSecondPage;
