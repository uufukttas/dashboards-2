import React from 'react';
import Image from 'next/image';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

const CardFooter: React.FC = () => {
  const loginPrefix: string = `${BRAND_PREFIX}-login-card-footer`;

  return (
    <div className={`${loginPrefix}-text-container flex justify-center items-center w-full`}>
      <p className={`${loginPrefix}-text italic text-center text-sm text-text px-2`}>Powered by</p>
      <Image alt="logo" className={`${loginPrefix}-evs-logo`} height={20} src="/evslogo.jpg" width={20} />
    </div>
  );
};

export default CardFooter;
