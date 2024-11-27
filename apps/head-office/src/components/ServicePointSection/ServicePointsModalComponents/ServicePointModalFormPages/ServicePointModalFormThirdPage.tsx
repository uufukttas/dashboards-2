import { Button } from '@projects/button';
import { Label } from '@projects/label';
import { useGetFeatureValuesMutation } from 'apps/head-office/app/api/services/service-points/servicePoints.service';
import { useGetCitiesQuery, useGetDistrictsMutation } from 'apps/head-office/app/api/services/static/static.service';
import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { BRAND_PREFIX } from '../../../../constants/constants';
import BaseSelect from '../../../Base/BaseSelect';
import MapComponent from '../../Map';
import { IFormDataProps, IModalThirdPageInputsProps } from '../../types';

const ServicePointModalFormThirdPage: React.FC<IModalThirdPageInputsProps> = ({
  form,
  activePage,
  setActivePage,
}: IModalThirdPageInputsProps) => {
  const { handleSubmit } = form;

  const { data: cities } = useGetCitiesQuery({});
  const [getDistricts, { data: districts }] = useGetDistrictsMutation();

  const [getFeatureValues] = useGetFeatureValuesMutation();

  const sectionPrefix = 'service-point';
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

  const handleSelectLocation = (location: { lat: number; lng: number }) => {
    const { lat, lng } = location;

    form.setValue(`lat`, lat);
    form.setValue(`lon`, lng);
  };

  const handleCityChange = (id: number) => {
    getDistricts({ body: { plateNumber: id } });
  };

  const handleFormSubmit: SubmitHandler<IFormDataProps> = () => {
    if (form.watch(`lat`) === 0 && form.watch(`lon`) === 0) {
      setIsErrorVisible(true);

      return;
    }

    setActivePage(activePage + 1);
  };

  useEffect(() => {
    handleCityChange(form.watch(`cityId`));
  }, [form.watch(`cityId`)]);

  useEffect(() => {
    handleCityChange(1);
  }, []);

  return (
    <form
      className={`${BRAND_PREFIX}-modal-page-3 ${activePage === 3 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <BaseSelect form={form} label="İl" name={`cityId`} items={cities || []} />
      <BaseSelect form={form} label="İlçe" name={`districtId`} items={districts || []} />
      <div className={`${sectionPrefix}-coordinates-container flex justify-center items-center`}>
        <div className={`w-1/2 flex flex-col justify-center `}>
          <Label
            className={`x-coord-label block mb-2 text-heading font-semibold`}
            htmlFor={`lat`}
            labelText={`X Koordinati`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Label className={`x-coord-label-value block mb-2`} htmlFor={`x-coord-value`} labelText={''}>
            {(form.watch(`lat`) || '').toString()}
          </Label>
        </div>
        <div className={`w-1/2 flex flex-col justify-center`}>
          <Label
            className={`y-coord-label block mb-2 text-heading font-semibold`}
            htmlFor={`lon`}
            labelText={`Y Koordinati`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          <Label className={`y-coord-label-value block mb-2`} htmlFor={`y-coord-value`} labelText={''}>
            {(form.watch(`lon`) || '').toString()}
          </Label>
        </div>
      </div>
      <MapComponent
        cityId={form.watch(`cityId`)}
        districtId={form.watch(`districtId`)}
        lat={form.watch(`lat`)}
        lng={form.watch(`lon`)}
        onSelectLocation={handleSelectLocation}
      />
      {isErrorVisible && (
        <div className={`coordinates-error-wrapper my-4 font-bold text-error`}>
          <p className={`coordinates-error-message text-error`}>{'Harita uzerinden lokasyon seciniz.'}</p>
        </div>
      )}
      {form.watch(`lat`) === '' && form.watch(`lon`) === '' && (
        <div className={`y-coord-error-wrapper mb-4 font-bold text-error`}>
          <p className={`y-coord-error-message text-error`}>{'Harita uzerinden bir İstasyon Noktasi seciniz.'}</p>
        </div>
      )}
      <div className={`${sectionPrefix}-buttons-container flex justify-between items-center mt-4`}>
        <Button
          buttonText="Geri"
          className={`${sectionPrefix}-prev-button bg-primary text-white text-sm rounded-lg block p-2.5`}
          id={`${sectionPrefix}-prev-button`}
          type={`button`}
          onClick={() => setActivePage(activePage - 1)}
        />
        <Button
          buttonText="İleri"
          className={`${sectionPrefix}-next-button bg-primary text-white text-sm rounded-lg block p-2.5`}
          id={`${sectionPrefix}-next-button`}
          type={`submit`}
        />
      </div>
    </form>
  );
};

export default ServicePointModalFormThirdPage;
