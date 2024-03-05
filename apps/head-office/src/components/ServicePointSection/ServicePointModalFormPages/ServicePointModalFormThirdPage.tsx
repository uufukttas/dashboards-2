import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { RootState } from '../../../../app/redux/store';

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
  const formProperties = ['service-point-city', 'service-point-district', 'service-point-x-coord', 'service-point-y-coord'];
  const prefixSP = 'sh-service-point';
  const updatedServicePointInfoData = useSelector((state: RootState) => state.updatedServicePointInfoData.updatedServicePointInfoData);
  const [selectedCity, setSelectedCity] = useState<number>(Number(formData[`${formProperties[0]}`]) || 1);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(Number(formData[`${formProperties[1]}`]) || 1);
  const { formState: { errors }, handleSubmit, register } = useForm();

  const getDistricts = async (selectedCity: number) => {
    try {
      await axios.post(
        process.env.DISTRICT_URL || '',
        { 'plateNumber': selectedCity }
      )
        .then((response) => response.data.data)
        .then(data => {
          setDistricts(data);
          updatedServicePointInfoData.districtId > 1 ? setSelectedDistrict(updatedServicePointInfoData.districtId) : setSelectedDistrict(data[0].rid);
        });
    } catch (error) {
      console.log(error);
    };
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(Number(event.target.value));
    setFormData(({ ...formData, [`${formProperties[0]}`]: event.target.value }));
  };

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(({ ...formData, [`${formProperties[1]}`]: Number(event.target.value) }));
  };

  const handleFormSubmit: SubmitHandler<IFormData> = () => {
    setActivePage(activePage + 1);
  };

  useEffect(() => {
    setFormData({
      [`${formProperties[0]}`]: updatedServicePointInfoData.id > 0 ? updatedServicePointInfoData.cityId : selectedCity,
      [`${formProperties[1]}`]: updatedServicePointInfoData.id > 0 ? updatedServicePointInfoData.districtId : selectedDistrict,
    });

    getDistricts(selectedCity);
  }, [selectedCity, selectedDistrict]);

  return (
    <form className={`sh-modal-page-3 ${activePage === 3 ? 'block' : 'hidden'}`} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`${prefixSP}-city-container`}>
        <Label className={`${prefixSP}-city-label block mb-2 text-heading font-semibold`} htmlFor={`${formProperties[0]}`} labelText={`Hizmet Noktasi İl`}  />
        <Dropdown
          className={`${prefixSP}-city-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${prefixSP}-city`}
          items={cities}
          name={`${formProperties[0]}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => { handleCityChange(event); }}
          selectedValue={updatedServicePointInfoData?.cityId?.toString() || formData[`${formProperties[0]}`]?.toString() || '0'}
          value={formData[`${formProperties[0]}`]?.toString()}
        />
      </div>
      <div className={`${prefixSP}-district-container`}>
        <Label className={`${prefixSP}-district-label block mb-2 text-heading font-semibold`} htmlFor={`${formProperties[1]}`} labelText={`Hizmet Noktasi İlcesi`}  />
        <Dropdown
          className={`${prefixSP}-district-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${prefixSP}-district`}
          items={districts}
          name={`${formProperties[1]}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => { handleDistrictChange(event); }}
          selectedValue={formData[`${formProperties[1]}`]?.toString() || '0'}
          value={formData[`${formProperties[1]}`]?.toString()}
        />
      </div>
      <div className={`service-point-coordinates-container flex justify-center items-center`}>
        <div className={`${prefixSP}-x-coord-container w-1/2 flex flex-col justify-center `}>
          <Label className={`${prefixSP}-x-coord-label block mb-2 text-heading font-semibold`} htmlFor={`${formProperties[2]}`} labelText={`Hizmet Noktasi X Koordinati`}  />
          <Input
            id={`${prefixSP}-x-coord`}
            name={`${formProperties[2]}`}
            className={`${prefixSP}-x-coord-input text-text text-sm rounded-lg block w-3/4 p-2.5 mb-4`}
            type={`text`}
            register={register(`${formProperties[2]}`, {
              required: `Hizmet Noktasi X Koordinati zorunludur.`,
              value: updatedServicePointInfoData?.longitude || formData[`${formProperties[2]}`],
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => { setFormData(({ ...formData, [event.target.name]: Number(event.target.value) })) }
            })}
          />
          {
            errors[`${formProperties[2]}`] && errors[`${formProperties[2]}`]?.message && (
              <div className={`${formProperties[2]}-error-wrapper mb-4 font-bold text-error`}>
                <p className={`${formProperties[2]}-error-message`}>
                  {'X-Koordinatı zorunludur.'}
                </p>
              </div>
            )
          }
        </div>
        <div className={`${prefixSP}-y-coord-container w-1/2 flex flex-col items-end`}>
          <Label className={`${prefixSP}-y-coord-label block mb-2 text-heading font-semibold`} htmlFor={`${formProperties[3]}`} labelText={`Hizmet Noktasi Y Koordinati`}  />
          <Input
            id={`${prefixSP}-y-coord`}
            name={`${formProperties[3]}`}
            className={`${prefixSP}-y-coord-input text-text text-sm rounded-lg block w-3/4 p-2.5 mb-4`}
            type={`text`}
            register={register(`${formProperties[3]}`, {
              required: `Hizmet Noktasi Y Koordinati zorunludur.`,
              value: updatedServicePointInfoData?.latitude || formData[`${formProperties[3]}`],
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => { setFormData(({ ...formData, [event.target.name]: Number(event.target.value) })) }
            })}
          />
          {
            errors[`${formProperties[3]}`] && errors[`${formProperties[3]}`]?.message && (
              <div className={`${formProperties[3]}-error-wrapper mb-4 font-bold text-error`}>
                <p className={`${formProperties[3]}-error-message`}>
                  {'Y-Koordinatı zorunludur.'}
                </p>
              </div>
            )
          }
        </div>
      </div>
      <div className={`${prefixSP}-buttons-container flex justify-between items-center`}>
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

export default ServicePointModalFormThirdPage;