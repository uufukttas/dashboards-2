import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';

const ListHeader: React.FC<{ name: string; onClick: () => void }> = ({ name, onClick }) => (
  <button
    className={`${BRAND_PREFIX}-device-management-menu-item-container w-full h-full flex justify-between items-center min-h-[50px] px-4 cursor-pointer bg-blue-400`}
    onClick={onClick}
  >
    <span className="px-8">{name}</span>
    <i className="pi pi-plus" />
  </button>
);

export default ListHeader;
