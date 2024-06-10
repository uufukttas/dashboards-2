import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import { RootState } from '../../../app/redux/store';

const DashboardCards: React.FC = () => {
    const pagePrefix: string = `${BRAND_PREFIX}-dashboard-page-cards`;
    const dispatch = useDispatch();
    const isSidebarExpanded = useSelector((state: RootState) => state.isSidebarExpand.isSidebarExpanded);

    useEffect(() => {
        dispatch(toggleLoadingVisibility(false));
    }, []);

    const chargeUnitContent1: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-1/2`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Istasyon Sayisi</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>
                117
            </div>
        </div>
    );
    const chargeUnitContent7: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-1/2`}>
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
            <div className='text-4xl flex items-center justify-center'>?
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
        <div className={`${pagePrefix}-container w-full flex justify-center flex-wrap`}>
            <div className='mx-2 w-[14%] flex-col'>
                <Card
                    cardBody={chargeUnitContent1}
                    className={`w-full mx-8 my-4 flex items-center justify-center h-[92px] p-0 bg-blue-300 rounded-lg shadow-none text-blue-600 md:${isSidebarExpanded ? 'w-full' : 'w-1/3'} lg:mx-2`}
                />
                <Card
                    cardBody={chargeUnitContent7}
                    className={`w-full mx-8 my-4 flex items-center justify-center h-[92px] p-0 bg-blue-300 rounded-lg shadow-none text-blue-600 md:${isSidebarExpanded ? 'w-full' : 'w-1/3'} lg:mx-2`}
                />
            </div>
            <div className='mx-2 flex w-[15.5%]'>
                <Card
                    cardBody={chargeUnitContent2}
                    className={`w-full mx-8 my-4 flex items-center justify-center h-[200px] p-0 bg-green-300 rounded-lg shadow-none text-green-600 md:${isSidebarExpanded ? 'w-1/4' : 'w-1/3'} lg:mx-2 w-1/4 p-0`}
                />
                <Card
                    cardBody={chargeUnitContent8}
                    className={`w-full mx-8 my-4 flex items-center justify-center h-[200px] p-0 bg-green-300 rounded-lg shadow-none text-green-600 md:${isSidebarExpanded ? 'w-1/4' : 'w-1/3'} lg:mx-2 w-1/4 p-0`}
                />
            </div>
            <div className='mx-2 w-[14%] flex-col'>
                <Card
                    cardBody={chargeUnitContent3}
                    className={`w-full mx-8 my-4 flex items-center justify-center h-[200px] p-0 bg-yellow-300 rounded-lg shadow-none text-yellow-600 md:${isSidebarExpanded ? 'w-full' : 'w-1/3'} lg:mx-2`}
                />
            </div>
            <div className='mx-2 w-[14%] flex-col'>
                <Card
                    cardBody={chargeUnitContent4}
                    className={`w-full mx-8 my-4 flex items-center justify-center h-[92px] p-0 bg-blue-300 rounded-lg shadow-none text-blue-600 md:${isSidebarExpanded ? 'w-full' : 'w-1/3'} lg:mx-2`}
                />
                <Card
                    cardBody={chargeUnitContent9}
                    className={`w-full mx-8 my-4 flex items-center justify-center h-[92px] p-0 bg-blue-300 rounded-lg shadow-none text-blue-600 md:${isSidebarExpanded ? 'w-full' : 'w-1/3'} lg:mx-2`}
                />
            </div>
            <div className='mx-2 w-[14%] flex-col'>
            <Card
                cardBody={chargeUnitContent5}
                className={`w-full mx-8 my-4 flex items-center justify-center h-[200px] p-0 bg-purple-300 rounded-lg shadow-none text-purple-600 md:${isSidebarExpanded ? 'w-full' : 'w-1/3'} lg:mx-2`}
            />
            </div>
            <div className='mx-2 w-[14%] flex-col'>
                <Card
                    cardBody={chargeUnitContent6}
                    className={`w-full mx-8 my-4 flex items-center justify-center h-[92px] p-0 bg-blue-300 rounded-lg shadow-none text-blue-600 md:${isSidebarExpanded ? 'w-full' : 'w-1/3'} lg:mx-2`}
                />
                <Card
                    cardBody={chargeUnitContent10}
                    className={`w-full mx-8 my-4 flex items-center justify-center h-[92px] p-0 bg-blue-300 rounded-lg shadow-none text-blue-600 md:${isSidebarExpanded ? 'w-full' : 'w-1/3'} lg:mx-2`}
                />
            </div>
        </div>
    );
};

export default DashboardCards;
