import React from 'react';
import TableBody from './TableComponents/TableBody';
import TableHead from './TableComponents/TableHead';
import TableHeader from './TableComponents/TableHeader';
import { BRAND_PREFIX } from '../../constants/constants';
import type { ITableProps } from './types';
import './Table.css';

export function Table({ servicePoints }: ITableProps) {
  return (
    <div className={`${BRAND_PREFIX}-service-points-table-wrapper relative overflow-x-auto shadow-md max-w-[330px] md:max-w-full w-full`}>
      <TableHeader />
      <div className={`${BRAND_PREFIX}-service-points-table-container`}>
        <table className={`${BRAND_PREFIX}-service-points-table w-full text-sm text-left rtl:text-right text-gray-500`}>
          <TableHead />
          <TableBody servicePoints={servicePoints} />
        </table>
      </div>
    </div>
  );
};

export default Table;
