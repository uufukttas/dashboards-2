import React from 'react';
import TableBody from './TableComponents/TableBody';
import TableHead from './TableComponents/TableHead';
import TableHeader from './TableComponents/TableHeader';
import { BRAND_PREFIX } from '../../constants/constants';
import './Table.css';

const Table: React.FC = () => {
  return (
    <div className={`${BRAND_PREFIX}-service-points-table-container relative overflow-x-auto shadow-md max-w-[330px] md:max-w-full w-full border-2 border-gray-200`}>
      <TableHeader />
      <div className={`${BRAND_PREFIX}-service-points-table-content-container border-r-0 border-l-0`}>
        <table className={`${BRAND_PREFIX}-service-points-table w-full text-sm text-left rtl:text-right text-gray-500`}>
          <TableHead />
          <TableBody />
        </table>
      </div>
    </div>
  );
};

export default Table;
