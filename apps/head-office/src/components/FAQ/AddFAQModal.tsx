import { IKnowledgeBase } from 'apps/head-office/app/api/services/knowledge,base/knowledgebase.interface';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useAddNewKnowledgeBaseMutation,
  useEditKnowledgeBaseMutation,
  useGetKnowledgeBaseCategoryListQuery,
} from '../../../app/api/services/knowledge,base/knowledgebase.service';
import { BRAND_PREFIX } from '../../constants/constants';
import useModalManager from '../../hooks/useModalManager';
import ModalLayout from '../Modal/Layouts/ModalLayout';
import { IModalLayoutButtonProps } from '../Modal/Layouts/ModalLayout.interface';
import AddFAQCategoryModal from './AddFAQCategoryModal';
import FAQForm from './FAQForm';

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
      <FAQForm form={form} categories={categories} faqData={faqData} sectionPrefix={sectionPrefix} />
    </ModalLayout>
  );
};

export default AddFAQModal;
