'use client'

import React, { useEffect, useState } from 'react';
import { detectDevice } from '@projects/common'
import Background from '../src/components/Background/Background';
import Card from '../src/components/Card/Card';
import './page.css';

const Index = () => {
  const [isDetectedDevice, setIsDetectedDevice] = useState(false);

  useEffect(() => {
    setIsDetectedDevice(true);
  }, []);

  return (
    isDetectedDevice &&
    <div className={`w-full flex items-center h-screen`}>
      <Card className={detectDevice().isDesktop ? 'w-1/4' : 'w-full'} />
      <Background className={detectDevice().isDesktop ? 'w-3/4' : 'hidden'}/>
    </div>
  );
};

export default Index;
