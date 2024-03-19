import React from 'react';
import TableHead from './TableHead';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { BRAND_PREFIX } from '../../constants/constants';
import './Table.css';

interface ITableoProps {
  deletedServicePointId: number;
  setDeletedServicePointId: (deletedServicePointId: number) => void;
};

export function Table({
  deletedServicePointId,
  setDeletedServicePointId
}: ITableoProps) {
  return (
    <div className={`${BRAND_PREFIX}-table-container relative overflow-x-auto shadow-md max-w-[330px] md:max-w-full w-full`}>
      <TableHeader />
      <div className={`${BRAND_PREFIX}-table-content-container`}>
        <table className={`${BRAND_PREFIX}-table w-full text-sm text-left rtl:text-right text-gray-500`}>
          <TableHead />
          <TableBody
            deletedServicePointId={deletedServicePointId}
            setDeletedServicePointId={setDeletedServicePointId}
          />
        </table>
      </div>
    </div>
  );
};

export default Table;
