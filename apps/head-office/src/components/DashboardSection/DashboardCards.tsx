import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaPlug } from 'react-icons/fa6';
import Card from '../Card/Card';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';

const DashboardCards: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleLoadingVisibility(false));
    }, []);

    const chargeUnitContent1 = (
        <div className={`flex flex-col text-center justify-center w-full h-full`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className='text-md'>Aktif Servis Noktasi</div>
                <FaPlug className='text-2xl bg-transparent' />
            </div>
            <div className='text-6xl'>24</div>
        </div>
    );
    const chargeUnitContent2 = (
        <div className={`flex flex-col text-center justify-center w-full h-full`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className='text-md'>Aktif Sarj Unitesi</div>
                <FaPlug className='text-2xl bg-transparent' />
            </div>
            <div className='text-6xl'>24</div>
        </div>
    );
    const chargeUnitContent3 = (
        <div className={`flex flex-col text-center justify-center w-full h-full`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className='text-md'>Aktif Konnektor</div>
                <FaPlug className='text-2xl bg-transparent' />
            </div>
            <div className='text-6xl'>24</div>
        </div>
    );
    const chargeUnitContent4 = (
        <div className={`flex flex-col text-center justify-center w-full h-full`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className='text-md'>Arizali Sarj Unitesi</div>
                <FaPlug className='text-2xl bg-transparent' />
            </div>
            <div className='text-6xl'>24</div>
        </div>
    );
    const chargeUnitContent5 = (
        <div className={`flex flex-col text-center justify-center w-full h-full`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className='text-md'>Planli Olan Servis Noktasi</div>
                <FaPlug className='text-2xl bg-transparent' />
            </div>
            <div className='text-6xl'>24</div>
        </div>
    );
    const chargeUnitContent6 = (
        <div className={`flex flex-col text-center justify-center w-full h-full `}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className='text-md'>Bozuk Sarj Konnektor</div>
                <FaPlug className='text-2xl bg-transparent' />
            </div>
            <div className='text-6xl'>24</div>
        </div>
    );

    const getStationInfo = (): void => {

    };

    useEffect(() => {
        getStationInfo();
    }, []);

    return (
        <div className={`${BRAND_PREFIX}-cards-container w-full flex justify-center`}>
            <Card cardBody={chargeUnitContent1} className='w-full flex item-center h-[200px] !p-0 !bg-blue-300 rounded-lg mx-5 shadow-none text-blue-600' />
            <Card cardBody={chargeUnitContent2} className='w-full flex item-center h-[200px] !p-0 !bg-green-300 rounded-lg mx-5 shadow-none text-green-600' />
            <Card cardBody={chargeUnitContent3} className='w-full flex item-center h-[200px] !p-0 !bg-yellow-300 rounded-lg mx-5 shadow-none text-yellow-600' />
            <Card cardBody={chargeUnitContent4} className='w-full flex item-center h-[200px] !p-0 !bg-red-300 rounded-lg mx-5 shadow-none text-red-600' />
            <Card cardBody={chargeUnitContent5} className='w-full flex item-center h-[200px] !p-0 !bg-purple-300 rounded-lg mx-5 shadow-none text-purple-600' />
            <Card cardBody={chargeUnitContent6} className='w-full flex item-center h-[200px] !p-0 !bg-gray-300 rounded-lg mx-5 shadow-none text-gray-600' />
        </div>
    );
};

export default DashboardCards;
