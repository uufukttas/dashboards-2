import React from 'react';
import TableBody from './TableComponents/TableBody';
import TableHead from './TableComponents/TableHead';
import TableHeader from './TableComponents/TableHeader';
import { BRAND_PREFIX } from '../../constants/constants';
import type { ITableProps } from './types';
import './Table.css';

const Table: React.FC<ITableProps> = ({
  attributeName,
  className,
  filteredDropdownItems,
  hasFilterData,
  roleStyles,
  tableData,
  tableDataCount,
  tableHeader,
  tableHeadData,
  tablePlaceholderInitialValue,
}: ITableProps) => {
  const tablePrefix: string = `${BRAND_PREFIX}-table`;

  return (
    <div className={`${tablePrefix}-wrapper relative overflow-x-auto shadow-md max-w-[330px] md:max-w-full border-2 border-gray-200 ${className}`}>
      <TableHeader filteredDropdownItems={filteredDropdownItems} hasFilterData={hasFilterData}>
        {tableHeader}
      </TableHeader>
      <div className={`${tablePrefix}-container border-r-0 border-l-0`}>
        <table className={`${tablePrefix} w-full text-sm text-left rtl:text-right text-gray-500`}>
          <TableHead attributeName={attributeName} tableHeadData={tableHeadData} />
          <TableBody
            attributeName={attributeName}
            tableData={tableData}
            tableDataCount={tableDataCount}
            tablePlaceholderInitialValue={tablePlaceholderInitialValue}
            roleStyles={roleStyles}
          />
        </table>
      </div>
    </div>
  );
};

export default Table;
