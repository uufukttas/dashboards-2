import React from 'react';
import TableHead from './TableHead';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { BRAND_PREFIX } from '../../constants/constants';
import './Table.css';

interface IServicePointInfoProps {
  id: number;
  name: string;
  type?: string | null | undefined;
  longitude: number;
  latitude: number;
  phone?: string | null | undefined;
  address: string;
  cityId: number;
  districtId: number;
  opportunities?: string[] | null | undefined;
  freePark?: string | null | undefined;
  paymentMethods?: string[] | null | undefined;
};
interface ITableoProps {
  deletedServicePointId: number;
  servicePoints: IServicePointInfoProps[];
  setDeletedServicePointId: (deletedServicePointId: number) => void;
};

export function Table({
  deletedServicePointId,
  servicePoints,
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
            servicePoints={servicePoints}
            setDeletedServicePointId={setDeletedServicePointId}
          />
        </table>
      </div>
    </div>
  );
};

export default Table;
