'use client';

import React from 'react';
import { getLanguageListRequest } from './api/login';
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
};

const MainPage: React.FC = async () => {
  const { colors } = await getColorsRequest(['Primary', 'Secondary', 'Alternate', 'Backup']);
  const languageList = await getLanguageListRequest();
  const primaryColor = colors?.[0]?.value || stylesProps.primaryColor;
  const secondaryColor = colors?.[1]?.value || stylesProps.secondaryColor;
  const updatedLanguages = languageList.map((language: ILanguageProps) => ({
    id: null,
    name: language.name,
    rid: language.rid,
  }));

  return (
    <div
      className={`${userInfo.company}-head-office w-full flex items-center justify-center`}
      style={{
        '--primary-color': primaryColor,
        '--secondary-color': secondaryColor,
      } as React.CSSProperties}
    >
      <MainClient languageList={updatedLanguages} />
    </div>
  );
};

export default MainPage;
