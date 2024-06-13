import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Card from '../Card/Card';
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
        <div className={`flex flex-col text-center justify-center h-full`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>AC</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>190
            </div>
        </div>
    );
    const chargeUnitContent8: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center h-full`}>
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
                    cardBody={chargeUnitContent1}
                    className={`w-full flex items-center justify-center h-1/2 mb-2 bg-blue-300 rounded-lg shadow-none text-blue-600 py-4 rounded-md`}
                />
                <Card
                    cardBody={chargeUnitContent7}
                    className={`w-full flex items-center justify-center h-1/2 mt-2 bg-blue-300 rounded-lg shadow-none text-blue-600 py-4 rounded-md`}
                />
            </div>
            <div className='w-full lg:w-1/6 flex flex-row px-2 my-4'>
                <Card
                    cardBody={chargeUnitContent2}
                    className={`w-full flex items-center justify-center h-full bg-green-300 rounded-lg shadow-none text-green-600 mx-2 py-4 rounded-md`}
                />
                <Card
                    cardBody={chargeUnitContent8}
                    className={`w-full flex items-center justify-center h-full bg-green-300 rounded-lg shadow-none text-green-600 mx-2 py-4 rounded-md`}
                />
            </div>
            <div className='w-full lg:w-1/6 flex flex-col px-2 my-4'>
                <Card
                    cardBody={chargeUnitContent3}
                    className={`w-full flex items-center justify-center h-full mr-4 bg-yellow-300 rounded-lg shadow-none text-yellow-600 py-4 rounded-md`}
                />
            </div>
            <div className='w-full lg:w-1/6 flex flex-col px-2 my-4'>
                <Card
                    cardBody={chargeUnitContent4}
                    className={`w-full flex items-center justify-center h-1/2 mb-2 bg-blue-300 rounded-lg shadow-none text-blue-600 py-4 rounded-md`}
                />
                <Card
                    cardBody={chargeUnitContent9}
                    className={`w-full flex items-center justify-center h-1/2 mt-2 bg-blue-300 rounded-lg shadow-none text-blue-600 py-4 rounded-md`}
                />
            </div>
            <div className='w-full lg:w-1/6 flex flex-col px-2 my-4'>
                <Card
                    cardBody={chargeUnitContent5}
                    className={`w-full flex items-center justify-center h-full mr-4 bg-purple-300 rounded-lg shadow-none text-purple-600 py-4 rounded-md`}
                />
            </div>
            <div className='w-full lg:w-1/6 flex flex-col px-2 my-4'>
                <Card
                    cardBody={chargeUnitContent6}
                    className={`w-full flex items-center justify-center h-1/2 mb-2 bg-blue-300 rounded-lg shadow-none text-blue-600 py-4 rounded-md`}
                />
                <Card
                    cardBody={chargeUnitContent10}
                    className={`w-full flex items-center justify-center h-1/2 mt-2 bg-blue-300 rounded-lg shadow-none text-blue-600 py-4 rounded-md`}
                />
            </div>
        </div>
    );
};

export default DashboardCards;
