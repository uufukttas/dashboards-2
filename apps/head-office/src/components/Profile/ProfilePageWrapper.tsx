import React, { useEffect, useState } from 'react';
import { Montserrat } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import ProfileSection from './ProfileSection';
import Loading from '../Loading/Loading';
import MainPage from '../MainPage/MainPage';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { RootState, AppDispatch } from '../../../app/redux/store';
import { getColors } from '../../../app/api/profile';
import { setConfigs } from '../../../app/redux/features/setConfig';

const montserrat = Montserrat({
    display: 'swap',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
});

const Profile: React.FC = () => {
    const pagePrefix: string = `${BRAND_PREFIX}-profile-page`;
    const dispatch = useDispatch<AppDispatch>();
    const colors = useSelector((state: RootState) => state.configs.colors);
    const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const fetchConfigurations = async () => {
        const colors = await getColors(["Ana", "Ikincil", "Alternatif", "Ikincil Yedek"]);

        dispatch(setConfigs(colors.data));
        setIsVisible(true);
    };

    useEffect(() => {
        dispatch(toggleLoadingVisibility(false));
        fetchConfigurations();
    }, []);

    return (
        isVisible && (

            <div
                className={`${montserrat.className} ${pagePrefix}-wrapper w-full flex h-screen`}
                style={{
                    '--color-primary': `${colors[0].value}`,
                    '--color-secondary': `${colors[1].value}`
                } as React.CSSProperties}
            >
                {
                    isLoading
                        ? (
                            <Loading />
                        )
                        : (
                            <MainPage headerName='Hosgeldin, '>
                                <div className={`${pagePrefix}-container justify-center items-center md:pt-6 flex-wrap`}>
                                    <ProfileSection />
                                </div>
                            </MainPage>
                        )
                }
            </div>
        )
    );
};

export default Profile;
