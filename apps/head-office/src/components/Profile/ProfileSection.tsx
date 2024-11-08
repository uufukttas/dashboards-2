import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@projects/card';
import BackgroundSection from './Sections/BackgroundSection';
import ColorSection from './Sections/ColorSection';
import InfoSection from './Sections/InfoSection';
import LoginInfoSection from './Sections/LoginInfoSection';
import LogoSection from './Sections/LogoSection';
import PasswordSection from './Sections/PasswordSection';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';

const ProfileSection: React.FC = () => {
  const profilePagePrefix: string = `${BRAND_PREFIX}-profile`;
  // const userProfileInfo = useSelector((state: RootState) => state.userProfileInfo);

  return (
    <div
      className={`${profilePagePrefix}-container flex justify-between items-start flex-col w-full`}
    >
      <div
        className={`${profilePagePrefix}-summary-info-card-container w-full mb-4`}
      >
        <Card
          BRAND_PREFIX={BRAND_PREFIX}
          containerClassName={`${profilePagePrefix}-summary-card p-8 bg-white shadow-md rounded-md w-full`}
        >
          <InfoSection />
        </Card>
      </div>

      <div className={`${profilePagePrefix}-summary-selection-card-container flex flex-col w-full`}>
        <div className={`${profilePagePrefix}-row-container flex flex-row w-full mb-4`}>
          <div className={`${profilePagePrefix}-company-logo-card-container w-1/3`}>
            <Card
              BRAND_PREFIX={BRAND_PREFIX}
              containerClassName={`${profilePagePrefix}-company-logo-card p-8 bg-white shadow-md rounded-md`}
            >
              <LogoSection />
            </Card>
          </div>
          <div className={`${profilePagePrefix}-colors-card-container w-1/3 flex-1 pr-4`}>
            <Card
              BRAND_PREFIX={BRAND_PREFIX}
              containerClassName={`${profilePagePrefix}-colors-card p-8 ml-4 h-full bg-white shadow-md rounded-md`}
            >
              <ColorSection />
            </Card>
          </div>
          <div className={`${profilePagePrefix}-background-image-container w-1/3 p-8bg-white shadow-md rounded-md`}>
            <Card
              BRAND_PREFIX={BRAND_PREFIX}
              containerClassName={`${profilePagePrefix}-background-image-card p-8 bg-white shadow-md rounded-md h-full`}
            >
              <BackgroundSection />
            </Card>
          </div>
        </div>
        <div className={`${profilePagePrefix}-row-container flex flex-row w-full`}
        >
          <div className={`${profilePagePrefix}-info-container flex flex-col w-full p-0 `}
          >
            <div className={`${profilePagePrefix}-password-card-container w-full h-1/2 justify-between`}
            >
              <Card
                BRAND_PREFIX={BRAND_PREFIX}
                containerClassName={`${profilePagePrefix}-password-card p-8 bg-white shadow-md rounded-md`}
              >
                <PasswordSection />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
