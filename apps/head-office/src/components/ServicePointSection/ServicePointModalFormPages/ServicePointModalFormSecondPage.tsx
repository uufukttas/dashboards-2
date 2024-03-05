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

const ServicePointModalFormSecondPage = ({ activePage, cities, formData, setActivePage, setCities, setDistricts, setFormData }: IModalPageInputs) => {
  const formProperties = ['service-point-phone-number-1', 'service-point-phone-number-2', 'service-point-address'];
  const prefixSP = 'sh-service-point';
  const updatedServicePointInfoData = useSelector((state: RootState) => state.updatedServicePointInfoData.updatedServicePointInfoData);
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

    if (updatedServicePointInfoData.id > 0) {
      setFormData({
        ['service-point-phone-number-1']: updatedServicePointInfoData.Phone1,
        ['service-point-phone-number-2']: updatedServicePointInfoData.Phone2,
        ['service-point-address']: updatedServicePointInfoData.address,
      });
    }
  }, [cities, activePage, updatedServicePointInfoData]);

  return (
    <form className={`sh-modal-page-2 ${activePage === 2 ? 'block' : 'hidden'}`} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`${prefixSP}-phone-numbers-container`}>
        <Label className={`${prefixSP}-phone-number-1-label block mb-2 text-heading font-semibold`} htmlFor={`${formProperties[0]}`} labelText={`Hizmet Noktasi Birinci Telefon Numarasi`} >
          <span className="text-md text-error">*</span>
        </Label>
        <Input
          className={`${prefixSP}-phone-number-1-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${prefixSP}-phone-number-1`}
          name={`${formProperties[0]}`}
          placeholder={`0555 123 45 67`}
          register={
            register(`${formProperties[0]}`, {
              required: `Telefon numarasi alani zorunludur.`,
              minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
              maxLength: { value: 11, message: 'En fazla 11 karakter girebilirsiniz.' },
              value: updatedServicePointInfoData.id > 0
                ? updatedServicePointInfoData.Phone1
                : formData[`${formProperties[0]}`],
              onChange: (event) => { setFormData({ ...formData, [event.target.name]: event.target.value }) },
            })}
          type={`number`}
        />
        {errors[`${formProperties[0]}`] && errors[`${formProperties[0]}`]?.message && (
          <div className={`service-point-phone-number-error-wrapper my-4 font-bold text-error`}>
            <p className={`service-point-phone-number-error-message`}>
              {(errors[`${formProperties[0]}`]?.message?.toString())}
            </p>
          </div>
        )}
        <Label className={`${prefixSP}-phone-number-2-input block mb-2 text-heading font-semibold`} htmlFor={`${formProperties[1]}`} labelText={`Hizmet Noktasi Ikinci Telefon Numarasi`} />
        <Input
          className={`${prefixSP}-phone-number-2-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${prefixSP}-phone-number-2`}
          name={`${formProperties[1]}`}
          placeholder={`0555 123 45 67`}
          register={
            register(`${formProperties[1]}`, {
              minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
              maxLength: { value: 11, message: 'En fazla 11 karakter girebilirsiniz.' },
              value: updatedServicePointInfoData.id > 0
                ? updatedServicePointInfoData.Phone2
                : formData[`${formProperties[1]}`],
              onChange: (event) => { setFormData({ ...formData, [event.target.name]: event.target.value }) },
            })}
          type={`number`}
        />
      </div>
      <div className={`${prefixSP}-address-container`}>
        <Label className={`${prefixSP}-adress-input block mb-2 text-heading font-semibold`} htmlFor={`${formProperties[2]}`} labelText={'Hizmet Noktasi Adresi'} >
          <span className="text-md text-error">*</span>
        </Label>
        <Textarea
          className={`${prefixSP}-adress-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${formProperties[2]}`}
          name={`${formProperties[2]}`}
          placeholder={'Cumhuriyet Mahallesi 123.Sokak...'}
          register={
            register(`${formProperties[2]}`, {
              required: `Hizmet Noktasi Adresi zorunludur.`,
              minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
              onChange: (event) => { setFormData({ ...formData, [`${formProperties[2]}`]: event.target.value }) },
            })}
          value={formData[`${formProperties[2]}`]?.toString()}
        />
        {errors[`${formProperties[2]}`] && errors[`${formProperties[2]}`]?.message && (
          <div className={`service-point-address-error-wrapper my-4 font-bold text-error`}>
            <p className={`service-point-address-error-message`}>
              {(errors[`${formProperties[2]}`]?.message?.toString())}
            </p>
          </div>
        )}
      </div>
      <div className={`${performance}-buttons-container flex justify-between items-center`}>
        <Button
          buttonText='Geri'
          className={`${prefixSP}-prev-button bg-primary text-text text-sm rounded-lg block p-2.5`}
          type={`button`}
          onClick={() => setActivePage(activePage - 1)}
        />
        <Button
          buttonText='Sonraki'
          className={`${prefixSP}-next-button bg-primary text-text text-sm rounded-lg block p-2.5`}
          type={`submit`}
        />
      </div>
    </form >
  )
};

export default ServicePointModalFormSecondPage;
