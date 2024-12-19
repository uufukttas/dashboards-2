import { Button } from '@projects/button';
import { IKnowledgeBase } from 'apps/head-office/app/api/services/knowledge,base/knowledgebase.interface';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa6';
import {
  useAddNewKnowledgeBaseMutation,
  useEditKnowledgeBaseMutation,
  useGetKnowledgeBaseCategoryListQuery,
} from '../../../app/api/services/knowledge,base/knowledgebase.service';
import { BRAND_PREFIX } from '../../constants/constants';
import useModalManager from '../../hooks/useModalManager';
import BaseInput from '../Base/BaseInput';
import BaseSelect from '../Base/BaseSelect';
import ModalLayout from '../Modal/Layouts/ModalLayout';
import { IModalLayoutButtonProps } from '../Modal/Layouts/ModalLayout.interface';
import AddFAQCategoryModal from './AddFAQCategoryModal';

interface IAddFAQModalProps {
  faqData?: IKnowledgeBase;
}

const AddFAQModal: React.FC<IAddFAQModalProps> = ({ faqData }) => {
  const sectionPrefix: string = `${BRAND_PREFIX}-add-faq-modal`;
  const { data: categories } = useGetKnowledgeBaseCategoryListQuery({});
  const [addNewKnowledgeBase] = useAddNewKnowledgeBaseMutation();
  const [editKnowledgeBase] = useEditKnowledgeBaseMutation();

  const form = useForm();
  const { openModal, closeModal } = useModalManager();

  const handleFormSubmit = (data: any) => {
    const categoryId = categories?.find((category) => category.name === data.category);

    if (faqData) {
      editKnowledgeBase({ body: { ...data, knowledgeBaseCategoryRID: categoryId?.rid, rid: faqData.rid } })
        .unwrap()
        .then(() => {
          closeModal('addFAQModal');
        });
      return;
    }
    addNewKnowledgeBase({ body: { ...data, knowledgeBaseCategoryRID: categoryId?.rid } })
      .unwrap()
      .then(() => {
        closeModal('addFAQModal');
      });
  };

  const buttons: IModalLayoutButtonProps[] = [
    {
      key: `${sectionPrefix}-add-button`,
      label: 'Kaydet',
      onClick: form.handleSubmit(handleFormSubmit),
    },
  ];

  const handleAddCategory = () => {
    openModal('addFAQCategoryModal', <AddFAQCategoryModal />);
  };

  useEffect(() => {
    if (faqData) {
      form.setValue('question', faqData.question);
      form.setValue('answer', faqData.answer);
      form.setValue('category', faqData.knowledgeBaseCategoryRID);
    }
  }, [faqData]);

  return (
    <ModalLayout
      className="w-full"
      id={`${sectionPrefix}-modal`}
      name={'AddFAQModal'}
      title="Sıkça Sorulan Soru Ekle"
      buttons={buttons}
      footerVisible
    >
      <div className={`${sectionPrefix}-form-container w-full`}>
        <BaseInput
          form={form}
          id={`${sectionPrefix}-question`}
          label="Soru"
          name="question"
          placeholder="Soru"
          type="text"
          rules={{ required: 'Soru boş bırakılamaz' }}
        />
        <BaseInput
          form={form}
          id={`${sectionPrefix}-answer`}
          label="Cevap"
          name="answer"
          placeholder="Cevap"
          type="text"
          rules={{ required: 'Cevap boş bırakılamaz' }}
        />
        <BaseSelect
          form={form}
          id={`${sectionPrefix}-category`}
          items={categories?.map((category) => ({ name: category.name, value: category.rid })) || []}
          label={'Kategori'}
          name={'category'}
          rules={{ required: 'Kategori boş bırakılamaz' }}
          defaultValue={faqData?.knowledgeBaseCategoryRID}
          value={faqData?.knowledgeBaseCategoryRID}
          labelPrefix={
            <Button
              onClick={handleAddCategory}
              type="button"
              id={`${sectionPrefix}-add-category-button`}
              className=" hover:bg-primary-lighter flex flex-row items-center justify-center p-0"
            >
              <FaPlus className="text-blue-700 text-sm" />
              <span className="text-blue-700 text-sm">Ekle</span>
            </Button>
          }
        />
      </div>
    </ModalLayout>
  );
};

export default AddFAQModal;
