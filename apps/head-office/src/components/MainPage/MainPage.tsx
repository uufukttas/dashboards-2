import Header from "../Header/Header";
import Section from "../Section/Section";
import Sidebar from "../Sidebar/Sidebar";
import './MainPage.css';

interface IMainPageProps {
  children?: React.ReactNode;
};

const MainPage = ({ children }: IMainPageProps) => {
  return (
    <div className="sh-page-wrapper w-full h-screen flex">
      <Sidebar />
      <div className="sh-page-container h-screen bg-white overflow-x-hidden no-scrollbar">
        <Header className={`h-[80px] flex items-center w-full`} />
        <Section>
          {children}
        </Section>
      </div>
    </div>
  );
};

export default MainPage;
