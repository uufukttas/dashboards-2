'use client';

import Header from '../Header/Header';
import Section from '../Section/Section';
import Sidebar from '../Sidebar/Sidebar';
import { BRAND_PREFIX } from '../../constants/constants';
import type { IMainPageProps } from './types';
import './MainPage.css';

const MainPage: React.FC<IMainPageProps> = ({ children, sectionName }: IMainPageProps) => {
  const pagePrefix = `${BRAND_PREFIX}-page`;

  return (
    <div className={`${pagePrefix}-wrapper w-full flex`}>
      <Sidebar />
      <div className={`${pagePrefix}-container bg-white overflow-x-hidden no-scrollbar`}>
        <Header className={`h-[80px] flex items-center w-full`} />
        <Section sectionName={sectionName}>
          {children}
        </Section>
      </div>
    </div>
  );
};

export default MainPage;
