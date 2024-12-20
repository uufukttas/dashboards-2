import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IKnowledgeBase } from '../../../app/api/services/knowledgebase/knowledgebase.interface';
import {
    useEditKnowledgeBaseMutation,
    useGetKnowledgeBaseCategoryListQuery,
    useRemoveKnowledgeBaseMutation,
} from '../../../app/api/services/knowledgebase/knowledgebase.service';
import useModalManager from '../../hooks/useModalManager';
import ModalLayout from '../Modal/Layouts/ModalLayout';
import { IModalLayoutButtonProps } from '../Modal/Layouts/ModalLayout.interface';
import ConfirmationModal from '../Modals/ConfirmationModal';
import FAQForm from './FAQForm';

interface IFAQDetailModalProps {
  faq: IKnowledgeBase;
}

const FAQDetailModal = ({ faq }: IFAQDetailModalProps) => {
  const { closeModal, openModal } = useModalManager();
  const form = useForm();
  const { data: categories } = useGetKnowledgeBaseCategoryListQuery({});
  const [removeKnowledgeBase] = useRemoveKnowledgeBaseMutation();
  const [editKnowledgeBase] = useEditKnowledgeBaseMutation();

  const handleDelete = () => {
    openModal(
      'confirmationModal',
      <ConfirmationModal
        name={'confirmationModal'}
        onConfirm={() => {
          removeKnowledgeBase({
            body: {
              knowledgebaseId: faq.rid,
            },
          })
            .unwrap()
            .then(() => {
              closeModal('confirmationModal');
              closeModal('faqDetailModal');
            });
        }}
      />,
    );
  };

  const handleEdit = () => {
    editKnowledgeBase({
      body: {
        rid: faq.rid,
        question: form.getValues('question'),
        answer: form.getValues('answer'),
        knowledgeBaseCategoryRID: form.getValues('category') || faq.knowledgeBaseCategoryRID,
      },
    })
      .unwrap()
      .then(() => {
        closeModal('faqDetailModal');
      });
  };

  const buttons: IModalLayoutButtonProps[] = [
    {
      key: 'delete',
      label: 'Sil',
      onClick: handleDelete,
      buttonClassName: 'bg-red-500 text-white ml-2',
    },
    {
      key: 'edit',
      label: 'Düzenle',
      onClick: handleEdit,
      buttonClassName: 'bg-primary text-white ml-4',
    },
  ];

  useEffect(() => {
    form.reset({
      category: faq.knowledgeBaseCategoryRID,
      question: faq.question,
      answer: faq.answer,
    });
  }, [faq]);

  return (
    <ModalLayout name="faqDetailModal" title={`${faq.question}`} buttons={buttons} footerVisible>
      <FAQForm form={form} categories={categories} faqData={faq} sectionPrefix="faq" />
    </ModalLayout>
  );
};

export default FAQDetailModal;
