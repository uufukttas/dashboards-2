import React, { FC } from 'react';
import { BRAND_PREFIX } from '../../../../../src/constants/constants';
import { ICommissionTableHeaderItemProps } from '../../types';

const ComissionTableHeader: FC = () => {
  const sectionPrefix: string = `${BRAND_PREFIX}-comission-details-header`;
  const headers: ICommissionTableHeaderItemProps[] = [
    { label: 'Hizmet Nok. / Reseller' },
    { label: 'Cihaz Yatirimcisi' },
    { label: 'Komisyon Türü' },
    { label: 'Yuzde Değeri' },
    { label: 'İşlemler' },
  ];

  return (
    <div className={`${sectionPrefix}-container flex w-full text-center`}>
      {headers.map((header: ICommissionTableHeaderItemProps, idx: number) => (
        <div
          className={`${sectionPrefix}-item-container flex justify-between md:items-center flex-col md:flex-row w-full`}
          key={idx}
        >
          <p className={`${sectionPrefix}-item-value text-lg font-bold w-full`}>{header.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ComissionTableHeader;
