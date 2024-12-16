'use client';

import React from 'react';
import MainClient from './main/MainClient';
import { userInfo } from '../src/constants/constants';
import useThemeColors from '../src/hooks/useThemeColors';
import './page.css';

const MainPage: React.FC = () => {
  useThemeColors();

  return (
    <div className={`${userInfo.company}-head-office w-full flex items-center justify-center`}>
      <MainClient />
    </div>
  );
};

export default MainPage;
