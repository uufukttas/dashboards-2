import React from 'react';
import { useSelector } from 'react-redux';
import BackgroundSection from './Sections/BackgroundSection';
import ColorSection from './Sections/ColorSection';
import InfoSection from './Sections/InfoSection';
import LoginInfoSection from './Sections/LoginInfoSection';
import LogoSection from './Sections/LogoSection';
import PasswordSection from './Sections/PasswordSection';
import Card from '../Card/Card';
import { BRAND_PREFIX } from '../../constants/constants';
import { RootState } from '../../../app/redux/store';

const ProfileSection: React.FC = () => {
    const profilePagePrefix: string = `${BRAND_PREFIX}-profile`;
    const userProfileInfo = useSelector((state: RootState) => state.userProfileInfo);
    console.log('userProfileInfo', userProfileInfo)

    return (
        <div className={`${profilePagePrefix}-container flex justify-between items-start flex-col`}>
            <div className={`${profilePagePrefix}-summary-info-card-container w-full`}>
                <Card
                    cardBody={<InfoSection />}
                    className={`${profilePagePrefix}-summary-card p-8`}
                />
            </div>
            <div className={`${profilePagePrefix}-summary-selection-card-container mt-8 flex w-full`}>
                <div className={`${profilePagePrefix}-left-container flex items-start flex-col w-1/2 mr-2`}>
                    <div className={`${profilePagePrefix}-password-card-container w-full mt-8`}>
                        <Card
                            cardBody={<PasswordSection />}
                            className={`${profilePagePrefix}-password-card p-8`}
                        />
                    </div>
                    <div className={`${profilePagePrefix}-colors-card-container w-full mt-8`}>
                        <Card
                            cardBody={<ColorSection />}
                            className={`${profilePagePrefix}-colors-card p-8`}
                        />
                    </div>
                    <div className={`${profilePagePrefix}-background-image-container w-full mt-8`}>
                        <Card
                            cardBody={<BackgroundSection />}
                            className={`${profilePagePrefix}-background-image-card p-8`}
                        />
                    </div>
                </div>
                <div className={`${profilePagePrefix}-right-container w-1/2 mt-8 ml-2`}>
                    <div className={`${profilePagePrefix}-password-card-container w-full`}>
                        <Card
                            cardBody={<LoginInfoSection />}
                            className={`${profilePagePrefix}-last-login-card p-8`}
                        />
                    </div>
                    <div className={`${profilePagePrefix}-company-logo-card-container mt-8`}>
                        <Card
                            cardBody={<LogoSection />}
                            className={`${profilePagePrefix}-company-logo-card p-8`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
