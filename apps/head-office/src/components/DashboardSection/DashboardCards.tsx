import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card } from '@projects/card';
import DashboardMap from './DashboardMap';
import { BRAND_PREFIX } from '../../constants/constants';
import { toggleLoadingVisibility } from '../../../app/redux/features/isLoadingVisible';
import './DashboardSection.css';

import { BiSolidEvStation } from "react-icons/bi";
import { FaBatteryHalf } from 'react-icons/fa6';
import { HiUserGroup } from "react-icons/hi";

const DashboardCards: React.FC = () => {
    const pagePrefix: string = `${BRAND_PREFIX}-dashboard-page-cards`;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(toggleLoadingVisibility(false));
    }, []);

    const chargeUnitContent1: React.ReactNode = (
        <div className={`flex flex text-center justify-between w-full h-1/2`}>
            <div className='card-info-container flex flex-col items-center justify-center px-4 w-full'>
                <div className='card-title-container flex items-center justify-start px-4 w-full '>
                    <div className={`text-xl lg:text-base`}>Istasyon Sayisi</div>
                </div>
                <div className='text-4xl flex w-full items-center justify-end'>
                    117
                </div>
            </div>
            <div className='card-icon-container flex items-center justify-center text-primary px-1'>
                <BiSolidEvStation className='text-6xl' />
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
    const chargeUnitContent3: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-1/2`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>DC</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>46
            </div>
        </div>
    );
    const chargeUnitContent4: React.ReactNode = (
        <div className={`flex flex text-center justify-between w-full h-1/2`}>
            <div className='card-info-container flex flex-col items-center justify-center px-4 w-full'>
                <div className='card-title-container flex items-center justify-start px-4 w-full '>
                    <div className={`text-xl lg:text-base`}>Konnektor Sayisi</div>
                </div>
                <div className='text-4xl flex w-full items-center justify-end'>
                    265
                </div>
            </div>
            <div className='card-icon-container flex items-center justify-center text-primary px-1'>
                <FaBatteryHalf className='text-6xl' />
            </div>
        </div>
    );
    const chargeUnitContent5: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-full`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Aktif Istasyon</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>
                %21
            </div>
        </div>
    );
    const chargeUnitContent6: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-1/2`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Kapali Istasyon</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>
                %27
            </div>
        </div>
    );
    const chargeUnitContent7: React.ReactNode = (
        <div className={`flex flex text-center justify-between w-full h-1/2`}>
            <div className='card-info-container flex flex-col items-center justify-center px-4 w-full'>
                <div className='card-title-container flex items-center justify-start px-4 w-full '>
                    <div className={`text-xl lg:text-base`}>Musteri Sayisi</div>
                </div>
                <div className='text-4xl flex w-full items-center justify-end'>
                    63584
                </div>
            </div>
            <div className='card-icon-container flex items-center justify-center text-primary px-1'>
                <HiUserGroup className='text-6xl' />
            </div>
        </div>
    );
    const chargeUnitContent8: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-full`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Aktif Musteri</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>
                56001
            </div>
        </div>
    );
    const chargeUnitContent9: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-1/2`}>
            <div className='card-title-container flex items-center justify-center px-4 '>
                <div className={`text-xl lg:text-base`}>Pasif Musteri</div>
            </div>
            <div className='text-4xl flex items-center justify-center'>
                7583
            </div>
        </div>
    );
    const chargeUnitContent11: React.ReactNode = (
        <div className={`flex flex-col text-center justify-center w-full h-1/2`}>
            <div className='card-title-container flex items-center justify-start px-4 pb-4'>
                <div className={`text-2xl lg:text-2xl`}>En cok ziyaret edilen istasyonlar</div>
            </div>
            <div className='text-lg flex items-center justify-center w-full'>
                <ul className='w-full'>
                    <li className='flex justify-between w-full px-4'>
                        <span>Istasyon1</span><span>3</span>
                    </li>
                    <li className='flex justify-between w-full px-4'>
                        <span>Istasyon2</span><span>2</span>
                    </li>
                    <li className='flex justify-between w-full px-4'>
                        <span>Istasyon3</span><span>1</span>

                    </li>

                </ul>
            </div>
        </div>
    );

    return (
        <div className={`${pagePrefix}-info-container w-full flex justify-between flex-wrap`}>
            <div className={`${pagePrefix}-card-row-wrapper flex w-full`}>
                <div className='w-full lg:w-1/3 flex flex-col px-2 my-4'>
                    <Card
                        BRAND_PREFIX={BRAND_PREFIX}
                        containerClassName={`w-full flex items-center justify-between h-1/2 mb-2 shadow border border-gray-300 py-4 rounded-md`}
                    >
                        {chargeUnitContent1}
                    </Card>
                    <div className='w-full flex flex-row justify-between'>
                        <Card
                            BRAND_PREFIX={BRAND_PREFIX}
                            containerClassName={`w-1/2 flex items-center justify-center mr-2 mt-2 shadow border border-gray-300 py-4 rounded-md`}
                        >
                            {chargeUnitContent2}
                        </Card>
                        <Card
                            BRAND_PREFIX={BRAND_PREFIX}
                            containerClassName={`w-1/2 flex items-center justify-center ml-2 mt-2 shadow border border-gray-300 py-4 rounded-md`}
                        >
                            {chargeUnitContent3}
                        </Card>
                    </div>
                </div>
                <div className='w-full lg:w-1/3 flex flex-col px-2 my-4'>
                    <Card
                        BRAND_PREFIX={BRAND_PREFIX}
                        containerClassName={`w-full flex items-center justify-center h-1/2 mb-2 shadow border border-gray-300 py-4 rounded-md`}
                    >
                        {chargeUnitContent4}
                    </Card>
                    <div className='w-full flex flex-row justify-between'>
                        <Card
                            BRAND_PREFIX={BRAND_PREFIX}
                            containerClassName={`w-1/2 flex items-center justify-center mr-2 mt-2 shadow border border-gray-300 py-4 rounded-md`}
                        >
                            {chargeUnitContent5}
                        </Card>
                        <Card
                            BRAND_PREFIX={BRAND_PREFIX}
                            containerClassName={`w-1/2 flex items-center justify-center ml-2 mt-2 shadow border border-gray-300 py-4 rounded-md`}
                        >
                            {chargeUnitContent6}
                        </Card>
                    </div>
                </div>
                <div className='w-full lg:w-1/3 flex flex-col px-2 my-4'>
                    <Card
                        BRAND_PREFIX={BRAND_PREFIX}
                        containerClassName={`w-full flex items-center justify-center  h-1/2 mb-2 shadow border border-gray-300 py-4 rounded-md`}
                    >
                        {chargeUnitContent7}
                    </Card>
                    <div className='w-full flex flex-row justify-between'>
                        <Card
                            BRAND_PREFIX={BRAND_PREFIX}
                            containerClassName={`w-1/2 flex items-center justify-center mr-2 mt-2 shadow border border-gray-300 py-4 rounded-md`}
                        >{
                                chargeUnitContent8
                            }
                        </Card>
                        <Card
                            BRAND_PREFIX={BRAND_PREFIX}
                            containerClassName={`w-1/2 flex items-center justify-center ml-2 mt-2 shadow border border-gray-300 py-4 rounded-md`}
                        >
                            {chargeUnitContent9}
                        </Card>
                    </div>
                </div>
            </div>
            <div className={`${pagePrefix}-map-row-wrapper flex w-full`}>
                <div className={`${pagePrefix}-map-row-container flex justify-between flex-wrap w-1/3`}>
                    <div className='w-full flex flex-col px-2 my-4 items-center justify-center'>
                        <Card
                            BRAND_PREFIX={BRAND_PREFIX}
                            containerClassName={`w-full flex items-center justify-center h-1/3 mb-2 shadow border border-gray-300 py-4 rounded-md`}
                        >
                            {chargeUnitContent1}
                        </Card>
                        <Card
                            BRAND_PREFIX={BRAND_PREFIX}
                            containerClassName={`w-full flex items-center justify-center h-1/3 mb-2 shadow border border-gray-300 py-4 rounded-md`}
                        >
                            {chargeUnitContent1}
                        </Card>
                        <Card
                            BRAND_PREFIX={BRAND_PREFIX}
                            containerClassName={`w-full flex items-center justify-center h-1/3 shadow border border-gray-300 py-4 rounded-md`}
                        >
                            {chargeUnitContent1}
                        </Card>
                    </div>
                </div>
                <DashboardMap />
            </div>
            <div className={`${pagePrefix}-list-row-wrapper flex w-full`}>
                <div className='w-full flex flex flex-row px-2 my-4'>
                    <Card
                        BRAND_PREFIX={BRAND_PREFIX}
                        containerClassName={`w-full flex items-center h-full mr-4 shadow border border-gray-300 py-4 rounded-md`}
                    >
                        {chargeUnitContent11}
                    </Card>
                    <Card
                        BRAND_PREFIX={BRAND_PREFIX}
                        containerClassName={`w-full flex items-center h-full mr-4 shadow border border-gray-300 py-4 rounded-md`}
                    >
                        {chargeUnitContent11}
                    </Card>
                    <Card
                        BRAND_PREFIX={BRAND_PREFIX}
                        containerClassName={`w-full flex items-center h-full shadow border border-gray-300 py-4 rounded-md`}
                    >
                        {chargeUnitContent11}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardCards;
