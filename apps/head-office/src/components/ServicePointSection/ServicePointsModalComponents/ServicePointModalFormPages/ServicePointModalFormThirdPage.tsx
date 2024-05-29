import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@projects/button';
import { Dropdown } from '@projects/dropdown';
import { Label } from '@projects/label';
import MapComponent from '../../Map';
import { BRAND_PREFIX } from '../../../../constants/constants';
import { setServicePointInformation } from '../../../../../app/redux/features/servicePointInformation';
import { RootState } from '../../../../../app/redux/store';
import { IFeatureProps, IFormDataProps, IModalThirdPageInputsProps } from '../../types';

const ServicePointModalFormThirdPage: React.FC<IModalThirdPageInputsProps> = ({
  activePage,
  cities,
  districts,
  setActivePage,
  setDistricts,
  setPaymentMethods,
  setOpportunities,
}: IModalThirdPageInputsProps) => {
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const servicePointInformation = useSelector((state: RootState) => {
    return state.servicePointInformation.servicePointInformation;
  });
  const formName = ['cityId', 'districtId', 'x-coord', 'y-coord'];
  const sectionPrefix = 'service-point';
  const formProperties = {
    cityId: `${sectionPrefix}-${formName[0]}`,
    districtId: `${sectionPrefix}-${formName[1]}`,
    'x-coord': `${sectionPrefix}-${formName[2]}`,
    'y-coord': `${sectionPrefix}-${formName[3]}`,
  };
  const [thirdPageFormData, setThirdPageFormData] = useState<IFormDataProps>({
    [`${formProperties.cityId}`]: servicePointInformation.cityId || 1,
    [`${formProperties.districtId}`]: servicePointInformation.districtId || 1,
    [`${formProperties['x-coord']}`]: servicePointInformation.lon === 0 ? '' : servicePointInformation.lon,
    [`${formProperties['y-coord']}`]: servicePointInformation.lat === 0 ? '' : servicePointInformation.lat,
  });
  const [selectedCity, setSelectedCity] = useState<number>(Number(thirdPageFormData[formProperties.cityId]));

  const handleSelectLocation = (location: { lat: number; lng: number }) => {
    const { lat, lng } = location;
    setThirdPageFormData(({ ...thirdPageFormData, [`${formProperties['x-coord']}`]: lat, [`${formProperties['y-coord']}`]: lng }));
  };

  const getDistricts = async (selectedCity: number) => {
    try {
      await axios
        .post(
          process.env.DISTRICT_URL || '',
          { 'plateNumber': selectedCity }
        )
        .then((response) => response.data.data)
        .then(data => {
          setDistricts(data)
          setThirdPageFormData(({ ...thirdPageFormData,
            [`${formProperties.districtId}`]: data[0].rid,
            [`${formProperties.cityId}`]: selectedCity
          }));
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    };
  };
  const getPaymentMethods = async () => {
    try {
      axios
        .post(
          process.env.GET_FEATURE_VALUES || '',
          { "stationFeatureType": 1 },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => response.data)
        .then(data => {
          const paymentMethods = data.data.map((item: IFeatureProps, index: number) => {
            return {
              id: null,
              name: item.name,
              rid: item.rid,
              isChecked: false,
              stationFeatureValue: index + 1,
              stationFeatureType: 1,
            };
          });

          setPaymentMethods(paymentMethods);
        });
    } catch (error) {
      console.log(error);
    };
  };
  const getOpportunities = async () => {
    try {
      axios
        .post(
          process.env.GET_FEATURE_VALUES || '',
          { "stationFeatureType": 2 },
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((response) => response.data)
        .then(data => {
          const opportunities = data.data.map((item: IFeatureProps, index: number) => {
            return {
              id: null,
              name: item.name,
              rid: item.rid,
              isChecked: false,
              stationFeatureValue: index + 1,
              stationFeatureType: 2,
            };
          });

          setOpportunities(opportunities);
        });
    } catch (error) {
      console.log(error);
    };
  };
  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = Number(event.target.value);

    getDistricts(cityId);
    setSelectedCity(cityId);
  };
  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = Number(event.target.value);

    setThirdPageFormData(({ ...thirdPageFormData, [`${formProperties.districtId}`]: districtId }));
  };
  const handleFormSubmit: SubmitHandler<IFormDataProps> = () => {
    dispatch(
      setServicePointInformation({
        ...servicePointInformation,
        cityId: thirdPageFormData[`${formProperties.cityId}`],
        districtId: thirdPageFormData[`${formProperties.districtId}`],
        lon: thirdPageFormData[`${formProperties['x-coord']}`],
        lat: thirdPageFormData[`${formProperties['y-coord']}`],
      })
    );
    setActivePage(activePage + 1);
  };

  useEffect(() => {
    setSelectedCity( Number(thirdPageFormData[`${formProperties.cityId}`] ?? 0));
    getDistricts(selectedCity);
    getPaymentMethods();
    getOpportunities();
  }, []);

  return (
    <form
      className={`${BRAND_PREFIX}-modal-page-3 ${activePage === 3 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={`${formProperties.cityId}-container`}>
        <Label
          className={`${formProperties.cityId}-label block mb-2 text-heading font-semibold`}
          htmlFor={`${formProperties.cityId}`}
          labelText={`İl`} />
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
          labelText={`İlcesi`} />
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
            labelText={`X Koordinati`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Label
            className={`${formProperties['x-coord']}-label-value block mb-2`}
            htmlFor={`${formProperties['x-coord']}-value`}
            labelText={''}
          >
            {(thirdPageFormData[`${formProperties['x-coord']}`] || '').toString()}
          </Label>
        </div>
        <div className={`${formProperties['y-coord']}-container w-1/2 flex flex-col justify-center`}>
          <Label
            className={`${formProperties['y-coord']}-label block mb-2 text-heading font-semibold`}
            htmlFor={`${formProperties['y-coord']}`}
            labelText={`Y Koordinati`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Label
            className={`${formProperties['y-coord']}-label-value block mb-2`}
            htmlFor={`${formProperties['y-coord']}-value`}
            labelText={''}
          >
            {(thirdPageFormData[`${formProperties['y-coord']}`] || '').toString()}
          </Label>
        </div>
      </div>
      <MapComponent formData={thirdPageFormData} onSelectLocation={handleSelectLocation} />
      <div className={`${sectionPrefix}-buttons-container flex justify-between items-center mt-4`}>
        <Button
          buttonText='Geri'
          className={`${sectionPrefix}-prev-button bg-primary text-text text-sm rounded-lg block p-2.5`}
          id={`${sectionPrefix}-prev-button`}
          type={`button`}
          onClick={() => setActivePage(activePage - 1)}
        />
        <Button
          buttonText='Ileri'
          className={`${sectionPrefix}-next-button bg-primary text-text text-sm rounded-lg block p-2.5`}
          id={`${sectionPrefix}-next-button`}
          type={`submit`}
        />
      </div>
    </form >
  );
};

export default ServicePointModalFormThirdPage;
