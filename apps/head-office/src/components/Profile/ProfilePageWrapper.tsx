import React, { useEffect } from 'react';
import { Montserrat } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import MainPage from '../MainPage/MainPage';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { RootState, AppDispatch } from '../../../app/redux/store';
// import UserManagementSection from '../../../src/components/UserManagement/UserManagementSection';
import ProfileSection from './ProfileSection';

const montserrat = Montserrat({
    display: 'swap',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
});

const Profile: React.FC = () => {
    const pagePrefix: string = `${BRAND_PREFIX}-profile-page`;
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);

    useEffect(() => {
        dispatch(toggleLoadingVisibility(false));
    }, []);

    return (
        <div className={`${montserrat.className} ${pagePrefix}-wrapper w-full flex h-screen`}>
            {
                isLoading
                    ? (
                        <Loading />
                    )
                    : (
                        <MainPage sectionName='Hosgeldin, '>
                            <div className={`${pagePrefix}-container justify-center items-center md:pt-6 flex-wrap`}>
                                <ProfileSection />
                            </div>
                        </MainPage>
                    )
            }
        </div>
    );
};

export default Profile;
