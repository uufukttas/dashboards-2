import { Button } from '@projects/button';
import React from 'react';
import { BRAND_PREFIX } from '../../../../constants/constants';
import BaseInput from '../../../Base/BaseInput';
import { IModalSecondPageInputsProps } from '../../types';

const ServicePointModalFormSecondPage: React.FC<IModalSecondPageInputsProps> = ({
  form,
  activePage,
  setActivePage,
}: IModalSecondPageInputsProps) => {
  const { handleSubmit } = form;

  const sectionPrefix = 'service-point';

  const handleFormSubmit = () => {
    setActivePage(activePage + 1);
  };

  return (
    <form
      className={`${BRAND_PREFIX}-modal-page-2 ${activePage === 2 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={`${sectionPrefix}-phone-numbers-container gap-4 mb-4`}>
        <BaseInput
          form={form}
          name={`phone1`}
          id={`phone1`}
          label="Birinci Telefon Numarasi"
          rules={{
            required: 'Telefon numarasi alani zorunludur.',
            minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
            maxLength: { value: 11, message: 'En fazla 11 karakter girebilirsiniz.' },
          }}
        />
        <BaseInput
          form={form}
          name={`phone2`}
          id={`phone2`}
          label="İkinci Telefon Numarasi"
          rules={{
            required: 'Telefon numarasi alani zorunludur.',
            minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
            maxLength: { value: 11, message: 'En fazla 11 karakter girebilirsiniz.' },
          }}
        />
        <BaseInput
          form={form}
          name={`address`}
          id={`address`}
          label="Adres"
          rules={{
            required: 'Adres alani zorunludur.',
          }}
          isTextarea={true}
        />
        <BaseInput
          form={form}
          name={`address-detail`}
          id={`address-detail`}
          label="Adres Tarifi"
          isTextarea={true}
          containerClassName="mt-6"
        />
      </div>
      <div className={`${sectionPrefix}-buttons-container flex justify-between items-center`}>
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

export default ServicePointModalFormSecondPage;
