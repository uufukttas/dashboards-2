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

const ServicePointModalFormThirdPage = ({
  activePage,
  cities,
  districts,
  formData,
  setActivePage,
  setDistricts,
  setFormData
}: IModalPageInputs) => {
  const brandPrefix = 'sh';
  const formProperties = ['city', 'district', 'x-coord', 'y-coord'];
  const sectionPrefix = 'service-point';
  const [selectedCity, setSelectedCity] = useState<number>(Number(formData[`${formProperties[0]}`]) || 1);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(Number(formData[`${formProperties[1]}`]) || 1);
  const updatedServicePointInfoData = useSelector((state: RootState) => {
    return state.updatedServicePointInfoData.updatedServicePointInfoData
  });
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
          updatedServicePointInfoData.districtId > 1
            ? setSelectedDistrict(updatedServicePointInfoData.districtId)
            : setSelectedDistrict(data[0].rid);
        });
    } catch (error) {
      console.log(error);
    };
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(Number(event.target.value));
    setFormData(({ ...formData, [`${sectionPrefix}-${formProperties[0]}`]: event.target.value }));
  };

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(({ ...formData, [`${sectionPrefix}-${formProperties[1]}`]: Number(event.target.value) }));
  };

  const handleFormSubmit: SubmitHandler<IFormData> = () => {
    setActivePage(activePage + 1);
  };

  useEffect(() => {
    setSelectedCity(updatedServicePointInfoData.cityId > 0 ? updatedServicePointInfoData.cityId : selectedCity);

    if (updatedServicePointInfoData.cityId > 0) {
      setFormData({
        ...formData,
        [`${sectionPrefix}-${formProperties[0]}`]: updatedServicePointInfoData.cityId,
        [`${sectionPrefix}-${formProperties[1]}`]: updatedServicePointInfoData.districtId,
        [`${sectionPrefix}-${formProperties[2]}`]: updatedServicePointInfoData.longitude,
        [`${sectionPrefix}-${formProperties[3]}`]: updatedServicePointInfoData.latitude
      });
    }
    getDistricts(selectedCity);
  }, [selectedCity, selectedDistrict]);

  return (
    <form
      className={`${brandPrefix}-modal-page-3 ${activePage === 3 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`${sectionPrefix}-${formProperties[0]}-container`}>
        <Label
          className={`${sectionPrefix}-${formProperties[0]}-label block mb-2 text-heading font-semibold`}
          htmlFor={`${sectionPrefix}-${formProperties[0]}`}
          labelText={`Hizmet Noktasi İl`} />
        <Dropdown
          className={`${sectionPrefix}-${formProperties[0]}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${sectionPrefix}-${formProperties[0]}`}
          items={cities}
          name={`${sectionPrefix}-${formProperties[0]}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => { handleCityChange(event); }}
          selectedValue={
            updatedServicePointInfoData?.cityId?.toString()
            || formData[`${sectionPrefix}-${formProperties[0]}`]?.toString()
            || '0'}
          value={updatedServicePointInfoData?.cityId?.toString()
            || formData[`${sectionPrefix}-${formProperties[0]}`]?.toString()
            || '0'}
        />
      </div>
      <div className={`${sectionPrefix}-${formProperties[1]}-container`}>
        <Label
          className={`${sectionPrefix}-${formProperties[1]}-label block mb-2 text-heading font-semibold`}
          htmlFor={`${sectionPrefix}-${formProperties[1]}`}
          labelText={`Hizmet Noktasi İlcesi`} />
        <Dropdown
          className={`${sectionPrefix}-${formProperties[1]}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${sectionPrefix}-${formProperties[1]}`}
          items={districts}
          name={`${sectionPrefix}-${formProperties[1]}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => { handleDistrictChange(event); }}
          selectedValue={
            updatedServicePointInfoData?.districtId?.toString()
            || formData[`${sectionPrefix}-${formProperties[1]}`]?.toString()
            || '0'}
          value={updatedServicePointInfoData?.districtId?.toString()
            || formData[`${sectionPrefix}-${formProperties[1]}`]?.toString()
            || '0'}
        />
      </div>
      <div className={`${sectionPrefix}-coordinates-container flex justify-center items-center`}>
        <div className={`${sectionPrefix}-${formProperties[2]}-container w-1/2 flex flex-col justify-center `}>
          <Label
            className={`${sectionPrefix}-${formProperties[2]}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${sectionPrefix}-${formProperties[2]}`}
            labelText={`Hizmet Noktasi X Koordinati`} />
          <Input
            className={`${sectionPrefix}-${formProperties[2]}-input text-text text-sm rounded-lg block w-3/4 p-2.5 mb-4`}
            id={`${sectionPrefix}-${formProperties[2]}`}
            name={`${sectionPrefix}-${formProperties[2]}`}
            register={register(`${sectionPrefix}-${formProperties[2]}`, {
              required: `Hizmet Noktasi X Koordinati zorunludur.`,
              value: updatedServicePointInfoData.id > 0
                ? updatedServicePointInfoData?.longitude
                : formData[`${sectionPrefix}-${formProperties[2]}`],
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                setFormData(({ ...formData, [event.target.name]: Number(event.target.value) }));
              }
            })}
            type={`text`}
          />
          {
            errors[`${sectionPrefix}-${formProperties[2]}`]
            && errors[`${sectionPrefix}-${formProperties[2]}`]?.message
            && (
              <div className={`${sectionPrefix}-${formProperties[2]}-error-wrapper mb-4 font-bold text-error`}>
                <p className={`${sectionPrefix}-${formProperties[2]}-error-message`}>
                  {'X-Koordinatı zorunludur.'}
                </p>
              </div>
            )
          }
        </div>
        <div className={`${sectionPrefix}-${formProperties[3]}-container w-1/2 flex flex-col items-end`}>
          <Label
            className={`${sectionPrefix}-${formProperties[3]}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${sectionPrefix}-${formProperties[3]}`}
            labelText={`Hizmet Noktasi Y Koordinati`} />
          <Input
            className={`${sectionPrefix}-${formProperties[3]}-input text-text text-sm rounded-lg block w-3/4 p-2.5 mb-4`}
            id={`${sectionPrefix}-${formProperties[3]}`}
            name={`${sectionPrefix}-${formProperties[3]}`}
            register={register(`${sectionPrefix}-${formProperties[3]}`, {
              required: `Hizmet Noktasi Y Koordinati zorunludur.`,
              value: updatedServicePointInfoData.id > 0 ? updatedServicePointInfoData?.latitude : formData[`${sectionPrefix}-${formProperties[3]}`],
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                setFormData(({ ...formData, [event.target.name]: Number(event.target.value) }));
              }
            })}
            type={`text`}
          />
          {
            errors[`${sectionPrefix}-${formProperties[3]}`]
            && errors[`${sectionPrefix}-${formProperties[3]}`]?.message
            && (
              <div className={`${sectionPrefix}-${formProperties[3]}-error-wrapper mb-4 font-bold text-error`}>
                <p className={`${sectionPrefix}-${formProperties[3]}-error-message`}>
                  {'Y-Koordinatı zorunludur.'}
                </p>
              </div>
            )
          }
        </div>
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

export default ServicePointModalFormThirdPage;