'use client';

import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import React from 'react';
import { userInfo } from '../src/constants/constants';
import useThemeColors from '../src/hooks/useThemeColors';
import MainClient from './main/MainClient';
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
