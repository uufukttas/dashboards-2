import { IKnowledgeBase } from 'apps/head-office/app/api/services/knowledge,base/knowledgebase.interface';
import {
  useGetKnowledgeBaseCategoryListQuery,
  useRemoveKnowledgeBaseMutation,
} from 'apps/head-office/app/api/services/knowledge,base/knowledgebase.service';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
      onClick: () => {
        closeModal('faqDetailModal');
      },
      buttonClassName: 'bg-primary text-white ml-4',
    },
  ];

  useEffect(() => {
    form.reset(faq);
  }, [faq]);

  return (
    <ModalLayout name="faqDetailModal" title={`${faq.question}`} buttons={buttons} footerVisible>
      <FAQForm form={form} categories={categories} faqData={faq} sectionPrefix="faq" />
    </ModalLayout>
  );
};

export default FAQDetailModal;
