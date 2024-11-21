import { Button } from '@projects/button';
import React from 'react';
import { BRAND_PREFIX } from '../../constants/constants';
import useModalManager from '../../hooks/useModalManager';
import MainComponent from '../MainComponent/MainComponent';
import ModalLayout from '../Modal/Layouts/ModalLayout';
import DashboardSection from './DashboardSection';

const DashboardPageWrapper: React.FC = () => {
  const dashboardPrefix: string = `${BRAND_PREFIX}-dashboard`;
  const { openModal } = useModalManager();

  const handleOpenModal = () => {
    openModal(
      'modal',
      <ModalLayout
        name="modal"
        key={1}
        title="Modal Title"
        className=""
        buttons={[
          {
            key: 'close',
            label: 'Close',
            onClick: () => console.log('Close Button Clicked'),
          },
        ]}
      >
        Modal Content
      </ModalLayout>,
    );
  };

  return (
    <div className={`${dashboardPrefix}-page-wrapper w-full flex h-screen`}>
      <MainComponent headerName="Gösterge Paneli">
        <div className={`${dashboardPrefix}-page-container flex justify-center items-center flex-wrap w-full`}>
          <Button id="btn" type="button" buttonText="Show Modal" onClick={handleOpenModal}></Button>
          <DashboardSection />
        </div>
      </MainComponent>
    </div>
  );
};

export default DashboardPageWrapper;
