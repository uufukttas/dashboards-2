import React from 'react';
import { IInfoColumnProps } from '../../types';

const InfoColumn: React.FC<IInfoColumnProps> = ({ children, className = '' }) => (
  <div className={`${className} flex justify-center md:items-center flex-col md:flex-row w-1/5`}>
    <p className={`${className}-text-lg font-normal`}>{children}</p>
  </div>
);

export default InfoColumn;
