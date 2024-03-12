import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Input } from '@projects/input';
import { Label } from '@projects/label';
import { RootState } from '../../../../app/redux/store';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

interface IFormDataProps {
  [key: string]: string | number | boolean | string[];
};

interface IModalPageInputs {
  activePage: number;
  cities: { rid: number; plateCode: number; name: string; id: null; }[];
  districts: { rid: number; name: string; plateCode: number; id: null }[];
  formData: IFormDataProps;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  setDistricts: React.Dispatch<React.SetStateAction<{ rid: number; name: string; plateCode: number; id: null }[]>>;
  setFormData: React.Dispatch<React.SetStateAction<IFormDataProps>>;
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

  const updatedServicePointInfoData = useSelector((state: RootState) => {
    return state.updatedServicePointInfoData.updatedServicePointInfoData
  });
  const formName = ['cityId', 'districtId', 'x-coord', 'y-coord'];
  const sectionPrefix = 'service-point';
  const formProperties = {
    cityId: `${sectionPrefix}-${formName[0]}`,
    districtId: `${sectionPrefix}-${formName[1]}`,
    'x-coord': `${sectionPrefix}-${formName[2]}`,
    'y-coord': `${sectionPrefix}-${formName[3]}`,
  };
  const isServicePointInfoDataUpdated = updatedServicePointInfoData.id > 0;
  const [thirdPageFormData, setThirdPageFormData] = useState<IFormDataProps>({
    [`${formProperties.cityId}`]: isServicePointInfoDataUpdated
      ? updatedServicePointInfoData.cityId
      : formData[`${formProperties.cityId}`] || 1,
    [`${formProperties.districtId}`]: isServicePointInfoDataUpdated
      ? updatedServicePointInfoData.districtId
      : formData[`${formProperties.districtId}`] || 1,
    [`${formProperties['x-coord']}`]: isServicePointInfoDataUpdated
      ? updatedServicePointInfoData.lon
      : formData[`${formProperties['x-coord']}`] || '',
    [`${formProperties['y-coord']}`]: isServicePointInfoDataUpdated
      ? updatedServicePointInfoData.lat
      : formData[`${formProperties['y-coord']}`] || ''
  });
  const [selectedCity, setSelectedCity] = useState<number>(Number(thirdPageFormData[formProperties.cityId]));
  const [selectedDistrict, setSelectedDistrict] = useState<number>(Number(thirdPageFormData.districtId));
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
    const cityId = Number(event.target.value);

    setSelectedCity(cityId);
    setThirdPageFormData(({ ...thirdPageFormData, [`${formProperties.cityId}`]: cityId }));
    getDistricts(cityId);
  };

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = Number(event.target.value);

    setSelectedDistrict(districtId);
    setThirdPageFormData(({ ...thirdPageFormData, [`${formProperties.districtId}`]: districtId }));
  };

  const handleFormSubmit: SubmitHandler<IFormDataProps> = () => {
    setFormData({
      ...formData,
      ...thirdPageFormData,
    });
    setActivePage(activePage + 1);
  };

  useEffect(() => {
    setSelectedCity(updatedServicePointInfoData.cityId > 0 ? updatedServicePointInfoData.cityId : selectedCity);
    getDistricts(selectedCity);
  }, []);

  return (
    <form
      className={`${BRAND_PREFIX}-modal-page-3 ${activePage === 3 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`${formProperties.cityId}-container`}>
        <Label
          className={`${formProperties.cityId}-label block mb-2 text-heading font-semibold`}
          htmlFor={`${formProperties.cityId}`}
          labelText={`Hizmet Noktasi İl`} />
        <Dropdown
          className={`${formProperties.cityId}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${formProperties.cityId}`}
          items={cities}
          name={`${formProperties.cityId}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => { handleCityChange(event); }}
          selectedValue={thirdPageFormData[`${formProperties.cityId}`].toString()}
        />
      </div>
      <div className={`${formProperties.districtId}-container`}>
        <Label
          className={`${formProperties.districtId}-label block mb-2 text-heading font-semibold`}
          htmlFor={`${formProperties.districtId}`}
          labelText={`Hizmet Noktasi İlcesi`} />
        <Dropdown
          className={`${formProperties.districtId}-input border text-text text-sm rounded-lg block w-full p-2.5 mb-4`}
          id={`${formProperties.districtId}`}
          items={districts}
          name={`${formProperties.districtId}`}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => { handleDistrictChange(event); }}
          selectedValue={thirdPageFormData[`${formProperties.districtId}`].toString()}
        />
      </div>
      <div className={`${sectionPrefix}-coordinates-container flex justify-center items-center`}>
        <div className={`${formProperties['x-coord']}-container w-1/2 flex flex-col justify-center `}>
          <Label
            className={`${formProperties['x-coord']}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties['x-coord']}`}
            labelText={`Hizmet Noktasi X Koordinati`} />
          <Input
            className={`${formProperties['x-coord']}-input text-text text-sm rounded-lg block w-3/4 p-2.5 mb-4`}
            id={`${formProperties['x-coord']}`}
            name={`${formProperties['x-coord']}`}
            register={
              register(`${formProperties['x-coord']}`, {
              required: `Hizmet Noktasi X Koordinati zorunludur.`,
              value: thirdPageFormData[`${formProperties['x-coord']}`],
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                setThirdPageFormData(({ ...thirdPageFormData, [event.target.name]: Number(event.target.value) }));
              }
            })}
            type={`text`}
          />
          {
            errors[`${formProperties['x-coord']}`]
            && errors[`${formProperties['x-coord']}`]?.message
            && (
              <div className={`${formProperties['x-coord']}-error-wrapper mb-4 font-bold text-error`}>
                <p className={`${formProperties['x-coord']}-error-message`}>
                  {'X-Koordinatı zorunludur.'}
                </p>
              </div>
            )
          }
        </div>
        <div className={`${formProperties['y-coord']}-container w-1/2 flex flex-col items-end`}>
          <Label
            className={`${formProperties['y-coord']}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties['y-coord']}`}
            labelText={`Hizmet Noktasi Y Koordinati`} />
          <Input
            className={`${formProperties['y-coord']}-input text-text text-sm rounded-lg block w-3/4 p-2.5 mb-4`}
            id={`${formProperties['y-coord']}`}
            name={`${formProperties['y-coord']}`}
            register={
              register(`${formProperties['y-coord']}`, {
              required: `Hizmet Noktasi Y Koordinati zorunludur.`,
              value: thirdPageFormData[`${formProperties['y-coord']}`],
              onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
                setThirdPageFormData(({ ...thirdPageFormData, [event.target.name]: Number(event.target.value) }));
              }
            })}
            type={`text`}
          />
          {
            errors[`${formProperties['y-coord']}`]
            && errors[`${formProperties['y-coord']}`]?.message
            && (
              <div className={`${formProperties['y-coord']}-error-wrapper mb-4 font-bold text-error`}>
                <p className={`${formProperties['y-coord']}-error-message`}>
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
