import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import type { IFooterProps } from './types';
import './Footer.css';

const Footer: React.FC<IFooterProps> = ({ className }: IFooterProps) => {
  const footerPrefix: string = `${BRAND_PREFIX}-footer`;

  return (
    <div
      className={`${footerPrefix}-container w-full h-[40px] justify-between border-t border-gray-300 bg-background top-0 z-10 sticky ${className}`}
    >
      <div className={`${footerPrefix}-content w-full`}>
        <span className={`${footerPrefix}-content-text flex justify-end items-center px-8 text-xs`}>
          © 2024 - Tüm hakları saklıdır.
        </span>
      </div>
    </div>
  );
};

export default Footer;
