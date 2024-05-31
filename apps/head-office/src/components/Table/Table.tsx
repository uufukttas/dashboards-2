import React from 'react';
import TableBody from './TableComponents/TableBody';
import TableHead from './TableComponents/TableHead';
import TableHeader from './TableComponents/TableHeader';
import { BRAND_PREFIX } from '../../constants/constants';
import type { ITableProps } from './types';
import './Table.css';

const Table: React.FC<ITableProps> = ({
  attributeName, filteredDropdownItems, searchedText, tableData, tableDataCount, tableHeadData, setSearchedText
}: ITableProps) => {
  const tablePrefix: string = `${BRAND_PREFIX}-table`;

  return (
    <div className={`${tablePrefix}-container relative overflow-x-auto shadow-md max-w-[330px] md:max-w-full w-full border-2 border-gray-200`}>
      <TableHeader
        attributeName={attributeName}
        filteredDropdownItems={filteredDropdownItems}
        searchedText={searchedText}
        setSearchedText={setSearchedText}
      />
      <div className={`${tablePrefix}-content-container border-r-0 border-l-0`}>
        <table className={`${tablePrefix} w-full text-sm text-left rtl:text-right text-gray-500`}>
          <TableHead tableHeadData={tableHeadData} />
          <TableBody
            attributeName={attributeName}
            tableData={tableData}
            tableDataCount={tableDataCount}
          />
        </table>
      </div>
    </div>
  );
};

export default Table;
