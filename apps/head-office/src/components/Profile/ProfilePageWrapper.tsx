import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileSection from './ProfileSection';
import Loading from '../Loading/Loading';
import MainComponent from '../MainComponent/MainComponent';
import { BRAND_PREFIX, stylesProps, userInfo } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { RootState, AppDispatch } from '../../../app/redux/store';

const Profile: React.FC = () => {
  const pagePrefix: string = `${BRAND_PREFIX}-profile-page`;

  return (
    <div className={`${pagePrefix}-wrapper w-full flex h-screen`}>
      <MainComponent headerName={`Hoşgeldin, ${userInfo.name}`}>
        <div
          className={`${pagePrefix}-container justify-center items-center md:pt-6 flex-wrap w-full`}
        >
          <ProfileSection />
        </div>
      </MainComponent>
    </div>
  );
};

export default Profile;
