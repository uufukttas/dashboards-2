import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';

interface IFormData {
  [key: string]: string | number | boolean | string[];
};

interface IModalPageInputs {
  activePage: number;
  cities: { rid: number; plateCode: number; name: string; id: null; }[];
  districts: { rid: number; name: string; plateCode: number; id: null }[];
  formData: IFormData;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  setDistricts: React.Dispatch<React.SetStateAction<{ rid: number; name: string; plateCode: number; id: null }[]>>;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
};

const ServicePointModalFormThirdPage = ({ activePage, cities, districts, formData, setActivePage, setDistricts, setFormData }: IModalPageInputs) => {
  const { formState: { errors }, handleSubmit, register } = useForm();
  const [selectedCity, setSelectedCity] = useState<number>(1);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(1);

  const getDistricts = async (selectedCity: number) => {
    try {
      await axios.post(
        process.env.DISTRICT_URL || '',
        { 'plateNumber': selectedCity }
      )
        .then((response) => response.data.data)
        .then(data => { setDistricts(data); setSelectedDistrict(data[0].rid) });
    } catch (error) {
      console.log(error);
    };
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(Number(event.target.value));
    setFormData(({ ...formData, ['service-point-city']: event.target.value }));
  };

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(({ ...formData, ['service-point-district']: Number(event.target.value) }));
  };

  const handleFormSubmit: SubmitHandler<IFormData> = () => {
    setActivePage(activePage + 1);
  };

  useEffect(() => {
    getDistricts(selectedCity);
    setFormData(({ ...formData, ['service-point-city']: selectedCity, ['service-point-district']: selectedDistrict }));
  }, [selectedCity, selectedDistrict]);

  return (
    <form className={`sh-modal-page-3 ${activePage === 3 ? 'block' : 'hidden'}`} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`service-point-city-container`}>
        <Label htmlFor={`service-point-city`} labelText={`Hizmet Noktasi İl`} className={`block mb-2 text-sm font-medium text-gray-900`} />
        <Dropdown
          id={`service-point-city`}
          name={`service-point-city`}
          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4`}
          items={cities}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => { handleCityChange(event) }}
        />
      </div>
      <div className={`service-point-district-container`}>
        <Label htmlFor={`service-point-district`} labelText={`Hizmet Noktasi İlcesi`} className={`block mb-2 text-sm font-medium text-gray-900`} />
        <Dropdown
          id={`service-point-district`}
          name={`service-point-district`}
          className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4`}
          items={districts}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => { handleDistrictChange(event) }}
        />
      </div>
      <div className={`service-point-coordinates-container flex justify-center items-center`}>
        <div className={`service-point-x-coord-container w-1/2 flex flex-col justify-center `}>
          <Label htmlFor={`service-point-x-coord`} labelText={`Hizmet Noktasi X Koordinati`} className={`block mb-2 text-sm font-medium text-gray-900`} />
          <Input
            id={`service-point-x-coord`}
            name={`service-point-x-coord`}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-5/6 p-2.5 mb-4`}
            type={`text`}
            register={register('service-point-x-coord', {
              required: `Hizmet Noktasi X Koordinati zorunludur.`,
              value: formData['service-point-x-coord'],
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => { setFormData(({ ...formData, [event.target.name]: Number(event.target.value) })) }
            })}
          />
          {
            errors['service-point-x-coord'] && errors['service-point-x-coord']?.message && (
              <div className={`service-point-x-coord-error-wrapper mb-4 font-bold text-error`}>
                <p className={`service-point-x-coord-error-message`}>
                  {'X-Koordinatı zorunludur.'}
                </p>
              </div>
            )
          }
        </div>
        <div className={`service-point-y-coord-container w-1/2 flex flex-col items-end`}>
          <Label htmlFor={`service-point-y-coord`} labelText={`Hizmet Noktasi Y Koordinati`} className={`block mb-2 text-sm font-medium text-gray-900`} />
          <Input
            id={`service-point-y-coord`}
            name={`service-point-y-coord`}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-5/6 p-2.5 mb-4`}
            type={`text`}
            register={register('service-point-y-coord', {
              required: `Hizmet Noktasi Y Koordinati zorunludur.`,
              value: formData['service-point-y-coord'],
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => { setFormData(({ ...formData, [event.target.name]: Number(event.target.value) })) }
            })}
          />
          {
            errors['service-point-y-coord'] && errors['service-point-y-coord']?.message && (
              <div className={`service-point-y-coord-error-wrapper mb-4 font-bold text-error`}>
                <p className={`service-point-y-coord-error-message`}>
                  {'Y-Koordinatı zorunludur.'}
                </p>
              </div>
            )
          }
        </div>
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

export default ServicePointModalFormThirdPage;