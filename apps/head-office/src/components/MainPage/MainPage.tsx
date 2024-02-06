import Header from "../Header/Header";
import Section from "../Section/Section";
import Sidebar from "../Sidebar/Sidebar";
import './MainPage.css'

interface MainPageProps {
  children?: React.ReactNode;
}

export function MainPage({ children }: MainPageProps) {
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className='sh-main-page-container h-screen bg-white'>
        <Header className={`h-[77px] flex items-center w-full`} />
        <Section>
          {children}
        </Section>
      </div>
    </div>
  );
}

export default MainPage;
