'use client';

import React from 'react';
import MainClient from './main/MainClient';
import { stylesProps, userInfo } from '../src/constants/constants';
import useThemeColors from '../src/hooks/useThemeColors';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './page.css';

const MainPage: React.FC = () => {
  
  useThemeColors(stylesProps)

  return (
    <div className={`${userInfo.company}-head-office w-full flex items-center justify-center`}>
      <MainClient />
    </div>
  );
};

export default MainPage;
