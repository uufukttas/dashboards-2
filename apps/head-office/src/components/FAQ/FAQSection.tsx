import { Button } from 'primereact/button';
import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import useModalManager from '../../hooks/useModalManager';
import { BaseTable } from '../BaseTable/BaseTable';
import AddFAQModal from './AddFAQModal';
import { FAQS_TABLE_COLUMNS } from './FAQ.constant';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import ConfirmationModal from '../Modals/ConfirmationModal';

const FAQSection: React.FC = () => {
    const sectionPrefix: string = `${BRAND_PREFIX}-faq`;
    const { openModal } = useModalManager();
    const faqs = [
        {
            question: 'Question 1',
            answer: 'Answer 1',
            category: 'Category 1',
            id: 1,
        },
    ];

    const actionColumn = () => {
        return (
            <div className={`${sectionPrefix}-data-table-actions-button-container flex justify-center items-start`}>
                <a
                    className="font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
                    onClick={() => {
                        openModal('editProductModal', <AddFAQModal />);
                    }}
                >
                    <FaPen className="text-primary" />
                </a>
                <a
                    className="font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
                    onClick={() => {
                        openModal('deleteProductModal', <ConfirmationModal name={'confirmationModal'} onConfirm={() => { }} />);
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

    return (
        <BaseTable
            columns={FAQS_TABLE_COLUMNS.map((column) => {
                if (column.accessor === 'actions') {
                    column.bodyTemplate = actionColumn as any;
                }

                return column;
            })}
            data={faqs}
            id={`${BRAND_PREFIX}-marketplace-table`}
            tableHeader={tableHeader}
        />
    );
};

export default FAQSection;
