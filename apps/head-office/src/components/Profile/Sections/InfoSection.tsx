import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { BRAND_PREFIX } from '../../../../src/constants/constants';

const InfoSection: React.FC = () => {
    const profilePagePrefix: string = `${BRAND_PREFIX}-profile`;

    return (
        <div className={`${profilePagePrefix}-info-container flex justify-between items-center`}>
            <div className={`${profilePagePrefix}-name-container text-black w-1/3 text-2xl text-center`}>
                <h2 className={`${profilePagePrefix}-name font-bold`}>John Doe</h2>
            </div>
            <div className={`${profilePagePrefix}-background-image-container text-black w-1/3 text-center flex justify-center items-center`}>
                <div className={`${profilePagePrefix}-background-image w-1/6 h-1/6 rounded-full border-2 border-black`}>
                    <FaUser className='text-6xl p-2' />
                </div>
            </div>
            <div className={`${profilePagePrefix}-personal-info-container text-black w-1/3 text-right`}>
                <p className={`${profilePagePrefix}-personal-info`}>john@doe.com</p>
                <p className={`${profilePagePrefix}-personal-info`}>055512345678</p>
                <p className={`${profilePagePrefix}-personal-info`}>Admin</p>
            </div>
        </div>
    );
};

export default InfoSection;
