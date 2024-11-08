import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { BRAND_PREFIX, userInfo } from '../../../../src/constants/constants';

const InfoSection: React.FC = () => {
    const profilePagePrefix: string = `${BRAND_PREFIX}-profile`;

    return (
        <div className={`${profilePagePrefix}-info-container flex justify-between items-center`}>
            <div className={`${profilePagePrefix}-name-container text-black w-1/3 text-2xl text-center`}>
                <h2 className={`${profilePagePrefix}-name font-bold`}>{userInfo.name}</h2>
            </div>
            <div className={`${profilePagePrefix}-background-image-container text-black w-1/3 text-center flex justify-center items-center`}>
                <div className={`${profilePagePrefix}-background-image h-1/6 rounded-full border-2 `}>
                    <img src="/Erkut.png" className='w-[200px] h-[200px] object-cover rounded-full' />
                </div>
            </div>
            <div className={`${profilePagePrefix}-personal-info-container text-black w-1/3 text-right`}>
                <p className={`${profilePagePrefix}-personal-info`}>{userInfo.email}</p>
                <p className={`${profilePagePrefix}-personal-info`}>{userInfo.phone}</p>
                <p className={`${profilePagePrefix}-personal-info`}>{userInfo.roles[0]}</p>
            </div>
        </div>
    );
};

export default InfoSection;
