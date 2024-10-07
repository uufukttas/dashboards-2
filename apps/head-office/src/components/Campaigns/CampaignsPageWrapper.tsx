import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CampaignsSection from './CampaignsSection';
import Loading from '../Loading/Loading';
import MainComponent from '../MainComponent/MainComponent';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { RootState, AppDispatch } from '../../../app/redux/store';

const Campaigns: React.FC = () => {
    const pagePrefix: string = `${BRAND_PREFIX}-campaigns-page`;
    const dispatch = useDispatch<AppDispatch>();
    const isLoading = useSelector((state: RootState) => state.isLoadingVisible.isLoading);

    useEffect(() => {
        dispatch(toggleLoadingVisibility(false));
    }, []);

    return (
        <div className={`${pagePrefix}-wrapper w-full flex h-screen`}>
            {
                isLoading
                    ? (
                        <Loading />
                    )
                    : (
                        <MainComponent headerName='Kampanyalar'>
                            <div className={`${pagePrefix}-container justify-center items-center md:pt-6 flex-wrap`}>
                                <CampaignsSection />
                            </div>
                        </MainComponent>
                    )
            }
        </div>
    );
};

export default Campaigns;
