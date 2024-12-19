import { IKnowledgeBase } from 'apps/head-office/app/api/services/knowledge,base/knowledgebase.interface';
import { Button } from 'primereact/button';
import React from 'react';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import {
  useGetKnowledgeBaseCategoryListQuery,
  useGetKnowledgeBaseListQuery,
  useRemoveKnowledgeBaseMutation,
} from '../../../app/api/services/knowledge,base/knowledgebase.service';
import { BRAND_PREFIX } from '../../constants/constants';
import useModalManager from '../../hooks/useModalManager';
import { BaseTable } from '../BaseTable/BaseTable';
import ConfirmationModal from '../Modals/ConfirmationModal';
import AddFAQModal from './AddFAQModal';
import { FAQS_TABLE_COLUMNS } from './FAQ.constant';

const FAQSection: React.FC = () => {
  const sectionPrefix: string = `${BRAND_PREFIX}-faq`;
  const { openModal, closeModal } = useModalManager();
  const { data: faqs, isLoading } = useGetKnowledgeBaseListQuery({});
  const { data: categories } = useGetKnowledgeBaseCategoryListQuery({});
  const [removeKnowledgeBase] = useRemoveKnowledgeBaseMutation();

  const handleEditFAQ = (faq: IKnowledgeBase) => {
    openModal('editFAQModal', <AddFAQModal faqData={faq} />);
  };

  const handleDeleteFAQ = (faq: IKnowledgeBase) => {
    openModal(
      'deleteFAQModal',
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
              closeModal('deleteFAQModal');
            });
        }}
      />,
    );
  };

  const actionColumn = (faq: IKnowledgeBase) => {
    return (
      <div className={`${sectionPrefix}-data-table-actions-button-container flex justify-center items-start`}>
        <a
          className="font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
          onClick={() => {
            handleEditFAQ(faq);
          }}
        >
          <FaPen className="text-primary" />
        </a>
        <a
          className="font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
          onClick={() => {
            handleDeleteFAQ(faq);
          }}
        >
          <FaTrashCan className="text-red-500" />
        </a>
      </div>
    );
  };

  const tableHeader = (): React.JSX.Element => {
    return (
      <div className="">
        <Button
          className={`${BRAND_PREFIX}-table-header-add-button flex justify-center items-center bg-primary text-primary-font-color rounded text-base font-semibold hover:bg-primary-lighter p-2`}
          icon="pi pi-plus text-white"
          id={`${BRAND_PREFIX}-table-header-add-button`}
          rounded
          type="button"
          onClick={() => {
            openModal('addFAQModal', <AddFAQModal />);
          }}
        />
      </div>
    );
  };

  const categoryColumn = (row: IKnowledgeBase) => {
    const category = categories?.find((category) => category.rid === row?.knowledgeBaseCategoryRID);
    if (category) {
      return `${category?.name} - ${category?.description}`;
    }
    return '-';
  };

  return (
    <div className={`${sectionPrefix}-container w-full`}>
      <BaseTable
        columns={FAQS_TABLE_COLUMNS.map((column) => {
          if (column.accessor === 'actions') {
            column.bodyTemplate = actionColumn as unknown as React.ReactElement;
          }
          if (column.accessor === 'category') {
            column.bodyTemplate = categoryColumn as unknown as React.ReactElement;
          }
          return column;
        })}
        data={faqs || []}
        isLoading={isLoading}
        id={`${BRAND_PREFIX}-marketplace-table`}
        tableHeader={tableHeader}
        className={`${sectionPrefix}-table w-full`}
      />
    </div>
  );
};

export default FAQSection;
