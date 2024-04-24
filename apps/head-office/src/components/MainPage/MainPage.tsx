import Header from '../Header/Header';
import Section from '../Section/Section';
import Sidebar from '../Sidebar/Sidebar';
import { BRAND_PREFIX } from '../../constants/constants';
import type { IMainPageProps } from './types';
import './MainPage.css';

const MainPage: React.FC<IMainPageProps> = ({ children }: IMainPageProps) => {
  return (
    <div className={`${BRAND_PREFIX}-page-wrapper w-full flex`}>
      <Sidebar />
      <div className={`${BRAND_PREFIX}-page-container bg-white overflow-x-hidden no-scrollbar`}>
        <Header className={`h-[80px] flex items-center w-full`} />
        <Section sectionName='Servis Noktalari'>
          {children}
        </Section>
      </div>
    </div>
  );
};

export default MainPage;
