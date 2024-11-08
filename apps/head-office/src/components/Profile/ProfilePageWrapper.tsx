import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileSection from './ProfileSection';
import Loading from '../Loading/Loading';
import MainComponent from '../MainComponent/MainComponent';
import { BRAND_PREFIX, userInfo } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { RootState, AppDispatch } from '../../../app/redux/store';
import { getColorsRequest } from '../../../app/api/profile';
import { setConfigs } from '../../../app/redux/features/setConfig';

const Profile: React.FC = () => {
    const pagePrefix: string = `${BRAND_PREFIX}-profile-page`;
    const dispatch = useDispatch<AppDispatch>();
    const colors = useSelector((state: RootState) => state.configs.colors);
    const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const fetchConfigurations = async () => {
        const colors = await getColorsRequest(["Primary", "Secondary", "Alternate", "Backup"]);

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
                className={`${pagePrefix}-wrapper w-full flex h-screen`}
                style={{
                    '--primary-color': `${colors[0].value}`,
                    '--secondary-color': `${colors[1].value}`
                } as React.CSSProperties}
            >
                {
                    isLoading
                        ? (
                            <Loading />
                        )
                        : (
                            <MainComponent headerName={`Hoşgeldin, ${userInfo.name}`}>
                                <div className={`${pagePrefix}-container justify-center items-center md:pt-6 flex-wrap w-full`}>
                                    <ProfileSection />
                                </div>
                            </MainComponent>
                        )
                }
            </div>
        )
    );
};

export default Profile;
