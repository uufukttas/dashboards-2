import React from 'react'
import { FaPencilAlt } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';

const Comissions = () => {
    const sectionPrefix = 'comission-details';
    return (
        <>
            <div className={`${sectionPrefix} items-center py-4 w-full`}>
                <div className={`${sectionPrefix}-header-container w-full`}>
                    <div className={`${sectionPrefix}-header w-full flex`}>
                        <div className={`${sectionPrefix}-service-point-container flex justify-between md:items-center flex-col md:flex-row w-full`}>
                            <p className={`${sectionPrefix}-service-point text-lg font-bold w-full`}>Hizmet Noktasi</p>
                        </div>
                        <div className={`${sectionPrefix}-reseller-container flex justify-between md:items-center flex-col md:flex-row w-full`}>
                            <p className={`${sectionPrefix}-reseller text-lg font-bold w-full`}>Reseller</p>
                        </div>
                        <div className={`${sectionPrefix}-charge-unit-reseller-container flex justify-between md:items-center flex-col md:flex-row w-full`}>
                            <p className={`${sectionPrefix}-charge-unit-reseller text-lg font-bold w-full`}>Cihaz Yatirimcisi</p>
                        </div>
                        <div className={`${sectionPrefix}-breakpoint-container flex justify-between md:items-center flex-col md:flex-row w-full`}>
                            <p className={`${sectionPrefix}-breakpoint text-lg font-bold w-full`}>Kirilimlar</p>
                        </div>
                        <div className={`${sectionPrefix}-percent-container flex justify-between md:items-center flex-col md:flex-row w-full `}>
                            <p className={`${sectionPrefix}-percent text-lg font-bold w-full`}>Yuzde Degeri</p>
                        </div>
                        <div className={`${sectionPrefix}-actions-container flex justify-between md:items-center flex-col md:flex-row w-full`}>
                            <p className={`${sectionPrefix}-actions text-lg font-bold w-full`}>Islemler</p>
                        </div>
                    </div>

                </div>
                <hr className={`${sectionPrefix}-header-line w-full`} />
                <div className={`${sectionPrefix}-content-container w-full`}>
                    <div className={`${sectionPrefix}-content w-full`}>
                        <div className={`${sectionPrefix}-info-container flex flex-col justify-between`}>
                            <div className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col md:flex-row w-full py-4`}>
                                <div className={`${sectionPrefix}-info-item-value text-lg font-normal flex items-baseline justify-between w-full py-4`}>
                                    <div className={`${sectionPrefix}-service-point-container flex justify-between md:items-center flex-col md:flex-row w-full `}>
                                        <p className={`${sectionPrefix}-service-point text-lg font-normal`}>Test Servis Noktasi 18v2</p>
                                    </div>
                                    <div className={`${sectionPrefix}-reseller-container flex justify-between md:items-center flex-col md:flex-row w-full `}>
                                        <p className={`${sectionPrefix}-reseller text-lg font-normal`}>Test Reseller 18v2</p>
                                    </div>
                                    <div className={`${sectionPrefix}-charge-unit-reseller-container flex justify-between md:items-center flex-col md:flex-row w-full `}>
                                        <p className={`${sectionPrefix}-charge-unit-reseller text-lg font-normal`}>Evet</p>
                                    </div>
                                    <div className={`${sectionPrefix}-breakpoint-container flex justify-between md:items-center flex-col md:flex-row w-full `}>
                                        <p className={`${sectionPrefix}-breakpoint text-lg font-normal`}>Hizmet Geliri</p>
                                    </div>
                                    <div className={`${sectionPrefix}-percent-container flex justify-between md:items-center flex-col md:flex-row w-full `}>
                                        <p className={`${sectionPrefix}-percent text-lg font-normal`}>10%</p>
                                    </div>
                                    <div className={`${sectionPrefix}-percent-container flex justify-start md:items-center flex-col md:flex-row w-full `}>
                                        <button type='button' className='bg-secondary rounded-md px-4 py-2 mx-4 text-white'>
                                            <FaPencilAlt />
                                        </button>
                                        <button type='button' className='bg-secondary rounded-md px-4 py-2 text-white'>
                                            <FaTrashCan />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={`${sectionPrefix}-info-item flex justify-between md:items-center flex-col md:flex-row w-full py-4`}>
                                <div className={`${sectionPrefix}-info-item-value text-lg font-normal flex items-baseline justify-between w-full py-4`}>
                                    <div className={`${sectionPrefix}-service-point-container flex justify-between md:items-center flex-col md:flex-row w-full `}>
                                        <p className={`${sectionPrefix}-service-point text-lg font-normal`}>Test Servis Noktasi 18v2</p>
                                    </div>
                                    <div className={`${sectionPrefix}-reseller-container flex justify-between md:items-center flex-col md:flex-row w-full `}>
                                        <p className={`${sectionPrefix}-reseller text-lg font-normal`}>Test Reseller 18v2</p>
                                    </div>
                                    <div className={`${sectionPrefix}-charge-unit-reseller-container flex justify-between md:items-center flex-col md:flex-row w-full `}>
                                        <p className={`${sectionPrefix}-charge-unit-reseller text-lg font-normal`}>Hayir</p>
                                    </div>
                                    <div className={`${sectionPrefix}-breakpoint-container flex justify-between md:items-center flex-col md:flex-row w-full `}>
                                        <p className={`${sectionPrefix}-breakpoint text-lg font-normal`}>Enerji Bedeli</p>
                                    </div>
                                    <div className={`${sectionPrefix}-percent-container flex justify-between md:items-center flex-col md:flex-row w-full `}>
                                        <p className={`${sectionPrefix}-percent text-lg font-normal`}>10%</p>
                                    </div>
                                    <div className={`${sectionPrefix}-percent-container flex justify-start md:items-center flex-col md:flex-row w-full `}>
                                        <button type='button' className='bg-secondary rounded-md px-4 py-2 mx-4 text-white'>
                                            <FaPencilAlt />
                                        </button>
                                        <button type='button' className='bg-secondary rounded-md px-4 py-2 text-white'>
                                            <FaTrashCan />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comissions;
