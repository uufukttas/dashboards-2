'use client';

import React, { useEffect, useState } from 'react';
import MainClient from './main/MainClient';
import { getColorsRequest } from '../app/api/profile';
import { stylesProps, userInfo } from '../src/constants/constants';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './page.css';

interface ILanguageProps {
  id: null;
  name: string;
  rid: number;
}

const MainPage: React.FC = () => {
  const [colors, setColors] = useState([
    {
      id: null,
      name: 'Primary',
      value: '',
    },
    {
      id: null,
      name: 'Secondary',
      value: '',
    },
  ]);
  const primaryColor = colors?.[0]?.value || stylesProps.primaryColor;
  const secondaryColor = colors?.[1]?.value || stylesProps.secondaryColor;

  useEffect(() => {
    getColorsRequest(['Primary', 'Secondary', 'Alternate', 'Backup']).then((response) => {
      setColors(response);
    });
  }, []);

  return (
    <div
      className={`${userInfo.company}-head-office w-full flex items-center justify-center`}
      style={
        {
          '--primary-color': primaryColor,
          '--secondary-color': secondaryColor,
        } as React.CSSProperties
      }
    >
      <MainClient />
    </div>
  );
};

export default MainPage;
