import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card } from '@projects/card';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import './DashboardSection.css';

const DashboardCards: React.FC = () => {
    const pagePrefix: string = `${BRAND_PREFIX}-dashboard-page-cards`;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleLoadingVisibility(false));
    }, []);

    const chargeUnitContent1: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-1/2 mb-2`}>
            <div className='card-title-container flex items-center justify-center px-4'>
                <div className={`text-xl lg:text-base`}>Istasyon Sayisi</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>
                117
            </div>
        </div>
    );
    const chargeUnitContent7: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-1/2 mt-2`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Unite Sayisi</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>
                236
            </div>
        </div>
    );
    const chargeUnitContent2: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-1/2`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>AC</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>190
            </div>
        </div>
    );
    const chargeUnitContent8: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-1/2`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>DC</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>46
            </div>
        </div>
    );
    const chargeUnitContent3: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-full`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Basarili Sarj Islemi</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>88%
            </div>
        </div>
    );
    const chargeUnitContent4: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-1/2`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Basarisiz Sarj Islemi</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>
                8%
            </div>
        </div>
    );
    const chargeUnitContent9: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-1/2`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Hatali Sarj Islemi</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>
                4%
            </div>
        </div>
    );
    const chargeUnitContent5: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-full`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Musteri Sayisi</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>100000
            </div>
        </div>
    );
    const chargeUnitContent6: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-1/2`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Toplam Tutar</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>
                117
            </div>
        </div>
    );
    const chargeUnitContent10: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-1/2`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Hizmet Bedeli</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>
                236
            </div>
        </div>
    );

    return (
        <div className={`${pagePrefix}-container w-full flex justify-between flex-wrap`}>
            <div className='w-full lg:w-1/6 flex flex-col px-2 my-4'>
                <Card
                    BRAND_PREFIX={BRAND_PREFIX}
                    cardBody={chargeUnitContent1}
                    containerClassName={`w-full flex items-center justify-center h-1/2 mb-2 shadow border border-gray-300 py-4 rounded-md`}
                />
                <Card
                    BRAND_PREFIX={BRAND_PREFIX}
                    cardBody={chargeUnitContent7}
                    containerClassName={`w-full flex items-center justify-center h-1/2 mt-2 shadow border border-gray-300 py-4 rounded-md`}
                />
            </div>
            <div className='w-full lg:w-1/6 flex flex-col px-2 my-4'>
                <Card
                    BRAND_PREFIX={BRAND_PREFIX}
                    cardBody={chargeUnitContent2}
                    containerClassName={`w-full flex items-center justify-center h-1/2 mb-2 shadow border border-gray-300 py-4 rounded-md`}
                />
                <Card
                    BRAND_PREFIX={BRAND_PREFIX}
                    cardBody={chargeUnitContent8}
                    containerClassName={`w-full flex items-center justify-center h-1/2 mt-2 shadow border border-gray-300 py-4 rounded-md`}
                />
            </div>
            <div className='w-full lg:w-1/6 flex flex-col px-2 my-4'>
                <Card
                    BRAND_PREFIX={BRAND_PREFIX}
                    cardBody={chargeUnitContent3}
                    containerClassName={`w-full flex items-center justify-center h-full mr-4 shadow border border-gray-300 py-4 rounded-md`}
                />
            </div>
            <div className='w-full lg:w-1/6 flex flex-col px-2 my-4'>
                <Card
                    BRAND_PREFIX={BRAND_PREFIX}
                    cardBody={chargeUnitContent4}
                    containerClassName={`w-full flex items-center justify-center h-1/2 mb-2 shadow border border-gray-300 py-4 rounded-md`}
                />
                <Card
                    BRAND_PREFIX={BRAND_PREFIX}
                    cardBody={chargeUnitContent9}
                    containerClassName={`w-full flex items-center justify-center h-1/2 mt-2 shadow border border-gray-300 py-4 rounded-md`}
                />
            </div>
            <div className='w-full lg:w-1/6 flex flex-col px-2 my-4'>
                <Card
                    BRAND_PREFIX={BRAND_PREFIX}
                    cardBody={chargeUnitContent5}
                    containerClassName={`w-full flex items-center justify-center h-full mr-4 shadow border border-gray-300 py-4 rounded-md`}
                />
            </div>
            <div className='w-full lg:w-1/6 flex flex-col px-2 my-4'>
                <Card
                    BRAND_PREFIX={BRAND_PREFIX}
                    cardBody={chargeUnitContent6}
                    containerClassName={`w-full flex items-center justify-center h-1/2 mb-2 shadow border border-gray-300 py-4 rounded-md`}
                />
                <Card
                    BRAND_PREFIX={BRAND_PREFIX}
                    cardBody={chargeUnitContent10}
                    containerClassName={`w-full flex items-center justify-center h-1/2 mt-2 shadow border border-gray-300 py-4 rounded-md`}
                />
            </div>
        </div>
    );
};

export default DashboardCards;
