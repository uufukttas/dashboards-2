import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@projects/card';
import BackgroundSection from './Sections/BackgroundSection';
import ColorSection from './Sections/ColorSection';
import InfoSection from './Sections/InfoSection';
import LanguageSection from './Sections/LanguageSection';
import LoginInfoSection from './Sections/LoginInfoSection';
import LogoSection from './Sections/LogoSection';
import PasswordSection from './Sections/PasswordSection';
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
                    BRAND_PREFIX={BRAND_PREFIX}
                    cardBody={<InfoSection />}
                    containerClassName={`${profilePagePrefix}-summary-card p-8`}
                />
            </div>
            <div className={`${profilePagePrefix}-summary-selection-card-container mt-8 flex w-full`}>
                <div className={`${profilePagePrefix}-left-container flex items-start flex-col w-1/2 mr-2`}>
                    <div className={`${profilePagePrefix}-password-card-container w-full mt-8`}>
                        <Card
                            BRAND_PREFIX={BRAND_PREFIX}
                            cardBody={<PasswordSection />}
                            containerClassName={`${profilePagePrefix}-password-card p-8`}
                        />
                    </div>
                    <div className={`${profilePagePrefix}-colors-card-container w-full mt-8`}>
                        <Card
                            BRAND_PREFIX={BRAND_PREFIX}
                            cardBody={<ColorSection />}
                            containerClassName={`${profilePagePrefix}-colors-card p-8`}
                        />
                    </div>
                    <div className={`${profilePagePrefix}-background-image-container w-full mt-8`}>
                        <Card
                            BRAND_PREFIX={BRAND_PREFIX}
                            cardBody={<BackgroundSection />}
                            containerClassName={`${profilePagePrefix}-background-image-card p-8`}
                        />
                    </div>
                </div>
                <div className={`${profilePagePrefix}-right-container w-1/2 mt-8 ml-2`}>
                    <div className={`${profilePagePrefix}-password-card-container w-full`}>
                        <Card
                            BRAND_PREFIX={BRAND_PREFIX}
                            cardBody={<LoginInfoSection />}
                            containerClassName={`${profilePagePrefix}-last-login-card p-8`}
                        />
                    </div>
                    <div className={`${profilePagePrefix}-company-logo-card-container mt-8`}>
                        <Card
                            BRAND_PREFIX={BRAND_PREFIX}
                            cardBody={<LogoSection />}
                            containerClassName={`${profilePagePrefix}-company-logo-card p-8`}
                        />
                    </div>
                    <div className={`${profilePagePrefix}-language-container mt-8`}>
                        <Card
                            BRAND_PREFIX={BRAND_PREFIX}
                            cardBody={<LanguageSection />}
                            containerClassName={`${profilePagePrefix}-language-card p-8`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
