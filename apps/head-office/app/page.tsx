'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { detectDevice } from '@projects/common'
import Background from '../src/components/Background/Background';
import Card from '../src/components/Card/Card';
import './page.css';

const Index = () => {
  const [isDetectedDevice, setIsDetectedDevice] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsDetectedDevice(true);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    router.push('/dashboards')
  }

  return (
    isDetectedDevice &&
    <div className={`w-full flex items-center h-screen`}>
      <Card className={detectDevice().isDesktop ? 'w-1/4' : 'w-full'} onClick={handleClick} />
      <Background className={detectDevice().isDesktop ? 'w-3/4' : 'hidden'} />
    </div>
  );
};

export default Index;
