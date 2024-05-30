import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlug } from 'react-icons/fa6';
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
        <div className={`flex flex-col text-center justify-center w-full h-full`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Aktif Istasyon</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>
                24
                <FaPlug className='text-2xl bg-transparent mx-4' />
            </div>
        </div>
    );
    const chargeUnitContent2: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-full`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Aktif Sarj Unitesi</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>24
                <FaPlug className='text-2xl bg-transparent mx-4' />
            </div>
        </div>
    );
    const chargeUnitContent3: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-full`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Aktif Konnektor</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>24
                <FaPlug className='text-2xl bg-transparent mx-4' />
            </div>
        </div>
    );
    const chargeUnitContent4: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-full`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Arizali Sarj Unitesi</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>24
                <FaPlug className='text-2xl bg-transparent mx-4' />
            </div>
        </div>
    );
    const chargeUnitContent5: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-full`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Planli Istasyon</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>24
                <FaPlug className='text-2xl bg-transparent mx-4' />
            </div>
        </div>
    );
    const chargeUnitContent6: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-full `}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Calismayan Konnektor</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>24
                <FaPlug className='text-2xl bg-transparent mx-4' />
            </div>
        </div>
    );

    return (
        <div className={`${pagePrefix}-container w-full flex justify-center flex-wrap`}>
            <Card
                cardBody={chargeUnitContent1}
                className={`w-full mx-8 my-4 flex items-center justify-center h-[200px] p-0 bg-blue-300 rounded-lg shadow-none text-blue-600 md:${isSidebarExpanded ? 'w-full' : 'w-1/3'} lg:w-[14%] lg:mx-2`}
            />
            <Card
                cardBody={chargeUnitContent2}
                className={`w-full mx-8 my-4 flex items-center justify-center h-[200px] p-0 bg-green-300 rounded-lg shadow-none text-green-600 md:${isSidebarExpanded ? 'w-full' : 'w-1/3'} lg:w-[14%] lg:mx-2`}
            />
            <Card
                cardBody={chargeUnitContent3}
                className={`w-full mx-8 my-4 flex items-center justify-center h-[200px] p-0 bg-yellow-300 rounded-lg shadow-none text-yellow-600 md:${isSidebarExpanded ? 'w-full' : 'w-1/3'} lg:w-[14%] lg:mx-2`}
            />
            <Card
                cardBody={chargeUnitContent4}
                className={`w-full mx-8 my-4 flex items-center justify-center h-[200px] p-0 bg-red-300 rounded-lg shadow-none text-red-600 md:${isSidebarExpanded ? 'w-full' : 'w-1/3'} lg:w-[14%] lg:mx-2`}
            />
            <Card
                cardBody={chargeUnitContent5}
                className={`w-full mx-8 my-4 flex items-center justify-center h-[200px] p-0 bg-purple-300 rounded-lg shadow-none text-purple-600 md:${isSidebarExpanded ? 'w-full' : 'w-1/3'} lg:w-[14%] lg:mx-2`}
            />
            <Card
                cardBody={chargeUnitContent6}
                className={`w-full mx-8 my-4 flex items-center justify-center h-[200px] p-0 bg-gray-300 rounded-lg shadow-none text-gray-600 md:${isSidebarExpanded ? 'w-full' : 'w-1/3'} lg:w-[14%] lg:mx-2`}
            />
        </div>
    );
};

export default DashboardCards;
