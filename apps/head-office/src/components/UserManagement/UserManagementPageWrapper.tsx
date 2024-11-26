import React from 'react';
import UserManagementSection from '../../../src/components/UserManagement/UserManagementSection';
import { BRAND_PREFIX } from '../../constants/constants';
import MainComponent from '../MainComponent/MainComponent';

const UserManagement: React.FC = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-user-management-page`;

  return (
    <div className={`${pagePrefix}-wrapper w-full flex h-screen`}>
      <MainComponent headerName="Kullanıcı Yönetimi">
        <div className={`${pagePrefix}-container w-full justify-center items-center md:pt-6 flex-wrap`}>
          <UserManagementSection />
        </div>
      </MainComponent>
    </div>
  );
};

export default UserManagement;
