import { Button } from 'primereact/button';
import React from 'react';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import { IKnowledgeBase } from '../../../app/api/services/knowledge,base/knowledgebase.interface';
import {
  useGetKnowledgeBaseCategoryListQuery,
  useGetKnowledgeBaseListQuery,
  useRemoveKnowledgeBaseMutation,
} from '../../../app/api/services/knowledge,base/knowledgebase.service';
import { BRAND_PREFIX } from '../../constants/constants';
import useModalManager from '../../hooks/useModalManager';
import { BaseTable } from '../BaseTable/BaseTable';
import ConfirmationModal from '../Modals/ConfirmationModal';
import AddFAQCategoryModal from './AddFAQCategoryModal';
import AddFAQModal from './AddFAQModal';
import { FAQS_TABLE_COLUMNS } from './FAQ.constant';
import FAQDetailModal from './FAQDetailModal';

const FAQSection: React.FC = () => {
  const sectionPrefix: string = `${BRAND_PREFIX}-faq`;
  const { openModal } = useModalManager();
  const { data: faqs, isLoading } = useGetKnowledgeBaseListQuery({});
  const { data: categories } = useGetKnowledgeBaseCategoryListQuery({});
  const [removeKnowledgeBase] = useRemoveKnowledgeBaseMutation();

  const handleEditFAQ = (faq: IKnowledgeBase) => openModal('editFAQModal', <AddFAQModal faqData={faq} />);

  const handleDeleteFAQ = (faq: IKnowledgeBase) => {
    openModal(
      'confirmationModal',
      <ConfirmationModal
        name={'confirmationModal'}
        onConfirm={() => {
          removeKnowledgeBase({
            body: {
              knowledgebaseId: faq.rid,
            },
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
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleEditFAQ(faq);
          }}
        >
          <FaPen className="text-primary" />
        </a>
        <a
          className="font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleDeleteFAQ(faq);
          }}
        >
          <FaTrashCan className="text-red-500" />
        </a>
      </div>
    );
  };

  const handleAddFAQCategory = () => {
    openModal('addFAQCategoryModal', <AddFAQCategoryModal />);
  };

  const tableHeader = (): React.JSX.Element => {
    return (
      <div className="flex justify-end items-center gap-2 ">
        <Button
          className={`${BRAND_PREFIX}-table-header-add-button text-white text-sm flex justify-center items-center bg-primary text-primary-font-color rounded hover:bg-primary-lighter p-2`}
          icon="pi pi-plus text-white"
          id={`${BRAND_PREFIX}-table-header-add-button`}
          rounded
          type="button"
          onClick={() => {
            openModal('addFAQModal', <AddFAQModal />);
          }}
          label="Sıkça Sorulan Soru Ekle"
        />
        <Button
          className={`${BRAND_PREFIX}-table-header-add-button text-white text-sm flex justify-center items-center bg-primary text-primary-font-color rounded hover:bg-primary-lighter p-2`}
          icon="pi pi-plus text-white"
          id={`${BRAND_PREFIX}-table-header-add-button`}
          rounded
          type="button"
          onClick={handleAddFAQCategory}
          label="Sıkça Sorulan Soru Kategorisi Ekle"
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

  const handleRowClick = ({ rowData }: { rowData: IKnowledgeBase }) => {
    openModal('faqDetailModal', <FAQDetailModal faq={rowData} />);
  };

  return (
    <div className={`${sectionPrefix}-container w-full`}>
      <BaseTable
        columns={FAQS_TABLE_COLUMNS.map((column) => {
          if (column.accessor === 'actions') {
            // @ts-expect-error
            column.bodyTemplate = actionColumn as unknown as React.ReactElement;
          }
          if (column.accessor === 'category') {
            // @ts-expect-error
            column.bodyTemplate = categoryColumn as unknown as React.ReactElement;
          }
          return column;
        })}
        // @ts-expect-error
        data={faqs || []}
        isLoading={isLoading}
        id={`${BRAND_PREFIX}-marketplace-table`}
        tableHeader={tableHeader}
        className={`${sectionPrefix}-table w-full`}
        // @ts-expect-error
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default FAQSection;
