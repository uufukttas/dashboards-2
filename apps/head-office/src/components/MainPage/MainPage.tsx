import Header from '../Header/Header';
import Section from '../Section/Section';
import Sidebar from '../Sidebar/Sidebar';
import { BRAND_PREFIX } from '../../constants/constants';
import './MainPage.css';

interface IMainPageProps {
  children: React.ReactNode;
};

const MainPage = ({ children }: IMainPageProps) => {
  return (
    <div className={`${BRAND_PREFIX}-page-wrapper w-full flex`}>
      <Sidebar />
      <div className={`${BRAND_PREFIX}-page-container bg-white overflow-x-hidden no-scrollbar`}>
        <Header className={`h-[80px] flex items-center w-full`} />
        <Section>
          {children}
        </Section>
      </div>
    </div>
  );
};

export default MainPage;
