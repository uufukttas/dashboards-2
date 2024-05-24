import React from 'react';
import Card from '../../Card/Card';
import { BRAND_PREFIX } from '../../../constants/constants';
import { RootState } from 'apps/head-office/app/redux/store';
import { useSelector } from 'react-redux';

const ServicePointDetailsHeader: React.FC = () => {
    const sectionPreifx = 'service-point-details-page';
    const servicePointData = useSelector((state: RootState) => state.servicePointData.servicePointData);

    const servicePointHeader = (
        <div className={`${BRAND_PREFIX}-${sectionPreifx}-header w-full flex items-center justify-between`}>
            <div className={`${BRAND_PREFIX}-${sectionPreifx}-header-left flex`}>
                <h1 className={`${BRAND_PREFIX}-${sectionPreifx}-title text-2xl font-bold text-heading`}>
                    {servicePointData.name}
                </h1>
            </div>
            <div className={`${BRAND_PREFIX}-${sectionPreifx}-header-right flex`}>
            </div>
        </div>
    );

    return (
        <Card cardBody={servicePointHeader} className='my-5 lg:mx-0 min-h-[96px]' />
    );
};

export default ServicePointDetailsHeader;
