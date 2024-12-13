import { Button } from 'primereact/button';
import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import useModalManager from '../../hooks/useModalManager';
import { BaseTable } from '../BaseTable/BaseTable';
import AddProductModal from './AddProductModal';
import { MARKETPLACE_TABLE_COLUMNS } from './MarketPlace.constant';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import ConfirmationModal from '../Modals/ConfirmationModal';

const MarketPlaceSection: React.FC = () => {
  const sectionPrefix: string = `${BRAND_PREFIX}-marketplace`;
  const { openModal } = useModalManager();
  const products = [
    {
      productName: 'Product 1',
      productCategory: 'Category 1',
      productPrice: 100,
      rid: 1,
      stockCount: 10,
    },
  ];

  const actionColumn = () => {
    return (
      <div className={`${sectionPrefix}-data-table-actions-button-container flex justify-center items-start`}>
        <a
          className="font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
          onClick={() => {
            openModal('editProductModal', <AddProductModal />);
          }}
        >
          <FaPen className="text-primary" />
        </a>
        <a
          className="font-medium cursor-pointer hover:scale-125 mx-4 transition-transform duration-300 ease-in-out"
          onClick={() => {
            openModal('deleteProductModal', <ConfirmationModal name={'confirmationModal'} onConfirm={() => {}} />);
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
          className={`${BRAND_PREFIX}-table-header-a  dd-button flex justify-center items-center bg-primary text-primary-font-color rounded text-base font-semibold hover:bg-primary-lighter p-2`}
          icon="pi pi-plus text-white"
          id={`${BRAND_PREFIX}-table-header-add-button`}
          rounded
          type="button"
          onClick={() => {
            openModal('addProductModal', <AddProductModal />);
          }}
        />
      </div>
    );
  };

  return (
    <BaseTable
      columns={MARKETPLACE_TABLE_COLUMNS.map((column) => {
        if (column.accessor === 'actions') {
          column.bodyTemplate = actionColumn as any;
        }

        return column;
      })}
      data={products}
      id={`${BRAND_PREFIX}-marketplace-table`}
      tableHeader={tableHeader}
    />
  );
};

export default MarketPlaceSection;
