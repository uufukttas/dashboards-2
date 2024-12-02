import { Button } from '@projects/button';
import React, { useState } from 'react';
import {
  useAddStationMutation,
  useGetCompaniesQuery,
  useGetResellersQuery,
  useUpdateStationMutation,
} from '../../../../../app/api/services/service-points/servicePoints.service';
import { EVENTS_EMMITER_CONSTANTS } from '../../../../../src/constants/event.constants';
import EventManager from '../../../../../src/managers/Event.manager';
import { BRAND_PREFIX } from '../../../../constants/constants';
import BaseInput from '../../../Base/BaseInput';
import BaseSelect from '../../../Base/BaseSelect';
import { IModalFirstPageInputsProps } from '../../types';

const ServicePointModalFormFirstPage: React.FC<IModalFirstPageInputsProps> = ({
  form,
  activePage,
  setActivePage,
}: IModalFirstPageInputsProps) => {
  const hasStationId: boolean = form.watch(`id`) > 0;
  const sectionPrefix: string = 'service-point';
  const { handleSubmit } = form;
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const hasServicePointDataId: boolean = form.watch(`id`) > 0;

  const { data: resellers } = useGetResellersQuery();
  const { data: companies } = useGetCompaniesQuery();

  const [addStation] = useAddStationMutation();
  const [updateStation] = useUpdateStationMutation();

  const handleDropdownChange = (name: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    form.setValue(name, Number(event.target.value));
  };

  const handleFormSubmit = () => {
    setIsDisabled(true);

    if (form.watch(`id`) > 0) {
      setActivePage(activePage + 1);

      return;
    }

    handleServicePointOperation();
  };

  const handleServicePointOperation = async () => {
    if (hasServicePointDataId) {
      updateStation({
        body: {
          id: form.watch(`id`),
          address: form.watch(`address`),
          cityId: form.watch(`cityId`),
          districtId: form.watch(`districtId`),
          resellerCompanyId: form.watch(`resslerCompanyId`),
          companyId: form.watch(`company`),
          isActive: true,
          name: form.watch('name'),
        },
      }).unwrap();
      return;
    }

    addStation({
      body: {
        name: form.watch(`name`),
        resellerCompanyId: form.watch(`resslerCompanyId`),
        companyId: form.watch(`company`),
        isActive: true,
        address: form.watch(`address`),
        cityId: form.watch(`cityId`),
        districtId: form.watch(`districtId`),
      },
    })
      .unwrap()
      .then((response) => {
        form.setValue(`id`, (response?.[0] as unknown as { id: number })?.id || 0);
      });

    EventManager.emit(EVENTS_EMMITER_CONSTANTS.FIRE_REFECTCH_STATIONS, {});
    setActivePage(activePage + 1);
  };

  return (
    <form
      className={`${BRAND_PREFIX}-modal-form-page-1 ${activePage === 1 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {
        // @ts-ignore
        <BaseInput
          form={form}
          name={`name`}
          id={`name`}
          label="İstasyon İsmi"
          rules={{
            required: 'İstasyon İsmi zorunludur',
            minLength: {
              value: 3,
              message: 'İstasyon İsmi en az 3 karakter olmalıdır',
            },
          }}
          disabled={hasStationId}
        />
      }
      <BaseSelect
        form={form}
        items={companies || []}
        name={`company`}
        label="Şirket"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleDropdownChange(`company`, event)}
        optionClassName="hover:bg-primary-lighter hover:text-black"
        disabled={hasStationId}
        rules={{
          required: 'Şirket seçimi zorunludur',
        }}
      />
      <BaseSelect
        form={form}
        items={resellers || []}
        name={`resslerCompanyId`}
        label="Bayi"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => handleDropdownChange(`resslerCompanyId`, event)}
        optionClassName="hover:bg-primary-lighter hover:text-black"
        disabled={hasStationId}
      />
      <div className={`${sectionPrefix}-buttons-container flex flex-row-reverse`}>
        <Button
          buttonText="İleri"
          className={`${sectionPrefix}-submit-button bg-primary text-white text-sm rounded-lg block p-2.5`}
          disabled={isDisabled}
          id={`${sectionPrefix}-submit-button`}
          type={`submit`}
        />
      </div>
    </form>
  );
};

export default ServicePointModalFormFirstPage;
