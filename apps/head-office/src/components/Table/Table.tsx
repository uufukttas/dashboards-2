import React from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';
import TableHeader from './TableHeader';
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
  servicePoints: IServicePointInfoProps[];
};

export function Table({ servicePoints }: ITableoProps) {
  return (
    <div className={`${BRAND_PREFIX}-service-points-table-wrapper relative overflow-x-auto shadow-md max-w-[330px] md:max-w-full w-full`}>
      <TableHeader />
      <div className={`${BRAND_PREFIX}-service-points-table-container`}>
        <table className={`${BRAND_PREFIX}-service-points-table w-full text-sm text-left rtl:text-right text-gray-500`}>
          <TableHead />
          <TableBody
            servicePoints={servicePoints}
          />
        </table>
      </div>
    </div>
  );
};

export default Table;
