import React from 'react';
import { Button } from '@projects/button';
import BaseInput from '../../../Base/BaseInput';
import { BRAND_PREFIX } from '../../../../constants/constants';
import { IServicePointModalPageProps } from '../../types';

const ServicePointModalFormSecondPage: React.FC<IServicePointModalPageProps> = ({
  activePage,
  form,
  setActivePage,
}: IServicePointModalPageProps) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-service-point-modal-page-2`;
  const { handleSubmit } = form;

  const handleFormSubmit = () => {
    setActivePage(activePage + 1);
  };

  return (
    <form
      className={`${sectionPrefix} w-full ${activePage === 2 ? 'block' : 'hidden'}`}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={`${sectionPrefix}-phone-numbers-container gap-4 mb-4`}>
        <div className={`${sectionPrefix}-phone-number-1-container`}>
          <BaseInput
            form={form}
            id={`phone1`}
            label="Birinci Telefon Numarasi"
            name={`phone1`}
            rules={{
              required: 'Telefon numarasi alani zorunludur.',
              minLength: { value: 10, message: 'En az 10 karakter girmelisiniz.' },
              maxLength: { value: 11, message: 'En fazla 11 karakter girebilirsiniz.' },
            }}
            type='text'
          />
        </div>
        <div className={`${sectionPrefix}-phone-number-2-container`}>
          <BaseInput
            form={form}
            id={`phone2`}
            label="İkinci Telefon Numarasi"
            name={`phone2`}
            type='text'
          />
        </div>
        <div className={`${sectionPrefix}-address-container`}>
          <BaseInput
            form={form}
            id={`address`}
            isTextarea={true}
            label="Adres"
            name={`address`}
            rules={{
              required: 'Adres alani zorunludur.',
            }}
            type={'text'}
          />
        </div>
        <div className={`${sectionPrefix}-address-detail-container`}>
          <BaseInput
            containerClassName="mt-6"
            form={form}
            id={`address-detail`}
            isTextarea={true}
            label="Adres Tarifi"
            name={`address-detail`}
            type={'text'}
          />
        </div>
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
