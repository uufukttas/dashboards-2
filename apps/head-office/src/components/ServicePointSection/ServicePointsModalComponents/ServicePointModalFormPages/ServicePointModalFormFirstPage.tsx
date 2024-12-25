import React, { use, useEffect } from 'react';
import { Button } from '@projects/button';
import BaseInput from '../../../Base/BaseInput';
import BaseSelect from '../../../Base/BaseSelect';
import { BRAND_PREFIX } from '../../../../constants/constants';
import {
  useAddStationMutation,
  // useGetCompaniesQuery,
  useGetResellersQuery,
  useUpdateStationMutation,
} from '../../../../../app/api/services/service-points/servicePoints.service';
import { EVENTS_EMMITER_CONSTANTS } from '../../../../../src/constants/event.constants';
import EventManager from '../../../../../src/managers/Event.manager';
import { IServicePointModalPageProps } from '../../types';

const ServicePointModalFormFirstPage: React.FC<IServicePointModalPageProps> = ({
  activePage,
  form,
  modalName,
  setActivePage,
}: IServicePointModalPageProps) => {
  const hasServicePointId: boolean = form.watch(`id`) > 0;
  const isDisabled: boolean = modalName === 'addServicePointModal' && hasServicePointId;
  const sectionPrefix: string = `${BRAND_PREFIX}-service-point-modal-page-1`;
  const { handleSubmit } = form;
  const [addStation] = useAddStationMutation();
  const { data: resellers } = useGetResellersQuery();
  // const { data: companies } = useGetCompaniesQuery();
  const [updateStation] = useUpdateStationMutation();
  const handleFormSubmit = (): void => {
    handleServicePointOperation();
  };
  const handleServicePointOperation = async (): Promise<void> => {
    if (hasServicePointId) {
      updateStation({
        body: {
          // TODO: Company-ID will be changed according to the user's company - There is no any API for this
          companyId: 2,
          id: form.watch(`id`),
          isActive: true,
          name: form.watch('name'),
          resellerCompanyId: form.watch(`reseller-company-id`),
        },
      }).unwrap();

      EventManager.emit(EVENTS_EMMITER_CONSTANTS.FIRE_REFECTCH_STATIONS, {});
      setActivePage(activePage + 1);

      return;
    }

    addStation({
      body: {
        // TODO: Company-ID will be changed according to the user's company - There is no any API for this
        companyId: 2,
        isActive: true,
        name: form.watch(`name`),
        resellerCompanyId: form.watch(`reseller-company-id`),
      },
    })
      .unwrap()
      .then((response) => form.setValue(`id`, (response[0].id || 0)));

    EventManager.emit(EVENTS_EMMITER_CONSTANTS.FIRE_REFECTCH_STATIONS, {});
    setActivePage(activePage + 1);

    return;
  };

  useEffect(() => {
    if (hasServicePointId) {
      form.setValue(`name`, form.watch(`name`));
      form.setValue(`reseller-company-id`, form.watch(`reseller-company-id`));
      form.setValue(`company-id`, form.watch(`company-id`));
    }
  }, [form.watch(`id`)]);

  return (
    <form
      className={`${sectionPrefix} w-full ${activePage === 1 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={`${sectionPrefix}-name-input-container`}>
        <BaseInput
          disabled={isDisabled}
          form={form}
          id={`name`}
          inputClassName={`${isDisabled ? 'cursor-not-allowed' : ''}`}
          label="İstasyon İsmi"
          name={`name`}
          rules={{
            required: 'İstasyon İsmi zorunludur',
            minLength: {
              value: 3,
              message: 'İstasyon İsmi en az 3 karakter olmalıdır',
            },
          }}
        />
      </div>
      {/* <div className={`${sectionPrefix}-company-select-container`}>
        <BaseSelect
          disabled={isDisabled}
          form={form}
          items={companies || []}
          label="Şirket"
          name={`company-id`}
          optionClassName="hover:bg-primary-lighter hover:text-black"
          optionLabel="name"
          optionValue="id"
          rules={{ required: 'Şirket seçimi zorunludur' }}
        />
      </div> */}
      <div className={`${sectionPrefix}-reseller-select-container`}>
        <BaseSelect
          disabled={isDisabled}
          form={form}
          items={resellers || []}
          label="Bayi"
          name={`reseller-company-id`}
          optionClassName="hover:bg-primary-lighter hover:text-black"
          optionLabel="name"
          optionValue="id"
          rules={{ required: 'Bayi seçimi zorunludur' }}
        />
      </div>
      <div className={`${sectionPrefix}-buttons-container flex flex-row-reverse`}>
        <Button
          buttonText="İleri"
          className={`${sectionPrefix}-submit-button bg-primary text-white text-sm rounded-lg block p-2.5`}
          id={`${sectionPrefix}-submit-button`}
          type={`submit`}
        />
      </div>
    </form>
  );
};

export default ServicePointModalFormFirstPage;
