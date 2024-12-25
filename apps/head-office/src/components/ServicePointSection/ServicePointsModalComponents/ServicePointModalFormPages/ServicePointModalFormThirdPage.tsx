import { Button } from '@projects/button';
import { Label } from '@projects/label';
import React, { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useGetCitiesQuery, useGetDistrictsMutation } from '../../../../../app/api/services/static/static.service';
import { BRAND_PREFIX } from '../../../../constants/constants';
import BaseSelect from '../../../Base/BaseSelect';
import MapComponent from '../../Map';
import { IFormDataProps, IServicePointModalPageProps } from '../../types';

const ServicePointModalFormThirdPage: React.FC<IServicePointModalPageProps> = ({
  activePage,
  form,
  setActivePage,
}: IServicePointModalPageProps) => {
  const { handleSubmit } = form;
  const sectionPrefix: string = `${BRAND_PREFIX}-service-point-modal-page-3`;
  const { data: cities } = useGetCitiesQuery({});
  const [getDistricts, { data: districts }] = useGetDistrictsMutation();
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

  const handleCityChange = async (cityId: number): Promise<void> => {
    await getDistricts({ body: { plateNumber: cityId } })
      .unwrap()
      .then((data) => form.setValue(`district-id`, form.watch(`district-id`) || data[0].id));
  };
  const handleFormSubmit: SubmitHandler<IFormDataProps> = (): void => {
    if (form.watch(`lat`) === 0 && form.watch(`lng`) === 0) {
      setIsErrorVisible(true);

      return;
    }

    setActivePage(activePage + 1);
  };
  const handleSelectLocation = (location: { lat: number; lng: number }): void => {
    const { lat, lng } = location;

    form.setValue(`lat`, lat);
    form.setValue(`lng`, lng);
  };

  useEffect(() => {
    handleCityChange(Number(form.watch(`city-id`)) || 1);
  }, [form.watch(`city-id`)]);

  return (
    <form
      className={`${sectionPrefix} w-full ${activePage === 3 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={`${sectionPrefix}-city-container`}>
        <BaseSelect
          defaultValue={form.watch(`city-id`)}
          form={form}
          items={cities || []}
          label="İl"
          name={`city-id`}
          optionClassName="hover:bg-primary-lighter hover:text-black"
          optionLabel="name"
          optionValue="rid"
          rules={{ required: 'İl seçimi zorunludur' }}
        />
      </div>
      <div className={`${sectionPrefix}-district-container`}>
        <BaseSelect
          defaultValue={form.watch(`district-id`)}
          form={form}
          items={districts || []}
          label="İlçe"
          name={`district-id`}
          optionClassName="hover:bg-primary-lighter hover:text-black"
          optionLabel="name"
          optionValue="rid"
          rules={{ required: 'İlçe seçimi zorunludur' }}
        />
      </div>
      <div className={`${sectionPrefix}-coordinates-container flex justify-center items-center`}>
        <div className={`${sectionPrefix}-x-coord-container w-1/2 flex flex-col justify-center `}>
          <Label
            className={`${sectionPrefix}-x-coord-label block mb-2 text-heading font-semibold`}
            htmlFor={`lat`}
            labelText={`X Koordinati`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          {(form.watch(`lat`) || '').toString()}
        </div>
        <div className={`${sectionPrefix}-y-coord-container w-1/2 flex flex-col justify-center`}>
          <Label
            className={`${sectionPrefix}-y-coord-label block mb-2 text-heading font-semibold`}
            htmlFor={`lng`}
            labelText={`Y Koordinati`}
          >
            <span className="text-md text-error">*</span>
          </Label>
          {(form.watch(`lng`) || '').toString()}
        </div>
      </div>
      <div className={`${sectionPrefix}-map-container`}>
        <MapComponent
          cityId={form.watch(`city-id`)}
          districtId={form.watch(`district-id`)}
          lat={form.watch(`lat`)}
          lng={form.watch(`lng`)}
          onSelectLocation={handleSelectLocation}
        />
        {isErrorVisible && (
          <div className={`${sectionPrefix}-coordinates-error-wrapper my-4 font-bold text-error`}>
            <p className={`${sectionPrefix}-coordinates-error-message text-error`}>{'Harita uzerinden lokasyon seciniz.'}</p>
          </div>
        )}
        {form.watch(`lat`) === '' && form.watch(`lng`) === '' && (
          <div className={`${sectionPrefix}-y-coord-error-wrapper mb-4 font-bold text-error`}>
            <p className={`${sectionPrefix}-y-coord-error-message text-error`}>{'Harita uzerinden bir İstasyon Noktasi seciniz.'}</p>
          </div>
        )}
      </div>
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
