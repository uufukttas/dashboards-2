import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BRAND_PREFIX } from '../../constants/constants';
import BaseInput from '../Base/BaseInput';
import BaseSelect from '../Base/BaseSelect';
import ModalLayout from '../Modal/Layouts/ModalLayout';

const AddFAQModal: React.FC = () => {
  const sectionPrefix: string = `${BRAND_PREFIX}-add-faq-modal`;
  const [faqInfo, setFaqInfo] = useState({});
  const form = useForm();

  const handleFormSubmit = () => {
    console.log('Form submitted', faqInfo);
  };

  return (
    <ModalLayout className="w-full" id={`${sectionPrefix}-modal`} name={'AddFAQModal'} title="Ürün Ekle">
      <div className={`${sectionPrefix}-form-container w-full`}>
        <form className={`${sectionPrefix}-form`} onSubmit={form.handleSubmit(handleFormSubmit)}>
          <BaseInput
            form={form}
            id={`${sectionPrefix}-question`}
            label="Soru"
            name="question"
            placeholder="Soru"
            type="text"
            onChange={(e) => setFaqInfo({ ...faqInfo, question: e.target.value })}
          />
          <BaseInput
            form={form}
            id={`${sectionPrefix}-answer`}
            label="Cevap"
            name="answer"
            placeholder="Cevap"
            type="text"
            onChange={(e) => setFaqInfo({ ...faqInfo, answer: e.target.value })}
          />
          <BaseSelect
            form={form}
            id={`${sectionPrefix}-category`}
            items={[
              { label: 'Kategori 1', value: '1' },
              { label: 'Kategori 2', value: '2' },
              { label: 'Kategori 3', value: '3' },
            ]}
            label="Kategori"
            name="category"
            onChange={(e) => setFaqInfo({ ...faqInfo, category: e.target.value })}
          />
          <Button
            className={`${BRAND_PREFIX}-button my-8 bg-primary text-primary-font-color rounded-lg text-base font-semibold w-full py-2`}
            id={`${sectionPrefix}-add-button`}
            label="Soru-Cevap Ekle"
            rounded
            type="submit"
          />
        </form>
      </div>
    </ModalLayout>
  );
};

export default AddFAQModal;
